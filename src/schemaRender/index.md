## 基础使用

Demo:

```tsx
import React from 'react';
import { SchemaRender } from 'schema-components';
import schemeJson from './test.json';
const componentMap = {
  Wrap: () => {
    return <div>123</div>;
  },
};

export default () => (
  <SchemaRender
    title="First Demo"
    componentMap={componentMap}
    schema={schemeJson}
  />
);
```

<API></API>
