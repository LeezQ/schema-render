## 登录页面

登录页面:

```tsx
import React from 'react';
import { SchemaRender } from 'schema-components';
import componentMap from './components';
import schemeJson from './login.json';

export default () => (
  <SchemaRender
    title="First Demo"
    componentMap={componentMap}
    schema={schemeJson}
  />
);
```
