import { existsSync } from 'fs';
import { join } from 'path';

import { Duration, Fn, RemovalPolicy } from 'aws-cdk-lib';
import { AllowedMethods, BehaviorOptions, CacheCookieBehavior, CacheHeaderBehavior, CachePolicy, CacheQueryStringBehavior, CachedMethods, Distribution, IOrigin, LambdaEdgeEventType, OriginRequestCookieBehavior, OriginRequestHeaderBehavior, OriginRequestPolicy, OriginRequestQueryStringBehavior, ViewerProtocolPolicy, experimental } from 'aws-cdk-lib/aws-cloudfront';
import { HttpOrigin, OriginGroup, S3Origin } from 'aws-cdk-lib/aws-cloudfront-origins';
import { IRole, PolicyStatement, Role } from 'aws-cdk-lib/aws-iam';
import { Function as CdkFunction, Runtime, Code, Architecture, FunctionUrlAuthType, Alias } from 'aws-cdk-lib/aws-lambda';
import { RetentionDays } from 'aws-cdk-lib/aws-logs';
import { Bucket } from 'aws-cdk-lib/aws-s3';
import { BucketDeployment, CacheControl, Source } from 'aws-cdk-lib/aws-s3-deployment';
import { Construct } from 'constructs';

export interface IProps {
  path: string;
  edge?: boolean;
  role?: Role;
}

export class NextJs extends Construct {
  protected props: IProps;
  public readonly origin: IOrigin;
  public readonly assets: Bucket;
  public readonly imageHandler: CdkFunction;
  public readonly serverHandler: CdkFunction | experimental.EdgeFunction;
  public readonly serverBehavior: BehaviorOptions;
  public readonly distribution: Distribution;

  private buildPath: string;
  private staticAssetsPath: string;
  private hashedAssetsPath: string;
  private serverFunctionPath: string;
  private imageOptimizationFunctionPath: string;

  constructor(scope: Construct, id: string, props: IProps) {
    super(scope, id);

    this.props = {
      path: props.path,
      edge: props.edge ?? false,
    };

    this.buildPath = join(props.path, '.open-next');
    this.staticAssetsPath = join(this.buildPath, 'assets');
    this.hashedAssetsPath = join(this.staticAssetsPath, '_next');
    this.serverFunctionPath = join(this.buildPath, 'server-function');
    this.imageOptimizationFunctionPath = join(this.buildPath, 'image-optimization-function');

    this.verifyBuildOutput();

    this.assets = new Bucket(this, 'StaticAssetsBucket', {
      removalPolicy: RemovalPolicy.DESTROY,
      autoDeleteObjects: true,
    });

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
    this.distribution = this.createDistribution();
    this.createBucketDeployment();
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

  protected createImageHandler() {
    return new CdkFunction(this, 'ImageOptimizationFunction', {
      runtime: Runtime.NODEJS_14_X,
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
}
