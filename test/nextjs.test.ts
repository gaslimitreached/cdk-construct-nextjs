import { join } from 'path';
import * as cdk from 'aws-cdk-lib';
import { Match, Template } from 'aws-cdk-lib/assertions';
import { HostedZone, HostedZoneProviderProps } from 'aws-cdk-lib/aws-route53';
import { Construct } from 'constructs';

import { NextJs } from '../src';

jest.mock('aws-cdk-lib/aws-route53', () => {
  const actual = jest.requireActual('aws-cdk-lib/aws-route53');
  actual.HostedZone.fromLookup = (
    scope: Construct,
    id: string,
    { domainName }: HostedZoneProviderProps,
  ) => new HostedZone(scope, id, {
    zoneName: domainName,
  });
  return actual;
});

describe('Nextjs Construct', () => {
  describe('Static assets', () => {
    test('Static assets bucket created', () => {
      // WHEN
      const stack = new cdk.Stack();
      new NextJs(stack, 'NextJs', { path: join(__dirname, '..', 'test', 'mock-site') });
      // THEN
      const template = Template.fromStack(stack);
      template.hasResource('AWS::S3::Bucket', {
      });
    });
  });

  describe('CloudFront Distribution', () => {
    test('Distribution is created', () => {
      // WHEN
      const stack = new cdk.Stack();
      new NextJs(stack, 'NextJs', { path: join(__dirname, '..', 'test', 'mock-site') });
      // THEN
      const template = Template.fromStack(stack);
      template.hasResource('AWS::CloudFront::Distribution', {});
    });

    describe('Custom domain name', () => {
      test('Creates routes', () => {
        const stack = new cdk.Stack();

        new NextJs(stack, 'NextJs', {
          domainName: 'example.com',
          path: join(__dirname, '..', 'test', 'mock-site'),
        });

        const template = Template.fromStack(stack);
        template.resourceCountIs('AWS::Route53::RecordSet', 2);
        template.hasResourceProperties('AWS::Route53::RecordSet', { Type: 'A' });
        template.hasResourceProperties('AWS::Route53::RecordSet', { Type: 'AAAA' });
      });

      describe('Given domainName string', () => {
        test('Creates certificate and validates to hosted zone', () => {
          const stack = new cdk.Stack();

          new NextJs(stack, 'NextJs', {
            domainName: 'example.com',
            path: join(__dirname, '..', 'test', 'mock-site'),
          });

          const template = Template.fromStack(stack);

          template.hasResourceProperties('AWS::Route53::HostedZone', {
            Name: Match.stringLikeRegexp('^example.com'),
          });

          template.hasResourceProperties('AWS::CertificateManager::Certificate', {
            DomainName: 'example.com',
            DomainValidationOptions: [{ DomainName: 'example.com', HostedZoneId: Match.anyValue() }],
          });
        });
      });

      describe('Given domainName object', () => {
        test('Creates certifcate and validates to hosted zone', () => {
          const stack = new cdk.Stack();

          new NextJs(stack, 'NextJs', {
            domainName: {
              domainName: 'existing.com',
              hostedZone: 'existing-zone',
            },
            path: join(__dirname, '..', 'test', 'mock-site'),
          });

          const template = Template.fromStack(stack);

          template.hasResourceProperties('AWS::Route53::HostedZone', {
            Name: Match.stringLikeRegexp('^existing'),
          });

          template.hasResourceProperties('AWS::CertificateManager::Certificate', {
            DomainName: 'existing.com',
            DomainValidationOptions: [{ DomainName: 'existing.com', HostedZoneId: Match.anyValue() }],
          });
        });
      });
    });
  });

  describe('Server Side Rendering', () => {
    test('Image server', () => {
      // WHEN
      const stack = new cdk.Stack();
      new NextJs(stack, 'NextJs', { path: join(__dirname, '..', 'test', 'mock-site') });
      // THEN
      const template = Template.fromStack(stack);
      template.hasResourceProperties('AWS::Lambda::Function', {
        Architectures: ['arm64'],
        Runtime: 'nodejs18.x',
      });
    });
  });
});
