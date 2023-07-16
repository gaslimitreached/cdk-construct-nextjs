import { existsSync } from 'fs';
import { join } from 'path';

import { Duration, Fn, RemovalPolicy, Stack } from 'aws-cdk-lib';
import {
  Certificate,
  CertificateValidation,
  ICertificate,
} from 'aws-cdk-lib/aws-certificatemanager';
import {
  AllowedMethods,
  BehaviorOptions,
  CacheCookieBehavior,
  CacheHeaderBehavior,
  CachePolicy,
  CacheQueryStringBehavior,
  CachedMethods,
  Distribution,
  Function as CloudFunction,
  FunctionCode,
  IOrigin,
  LambdaEdgeEventType,
  OriginRequestCookieBehavior,
  OriginRequestHeaderBehavior,
  OriginRequestPolicy,
  OriginRequestQueryStringBehavior,
  ViewerProtocolPolicy,
  experimental,
  FunctionEventType,
} from 'aws-cdk-lib/aws-cloudfront';
import {
  HttpOrigin,
  OriginGroup,
  S3Origin,
} from 'aws-cdk-lib/aws-cloudfront-origins';
import { Rule, Schedule } from 'aws-cdk-lib/aws-events';
import { LambdaFunction } from 'aws-cdk-lib/aws-events-targets';
import { IRole, PolicyStatement, Role } from 'aws-cdk-lib/aws-iam';
import {
  Function as CdkFunction,
  Runtime,
  Code,
  Architecture,
  FunctionUrlAuthType,
  Alias,
} from 'aws-cdk-lib/aws-lambda';
import { SqsEventSource } from 'aws-cdk-lib/aws-lambda-event-sources';
import { RetentionDays } from 'aws-cdk-lib/aws-logs';
import {
  ARecord,
  AaaaRecord,
  HostedZone,
  IHostedZone,
  RecordTarget,
} from 'aws-cdk-lib/aws-route53';
import { HttpsRedirect } from 'aws-cdk-lib/aws-route53-patterns';
import { CloudFrontTarget } from 'aws-cdk-lib/aws-route53-targets';
import { Bucket } from 'aws-cdk-lib/aws-s3';
import {
  BucketDeployment,
  CacheControl,
  Source,
} from 'aws-cdk-lib/aws-s3-deployment';
import { Queue } from 'aws-cdk-lib/aws-sqs';

import { Construct } from 'constructs';

export interface DomainNameProps {
  readonly alternateNames?: string[];
  readonly certificate?: ICertificate;
  readonly domainName: string;
  readonly domainAlias?: string;
  readonly external?: boolean;
  readonly hostedZone: IHostedZone | string;
}

export interface IProps {
  readonly path: string;
  readonly edge?: boolean;
  readonly role?: Role;
  readonly warm?: Number;
  domainName?: string | DomainNameProps;
  certificate?: ICertificate;
}

export class NextJs extends Construct {
  protected props: IProps;
  public readonly origin: IOrigin;
  public readonly assets: Bucket;
  public readonly imageHandler: CdkFunction;
  public readonly serverHandler: CdkFunction | experimental.EdgeFunction;
  public readonly cloudFrontFunction: CloudFunction;
  public readonly serverBehavior: BehaviorOptions;
  public readonly distribution: Distribution;
  public readonly hostedZone?: IHostedZone;
  public readonly certificate?: ICertificate;

  private buildPath: string;
  private staticAssetsPath: string;
  private cachedAssetsPath: string;
  private hashedAssetsPath: string;
  private serverFunctionPath: string;
  private imageOptimizationFunctionPath: string;
  private revalidationFunctionPath: string;
  private warmerFunctionPath: string;

  constructor(scope: Construct, id: string, props: IProps) {
    super(scope, id);

    this.props = {
      path: props.path,
      edge: props.edge ?? false,
    };

    if (props.certificate) this.props.certificate = props.certificate;
    if (props.domainName) this.props.domainName = props.domainName;

    this.buildPath = join(props.path, '.open-next');
    this.staticAssetsPath = join(this.buildPath, 'assets');
    this.cachedAssetsPath = join(this.buildPath, 'cache');
    this.hashedAssetsPath = join(this.staticAssetsPath, '_next');
    this.serverFunctionPath = join(this.buildPath, 'server-function');
    this.imageOptimizationFunctionPath = join(this.buildPath, 'image-optimization-function');
    this.revalidationFunctionPath = join(this.buildPath, 'revalidation-function');
    this.warmerFunctionPath = join(this.buildPath, 'warmer-function');

    this.verifyBuildOutput();

    this.assets = new Bucket(this, 'StaticAssetsBucket', {
      removalPolicy: RemovalPolicy.DESTROY,
      autoDeleteObjects: true,
    });

    this.hostedZone = this.lookupHostedZone();

    this.certificate = this.createCertificate();

    this.origin = new S3Origin(this.assets);

    this.imageHandler = this.createImageHandler();

    this.assets.grantReadWrite(new Alias(this, 'ImageHandlerAlias', {
      aliasName: 'live',
      version: this.imageHandler.currentVersion,
    }));

    this.serverHandler = props.edge
      ? this.createEdgeServerHandler(props.role)
      : this.createServerHandler(props.role);

    this.assets.grantRead(new Alias(this, 'ServerHandlerAlias', {
      aliasName: 'live',
      version: this.serverHandler.currentVersion,
    }));

    this.assets.grantRead(this.serverHandler!.role!);

    this.serverBehavior = this.createServerBehavior();

    this.cloudFrontFunction = this.createCloudFrontFunction();

    this.distribution = this.createDistribution();

    this.createWarmerFunction();

    this.createBucketDeployment();

    this.createRoute53Records();
  }

  protected verifyBuildOutput() {
    if (!existsSync(this.buildPath)) {
      throw new Error(`Expecting open-next output to be under ${this.buildPath}`);
    }
  }

  protected createBucketDeployment() {
    // Hashed assets deployment
    new BucketDeployment(this, 'HashedAssetsDeployment', {
      cacheControl: [CacheControl.fromString('public,max-age=31536000,immutable')],
      destinationBucket: this.assets,
      destinationKeyPrefix: '_next',
      distribution: this.distribution,
      sources: [Source.asset(this.hashedAssetsPath)],
    });

    // Static assets deployment
    new BucketDeployment(this, 'StaticAssetsDeployment', {
      cacheControl: [CacheControl.fromString('public,max-age=0,s-maxage=31536000,must-revalidate')],
      destinationBucket: this.assets,
      distribution: this.distribution,
      sources: [Source.asset(this.staticAssetsPath, { exclude: [this.hashedAssetsPath] })],
    });

    // Cached assets deployment
    new BucketDeployment(this, 'CachedAssetsDeployment', {
      destinationBucket: this.assets,
      distribution: this.distribution,
      sources: [Source.asset(this.cachedAssetsPath)],
    });
  }

  protected createImageBehavior(): BehaviorOptions {
    const functionUrl = this.imageHandler.addFunctionUrl({ authType: FunctionUrlAuthType.NONE });
    return {
      origin: new HttpOrigin(Fn.parseDomainName(functionUrl.url)),
      viewerProtocolPolicy: ViewerProtocolPolicy.REDIRECT_TO_HTTPS,
      allowedMethods: AllowedMethods.ALLOW_ALL,
      cachedMethods: CachedMethods.CACHE_GET_HEAD_OPTIONS,
      compress: true,
      cachePolicy: this.serverBehavior.cachePolicy,
      originRequestPolicy: new OriginRequestPolicy(this, 'ImageOriginRequestPolicy', {
        queryStringBehavior: OriginRequestQueryStringBehavior.allowList('q', 'w', 'url'),
        headerBehavior: OriginRequestHeaderBehavior.allowList('accept'),
        cookieBehavior: OriginRequestCookieBehavior.none(),
      }),
    } as BehaviorOptions;
  }

  protected createServerBehavior(): BehaviorOptions {
    const functionUrl = this.serverHandler.addFunctionUrl({ authType: FunctionUrlAuthType.NONE });
    return {
      // using managed origin request policy
      // https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/using-managed-origin-request-policies.html
      originRequestPolicy: OriginRequestPolicy.fromOriginRequestPolicyId(
        this,
        'ServerOriginRequestPolicy',
        'b689b0a8-53d0-40ab-baf2-68738e2966ac',
      ),
      viewerProtocolPolicy: ViewerProtocolPolicy.REDIRECT_TO_HTTPS,
      origin: new HttpOrigin(Fn.parseDomainName(functionUrl.url), {
        // provide config to edge lambda function
        // https://github.com/jetbridge/cdk-nextjs/blob/main/src/NextjsDistribution.ts
        customHeaders: { 'x-origin-url': functionUrl.url },
        readTimeout: Duration.seconds(30),
      }),
      allowedMethods: AllowedMethods.ALLOW_ALL,
      cachedMethods: CachedMethods.CACHE_GET_HEAD_OPTIONS,
      compress: true,
      // only include edge lambda behavior when present
      edgeLambdas: this.props.edge ? [
        {
          eventType: LambdaEdgeEventType.VIEWER_REQUEST,
          functionVersion: this.serverHandler.currentVersion,
        },
      ] : undefined,
      cachePolicy: new CachePolicy(this, 'ServerCache', {
        queryStringBehavior: CacheQueryStringBehavior.all(),
        headerBehavior: CacheHeaderBehavior.allowList(
          // required by image optimization request
          'accept',
          // required by server request
          'x-op-middleware-request-headers',
          'x-op-middleware-response-headers',
          'x-nextjs-data',
          'x-middleware-prefetch',
          // required by server request (in-place routing)
          'rsc',
          'next-router-prefetch',
          'next-router-state-tree',
          // https://discord.com/channels/983865673656705025/1027265626085019769/1093758839263866990
          'content-encoding',
        ),
        cookieBehavior: CacheCookieBehavior.all(),
        defaultTtl: Duration.days(0),
        maxTtl: Duration.days(365),
        minTtl: Duration.days(0),
        enableAcceptEncodingBrotli: true,
        enableAcceptEncodingGzip: true,
      }),
    } as BehaviorOptions;
  }

  protected createStaticAssetsBehavior(): BehaviorOptions {
    return {
      origin: this.origin,
      // https://stackoverflow.com/questions/59431476/aws-s3-signaturedoesnotmatch-error-during-get-request-through-cloudfront
      originRequestPolicy: OriginRequestPolicy.CORS_S3_ORIGIN,
      viewerProtocolPolicy: ViewerProtocolPolicy.REDIRECT_TO_HTTPS,
      allowedMethods: AllowedMethods.ALLOW_GET_HEAD_OPTIONS,
      cachePolicy: CachePolicy.CACHING_OPTIMIZED,
      cachedMethods: CachedMethods.CACHE_GET_HEAD_OPTIONS,
      compress: true,
    } as BehaviorOptions;
  }

  protected createDistribution(): Distribution {
    const imageBehavior = this.createImageBehavior();
    const staticFileBehavior = this.createStaticAssetsBehavior();

    // https://github.com/serverless-stack/open-next#cloudfront-distribution
    return new Distribution(this, 'HostingDistribution', {
      domainNames: this.buildDomainNames(),
      certificate: this.certificate,
      defaultRootObject: '',
      defaultBehavior: {
        cachePolicy: this.serverBehavior.cachePolicy,
        edgeLambdas: this.serverBehavior.edgeLambdas,
        compress: true,
        origin: new OriginGroup({
          primaryOrigin: this.serverBehavior.origin,
          fallbackOrigin: this.origin,
        }),
        viewerProtocolPolicy: ViewerProtocolPolicy.REDIRECT_TO_HTTPS,
        functionAssociations: [{
          eventType: FunctionEventType.VIEWER_REQUEST,
          function: this.cloudFrontFunction,
        }],
      },
      // https://github.com/serverless-stack/open-next#running-at-edge
      additionalBehaviors: {
        /* eslint-disable key-spacing */
        '/_next/static/*': staticFileBehavior,
        '/_next/image':    imageBehavior,
        '/_next/data/*':   this.serverBehavior,
        '/api/*':          this.serverBehavior,
        '/images/*':       staticFileBehavior,
        '/*.ico':          staticFileBehavior,
        /* eslint-enable key-spacing */
      },
    });
  }

  protected createServerHandler(role: IRole | undefined) {
    return new CdkFunction(this, 'ServerFunction', {
      environment: {
        CACHE_BUCKET_NAME: this.assets.bucketName,
        CACHE_BUCKET_REGION: Stack.of(this).region,
      },
      runtime: Runtime.NODEJS_18_X,
      timeout: Duration.seconds(10),
      currentVersionOptions: {
        removalPolicy: RemovalPolicy.DESTROY,
        retryAttempts: 1,
      },
      memorySize: 128,
      handler: 'index.handler',
      code: Code.fromAsset(this.serverFunctionPath),
      role,
    });
  }

  protected createEdgeServerHandler(role: IRole | undefined) {
    return new experimental.EdgeFunction(this, 'ServerFunction', {
      runtime: Runtime.NODEJS_18_X,
      code: Code.fromAsset(this.serverFunctionPath),
      handler: 'index.handler',
      timeout: Duration.seconds(5),
      memorySize: 128,
      currentVersionOptions: {
        removalPolicy: RemovalPolicy.DESTROY,
        retryAttempts: 1,
      },
      role,
    });
  }

  // TODO: use template literal to inject function code as props
  protected createCloudFrontFunction() {
    return new CloudFunction(this, 'CloudFrontFunction', {
      code: FunctionCode.fromInline(`
      function handler (event) {
        var request = event.request;
        if (request.headers.host)
          request.headers['x-forwarded-host'] = request.headers.host;
        return request;
      }`),
    });
  }

  protected createRevalidationHandler() {
    if (!this.serverHandler) return;

    const queue = new Queue(this, 'RevalidationQueue', {
      fifo: true,
      receiveMessageWaitTime: Duration.seconds(20),
    });

    const consumer = new CdkFunction(this, 'RevalidationConsumer', {
      description: 'Nextjs revalidation queue consumer',
      handler: 'index.handler',
      code: Code.fromAsset(this.revalidationFunctionPath),
      runtime: Runtime.NODEJS_18_X,
      timeout: Duration.seconds(30),
    });

    consumer.addEventSource(new SqsEventSource(queue, { batchSize: 5 }));

    const server = this.serverHandler as CdkFunction;

    server.addEnvironment('REVALIDATION_QUEUE_URL', queue.queueUrl);
    server.addEnvironment('REVALIDATION_QUEUE_REGION', Stack.of(this).region);

    queue.grantSendMessages(this.serverHandler.role!);
  }

  private createWarmerFunction() {
    const { warm, edge } = this.props;
    if (!warm) return;

    if (warm && edge) throw new Error('warming not supported on edge');

    if (!this.serverHandler) return;

    const warmer = new CdkFunction(this, 'WarmerFunction', {
      description: 'Server handler warmer',
      code: Code.fromAsset(this.warmerFunctionPath),
      runtime: Runtime.NODEJS_18_X,
      handler: 'index.handler',
      timeout: Duration.minutes(15),
      memorySize: 1024,
      environment: {
        FUNCTION_NAME: this.serverHandler.functionName,
        CONCURRENCY: warm.toString(),
      },
    });

    this.serverHandler.grantInvoke(warmer);

    new Rule(this, 'WarmerScheduler', {
      schedule: Schedule.rate(Duration.minutes(10)),
      targets: [new LambdaFunction(warmer, { retryAttempts: 0 })],
    });
  }

  protected createImageHandler() {
    return new CdkFunction(this, 'ImageOptimizationFunction', {
      runtime: Runtime.NODEJS_18_X,
      currentVersionOptions: {
        removalPolicy: RemovalPolicy.DESTROY,
      },
      handler: 'index.handler',
      code: Code.fromAsset(this.imageOptimizationFunctionPath),
      environment: {
        BUCKET_NAME: this.assets.bucketName,
      },
      logRetention: RetentionDays.THREE_DAYS,
      memorySize: 1536,
      timeout: Duration.seconds(25),
      architecture: Architecture.ARM_64,
      initialPolicy: [new PolicyStatement({
        actions: ['s3:GetObject'],
        resources: [this.assets.arnForObjects('*')],
      })],
    });
  }

  protected buildDomainNames(): string[] {
    const { domainName } = this.props;

    if (!domainName) return [];

    if (typeof domainName === 'string') return [domainName];

    if (domainName.alternateNames && !this.props.certificate) {
      throw new Error('Certificate must be provided when using alternate names.');
    }

    const alternates = domainName?.alternateNames ?? [];

    return [domainName.domainName, ...alternates];
  }

  protected lookupHostedZone(): IHostedZone | undefined {
    const { domainName } = this.props;

    if (!domainName) return;

    if (typeof domainName == 'string') {
      return HostedZone.fromLookup(this, 'HostedZone', {
        domainName,
      });
    } else if (domainName.hostedZone && typeof domainName.hostedZone == 'string') {
      return HostedZone.fromLookup(this, 'HostedZone', {
        domainName: domainName.hostedZone,
      });
    } else {
      if (domainName.external) return;
      return domainName.hostedZone as IHostedZone;
    }
  }

  private createCertificate(): ICertificate | undefined {
    const { domainName } = this.props;

    if (!domainName) return;

    if (typeof domainName == 'string') {
      return new Certificate(this, 'Certificate', {
        domainName,
        validation: CertificateValidation.fromDns(this.hostedZone),
      });
    }

    // No hosted zones for external certificates
    if (!this.hostedZone) return this.props.certificate;

    return new Certificate(this, 'Certificate', {
      domainName: (this.props.domainName as DomainNameProps).domainName,
      validation: CertificateValidation.fromDns(this.hostedZone),
    });
  }

  protected createRoute53Records(): void {
    const { domainName } = this.props;

    if (!domainName|| !this.hostedZone) return;

    let recordName, domainAlias;

    if (typeof domainName === 'string') {
      recordName = domainName;
    } else {
      recordName = domainName.domainName;
      domainAlias = domainName.domainAlias;
    }

    const record = {
      recordName,
      zone: this.hostedZone,
      target: RecordTarget.fromAlias(new CloudFrontTarget(this.distribution)),
    };

    new ARecord(this, 'AliasRecord', record);
    new AaaaRecord(this, 'AliasRecordAAAA', record);

    if (domainAlias) {
      new HttpsRedirect(this, 'Redirect', {
        zone: this.hostedZone,
        recordNames: [domainAlias],
        targetDomain: recordName,
      });
    }
  }
}
