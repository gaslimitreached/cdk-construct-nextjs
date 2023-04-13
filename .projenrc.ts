import { awscdk } from 'projen';
const project = new awscdk.AwsCdkConstructLibrary({
  author: 'Cache Monet',
  authorAddress: 'none@yobusiness.com',
  cdkVersion: '2.73.0',
  defaultReleaseBranch: 'main',
  jsiiVersion: '~5.0.0',
  name: 'cdk-construct-nextjs',
  projenrcTs: true,
  repositoryUrl: 'https://github.com/gaslimitreached/cdk-construct-nextjs.git',

  // deps: [],                /* Runtime dependencies of this module. */
  // description: undefined,  /* The description is just a string that helps people understand the purpose of the package. */
  // devDeps: [],             /* Build dependencies for this module. */
  // packageName: undefined,  /* The "name" in package.json. */
});
project.github?.addDependabot();
project.synth();
