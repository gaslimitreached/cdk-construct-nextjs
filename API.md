# API Reference <a name="API Reference" id="api-reference"></a>

## Constructs <a name="Constructs" id="Constructs"></a>

### Nextjs <a name="Nextjs" id="cdk-construct-nextjs.Nextjs"></a>

#### Initializers <a name="Initializers" id="cdk-construct-nextjs.Nextjs.Initializer"></a>

```typescript
import { Nextjs } from 'cdk-construct-nextjs'

new Nextjs(scope: Construct, id: string, props: IProps)
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#cdk-construct-nextjs.Nextjs.Initializer.parameter.scope">scope</a></code> | <code>constructs.Construct</code> | *No description.* |
| <code><a href="#cdk-construct-nextjs.Nextjs.Initializer.parameter.id">id</a></code> | <code>string</code> | *No description.* |
| <code><a href="#cdk-construct-nextjs.Nextjs.Initializer.parameter.props">props</a></code> | <code><a href="#cdk-construct-nextjs.IProps">IProps</a></code> | *No description.* |

---

##### `scope`<sup>Required</sup> <a name="scope" id="cdk-construct-nextjs.Nextjs.Initializer.parameter.scope"></a>

- *Type:* constructs.Construct

---

##### `id`<sup>Required</sup> <a name="id" id="cdk-construct-nextjs.Nextjs.Initializer.parameter.id"></a>

- *Type:* string

---

##### `props`<sup>Required</sup> <a name="props" id="cdk-construct-nextjs.Nextjs.Initializer.parameter.props"></a>

- *Type:* <a href="#cdk-construct-nextjs.IProps">IProps</a>

---

#### Methods <a name="Methods" id="Methods"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#cdk-construct-nextjs.Nextjs.toString">toString</a></code> | Returns a string representation of this construct. |

---

##### `toString` <a name="toString" id="cdk-construct-nextjs.Nextjs.toString"></a>

```typescript
public toString(): string
```

Returns a string representation of this construct.

#### Static Functions <a name="Static Functions" id="Static Functions"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#cdk-construct-nextjs.Nextjs.isConstruct">isConstruct</a></code> | Checks if `x` is a construct. |

---

##### ~~`isConstruct`~~ <a name="isConstruct" id="cdk-construct-nextjs.Nextjs.isConstruct"></a>

```typescript
import { Nextjs } from 'cdk-construct-nextjs'

Nextjs.isConstruct(x: any)
```

Checks if `x` is a construct.

###### `x`<sup>Required</sup> <a name="x" id="cdk-construct-nextjs.Nextjs.isConstruct.parameter.x"></a>

- *Type:* any

Any object.

---

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#cdk-construct-nextjs.Nextjs.property.node">node</a></code> | <code>constructs.Node</code> | The tree node. |
| <code><a href="#cdk-construct-nextjs.Nextjs.property.assets">assets</a></code> | <code>aws-cdk-lib.aws_s3.Bucket</code> | *No description.* |
| <code><a href="#cdk-construct-nextjs.Nextjs.property.distribution">distribution</a></code> | <code>aws-cdk-lib.aws_cloudfront.Distribution</code> | *No description.* |
| <code><a href="#cdk-construct-nextjs.Nextjs.property.imageHandler">imageHandler</a></code> | <code>aws-cdk-lib.aws_lambda.Function</code> | *No description.* |
| <code><a href="#cdk-construct-nextjs.Nextjs.property.origin">origin</a></code> | <code>aws-cdk-lib.aws_cloudfront.IOrigin</code> | *No description.* |
| <code><a href="#cdk-construct-nextjs.Nextjs.property.serverBehavior">serverBehavior</a></code> | <code>aws-cdk-lib.aws_cloudfront.BehaviorOptions</code> | *No description.* |
| <code><a href="#cdk-construct-nextjs.Nextjs.property.serverHandler">serverHandler</a></code> | <code>aws-cdk-lib.aws_lambda.Function \| aws-cdk-lib.aws_cloudfront.experimental.EdgeFunction</code> | *No description.* |

---

##### `node`<sup>Required</sup> <a name="node" id="cdk-construct-nextjs.Nextjs.property.node"></a>

```typescript
public readonly node: Node;
```

- *Type:* constructs.Node

The tree node.

---

##### `assets`<sup>Required</sup> <a name="assets" id="cdk-construct-nextjs.Nextjs.property.assets"></a>

```typescript
public readonly assets: Bucket;
```

- *Type:* aws-cdk-lib.aws_s3.Bucket

---

##### `distribution`<sup>Required</sup> <a name="distribution" id="cdk-construct-nextjs.Nextjs.property.distribution"></a>

```typescript
public readonly distribution: Distribution;
```

- *Type:* aws-cdk-lib.aws_cloudfront.Distribution

---

##### `imageHandler`<sup>Required</sup> <a name="imageHandler" id="cdk-construct-nextjs.Nextjs.property.imageHandler"></a>

```typescript
public readonly imageHandler: Function;
```

- *Type:* aws-cdk-lib.aws_lambda.Function

---

##### `origin`<sup>Required</sup> <a name="origin" id="cdk-construct-nextjs.Nextjs.property.origin"></a>

```typescript
public readonly origin: IOrigin;
```

- *Type:* aws-cdk-lib.aws_cloudfront.IOrigin

---

##### `serverBehavior`<sup>Required</sup> <a name="serverBehavior" id="cdk-construct-nextjs.Nextjs.property.serverBehavior"></a>

```typescript
public readonly serverBehavior: BehaviorOptions;
```

- *Type:* aws-cdk-lib.aws_cloudfront.BehaviorOptions

---

##### `serverHandler`<sup>Required</sup> <a name="serverHandler" id="cdk-construct-nextjs.Nextjs.property.serverHandler"></a>

```typescript
public readonly serverHandler: Function | EdgeFunction;
```

- *Type:* aws-cdk-lib.aws_lambda.Function | aws-cdk-lib.aws_cloudfront.experimental.EdgeFunction

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

