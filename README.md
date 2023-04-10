# CDK Construct NextJS
<!--BEGIN STABILITY BANNER-->

---

![cdk-constructs: Experimental](https://img.shields.io/badge/cdk--constructs-experimental-important.svg?style=for-the-badge)

> The APIs of higher level constructs in this module are experimental and under active development.
> They are subject to non-backward compatible changes or removal in any future version. These are
> not subject to the [Semantic Versioning](https://semver.org/) model and breaking changes will be
> announced in the release notes. This means that while you may use them, you may need to update
> your source code when upgrading to a newer version of this package.

---

<!--END STABILITY BANNER-->

This library provides constructs for hosting [Next.JS](https://nextjs.org/) web applications built using [open-next](https://github.com/serverless-stack/open-next).

Supports versions: 12 and 13

## Install

```bash
npm install cdk-construct-nextjs
```

## Usage

```ts
import { Nextjs } from 'cdk-construct-nextjs';

new Nextjs(this, 'handler', {
  path: '../apps/website',
});
```

## Acknowledgements

These constructs were inspired by or directly modified from many sources, primarily:

- https://github.com/serverless-stack/sst/blob/master/packages/sst/src/constructs/NextjsSite.ts
- https://serverless-nextjs.com/docs/cdkconstruct/
- https://github.com/rayova/cdk-serverless-nextjs
