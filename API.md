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
import { NextJs } from 'cdk-construct-nextjs';

new NextJs(this, 'handler', {
  path: '../apps/website',
});
```

### Domain names

This construct assumes that the provided `domainName` is the same as the `hostedZoneId`.

```ts
import { NextJs } from 'cdk-construct-nextjs';

new NextJs(this, 'handler', {
  path: '../apps/website',
  domainName: 'example.com',
});
```

Existing hosted zones can be provided as an object.

```ts
import { NextJs } from 'cdk-construct-nextjs';

new NextJs(this, 'handler', {
  path: '../apps/website',
  domainName: {
    domainName: 'example.com',
    hostedZone: 'existing.com',
  }
});
```

## Acknowledgements

These constructs were inspired by or directly modified from many sources, primarily:

- https://github.com/serverless-stack/sst/blob/master/packages/sst/src/constructs/NextjsSite.ts
- https://serverless-nextjs.com/docs/cdkconstruct/
- https://github.com/rayova/cdk-serverless-nextjs

# API Reference <a name="API Reference" id="api-reference"></a>

## Constructs <a name="Constructs" id="Constructs"></a>

### NextJs <a name="NextJs" id="cdk-construct-nextjs.NextJs"></a>

#### Initializers <a name="Initializers" id="cdk-construct-nextjs.NextJs.Initializer"></a>

```typescript
import { NextJs } from 'cdk-construct-nextjs'

new NextJs(scope: Construct, id: string, props: IProps)
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#cdk-construct-nextjs.NextJs.Initializer.parameter.scope">scope</a></code> | <code>constructs.Construct</code> | *No description.* |
| <code><a href="#cdk-construct-nextjs.NextJs.Initializer.parameter.id">id</a></code> | <code>string</code> | *No description.* |
| <code><a href="#cdk-construct-nextjs.NextJs.Initializer.parameter.props">props</a></code> | <code><a href="#cdk-construct-nextjs.IProps">IProps</a></code> | *No description.* |

---

##### `scope`<sup>Required</sup> <a name="scope" id="cdk-construct-nextjs.NextJs.Initializer.parameter.scope"></a>

- *Type:* constructs.Construct

---

##### `id`<sup>Required</sup> <a name="id" id="cdk-construct-nextjs.NextJs.Initializer.parameter.id"></a>

- *Type:* string

---

##### `props`<sup>Required</sup> <a name="props" id="cdk-construct-nextjs.NextJs.Initializer.parameter.props"></a>

- *Type:* <a href="#cdk-construct-nextjs.IProps">IProps</a>

---

#### Methods <a name="Methods" id="Methods"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#cdk-construct-nextjs.NextJs.toString">toString</a></code> | Returns a string representation of this construct. |

---

##### `toString` <a name="toString" id="cdk-construct-nextjs.NextJs.toString"></a>

```typescript
public toString(): string
```

Returns a string representation of this construct.

#### Static Functions <a name="Static Functions" id="Static Functions"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#cdk-construct-nextjs.NextJs.isConstruct">isConstruct</a></code> | Checks if `x` is a construct. |

---

##### ~~`isConstruct`~~ <a name="isConstruct" id="cdk-construct-nextjs.NextJs.isConstruct"></a>

```typescript
import { NextJs } from 'cdk-construct-nextjs'

NextJs.isConstruct(x: any)
```

Checks if `x` is a construct.

###### `x`<sup>Required</sup> <a name="x" id="cdk-construct-nextjs.NextJs.isConstruct.parameter.x"></a>

- *Type:* any

Any object.

---

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#cdk-construct-nextjs.NextJs.property.node">node</a></code> | <code>constructs.Node</code> | The tree node. |
| <code><a href="#cdk-construct-nextjs.NextJs.property.assets">assets</a></code> | <code>aws-cdk-lib.aws_s3.Bucket</code> | *No description.* |
| <code><a href="#cdk-construct-nextjs.NextJs.property.distribution">distribution</a></code> | <code>aws-cdk-lib.aws_cloudfront.Distribution</code> | *No description.* |
| <code><a href="#cdk-construct-nextjs.NextJs.property.imageHandler">imageHandler</a></code> | <code>aws-cdk-lib.aws_lambda.Function</code> | *No description.* |
| <code><a href="#cdk-construct-nextjs.NextJs.property.origin">origin</a></code> | <code>aws-cdk-lib.aws_cloudfront.IOrigin</code> | *No description.* |
| <code><a href="#cdk-construct-nextjs.NextJs.property.serverBehavior">serverBehavior</a></code> | <code>aws-cdk-lib.aws_cloudfront.BehaviorOptions</code> | *No description.* |
| <code><a href="#cdk-construct-nextjs.NextJs.property.serverHandler">serverHandler</a></code> | <code>aws-cdk-lib.aws_lambda.Function \| aws-cdk-lib.aws_cloudfront.experimental.EdgeFunction</code> | *No description.* |
| <code><a href="#cdk-construct-nextjs.NextJs.property.certificate">certificate</a></code> | <code>aws-cdk-lib.aws_certificatemanager.ICertificate</code> | *No description.* |
| <code><a href="#cdk-construct-nextjs.NextJs.property.hostedZone">hostedZone</a></code> | <code>aws-cdk-lib.aws_route53.IHostedZone</code> | *No description.* |

---

##### `node`<sup>Required</sup> <a name="node" id="cdk-construct-nextjs.NextJs.property.node"></a>

```typescript
public readonly node: Node;
```

- *Type:* constructs.Node

The tree node.

---

##### `assets`<sup>Required</sup> <a name="assets" id="cdk-construct-nextjs.NextJs.property.assets"></a>

```typescript
public readonly assets: Bucket;
```

- *Type:* aws-cdk-lib.aws_s3.Bucket

---

##### `distribution`<sup>Required</sup> <a name="distribution" id="cdk-construct-nextjs.NextJs.property.distribution"></a>

```typescript
public readonly distribution: Distribution;
```

- *Type:* aws-cdk-lib.aws_cloudfront.Distribution

---

##### `imageHandler`<sup>Required</sup> <a name="imageHandler" id="cdk-construct-nextjs.NextJs.property.imageHandler"></a>

```typescript
public readonly imageHandler: Function;
```

- *Type:* aws-cdk-lib.aws_lambda.Function

---

##### `origin`<sup>Required</sup> <a name="origin" id="cdk-construct-nextjs.NextJs.property.origin"></a>

```typescript
public readonly origin: IOrigin;
```

- *Type:* aws-cdk-lib.aws_cloudfront.IOrigin

---

##### `serverBehavior`<sup>Required</sup> <a name="serverBehavior" id="cdk-construct-nextjs.NextJs.property.serverBehavior"></a>

```typescript
public readonly serverBehavior: BehaviorOptions;
```

- *Type:* aws-cdk-lib.aws_cloudfront.BehaviorOptions

---

##### `serverHandler`<sup>Required</sup> <a name="serverHandler" id="cdk-construct-nextjs.NextJs.property.serverHandler"></a>

```typescript
public readonly serverHandler: Function | EdgeFunction;
```

- *Type:* aws-cdk-lib.aws_lambda.Function | aws-cdk-lib.aws_cloudfront.experimental.EdgeFunction

---

##### `certificate`<sup>Optional</sup> <a name="certificate" id="cdk-construct-nextjs.NextJs.property.certificate"></a>

```typescript
public readonly certificate: ICertificate;
```

- *Type:* aws-cdk-lib.aws_certificatemanager.ICertificate

---

##### `hostedZone`<sup>Optional</sup> <a name="hostedZone" id="cdk-construct-nextjs.NextJs.property.hostedZone"></a>

```typescript
public readonly hostedZone: IHostedZone;
```

- *Type:* aws-cdk-lib.aws_route53.IHostedZone

---


## Structs <a name="Structs" id="Structs"></a>

### DomainNameProps <a name="DomainNameProps" id="cdk-construct-nextjs.DomainNameProps"></a>

#### Initializer <a name="Initializer" id="cdk-construct-nextjs.DomainNameProps.Initializer"></a>

```typescript
import { DomainNameProps } from 'cdk-construct-nextjs'

const domainNameProps: DomainNameProps = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#cdk-construct-nextjs.DomainNameProps.property.domainName">domainName</a></code> | <code>string</code> | *No description.* |
| <code><a href="#cdk-construct-nextjs.DomainNameProps.property.hostedZone">hostedZone</a></code> | <code>string \| aws-cdk-lib.aws_route53.IHostedZone</code> | *No description.* |
| <code><a href="#cdk-construct-nextjs.DomainNameProps.property.alternateNames">alternateNames</a></code> | <code>string[]</code> | *No description.* |
| <code><a href="#cdk-construct-nextjs.DomainNameProps.property.certificate">certificate</a></code> | <code>aws-cdk-lib.aws_certificatemanager.ICertificate</code> | *No description.* |
| <code><a href="#cdk-construct-nextjs.DomainNameProps.property.domainAlias">domainAlias</a></code> | <code>string</code> | *No description.* |
| <code><a href="#cdk-construct-nextjs.DomainNameProps.property.external">external</a></code> | <code>boolean</code> | *No description.* |

---

##### `domainName`<sup>Required</sup> <a name="domainName" id="cdk-construct-nextjs.DomainNameProps.property.domainName"></a>

```typescript
public readonly domainName: string;
```

- *Type:* string

---

##### `hostedZone`<sup>Required</sup> <a name="hostedZone" id="cdk-construct-nextjs.DomainNameProps.property.hostedZone"></a>

```typescript
public readonly hostedZone: string | IHostedZone;
```

- *Type:* string | aws-cdk-lib.aws_route53.IHostedZone

---

##### `alternateNames`<sup>Optional</sup> <a name="alternateNames" id="cdk-construct-nextjs.DomainNameProps.property.alternateNames"></a>

```typescript
public readonly alternateNames: string[];
```

- *Type:* string[]

---

##### `certificate`<sup>Optional</sup> <a name="certificate" id="cdk-construct-nextjs.DomainNameProps.property.certificate"></a>

```typescript
public readonly certificate: ICertificate;
```

- *Type:* aws-cdk-lib.aws_certificatemanager.ICertificate

---

##### `domainAlias`<sup>Optional</sup> <a name="domainAlias" id="cdk-construct-nextjs.DomainNameProps.property.domainAlias"></a>

```typescript
public readonly domainAlias: string;
```

- *Type:* string

---

##### `external`<sup>Optional</sup> <a name="external" id="cdk-construct-nextjs.DomainNameProps.property.external"></a>

```typescript
public readonly external: boolean;
```

- *Type:* boolean

---


## Protocols <a name="Protocols" id="Protocols"></a>

### IProps <a name="IProps" id="cdk-construct-nextjs.IProps"></a>

- *Implemented By:* <a href="#cdk-construct-nextjs.IProps">IProps</a>


#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#cdk-construct-nextjs.IProps.property.path">path</a></code> | <code>string</code> | *No description.* |
| <code><a href="#cdk-construct-nextjs.IProps.property.edge">edge</a></code> | <code>boolean</code> | *No description.* |
| <code><a href="#cdk-construct-nextjs.IProps.property.role">role</a></code> | <code>aws-cdk-lib.aws_iam.Role</code> | *No description.* |
| <code><a href="#cdk-construct-nextjs.IProps.property.certificate">certificate</a></code> | <code>aws-cdk-lib.aws_certificatemanager.ICertificate</code> | *No description.* |
| <code><a href="#cdk-construct-nextjs.IProps.property.domainName">domainName</a></code> | <code>string \| <a href="#cdk-construct-nextjs.DomainNameProps">DomainNameProps</a></code> | *No description.* |

---

##### `path`<sup>Required</sup> <a name="path" id="cdk-construct-nextjs.IProps.property.path"></a>

```typescript
public readonly path: string;
```

- *Type:* string

---

##### `edge`<sup>Optional</sup> <a name="edge" id="cdk-construct-nextjs.IProps.property.edge"></a>

```typescript
public readonly edge: boolean;
```

- *Type:* boolean

---

##### `role`<sup>Optional</sup> <a name="role" id="cdk-construct-nextjs.IProps.property.role"></a>

```typescript
public readonly role: Role;
```

- *Type:* aws-cdk-lib.aws_iam.Role

---

##### `certificate`<sup>Optional</sup> <a name="certificate" id="cdk-construct-nextjs.IProps.property.certificate"></a>

```typescript
public readonly certificate: ICertificate;
```

- *Type:* aws-cdk-lib.aws_certificatemanager.ICertificate

---

##### `domainName`<sup>Optional</sup> <a name="domainName" id="cdk-construct-nextjs.IProps.property.domainName"></a>

```typescript
public readonly domainName: string | DomainNameProps;
```

- *Type:* string | <a href="#cdk-construct-nextjs.DomainNameProps">DomainNameProps</a>

---

