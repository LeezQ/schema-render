## 基础使用

Demo:

```tsx
import React from 'react';
import { SchemaRender } from 'schema-components';
import componentMap from './components';
import schemeJson from './demo.json';

export default () => (
  <SchemaRender
    title="First Demo"
    componentMap={componentMap}
    schema={schemeJson}
  />
);
```

<API></API>
