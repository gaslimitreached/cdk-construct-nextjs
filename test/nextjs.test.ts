import * as cdk from 'aws-cdk-lib';
import { Template } from 'aws-cdk-lib/assertions';
import { NextJs } from '../src';

describe('Nextjs Construct', () => {
  test('Static assets bucket created', () => {
    // WHEN
    const stack = new cdk.Stack();
    new NextJs(stack, 'NextJs', { path: '../test/mock-site' });
    // THEN
    const template = Template.fromStack(stack);
    template.hasResource('AWS::S3::Bucket', {
    });
  });
});
