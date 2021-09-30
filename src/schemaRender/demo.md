## 简单示例

```tsx
import React from 'react';
import { SchemaRender } from 'schema-components';
import styled from 'styled-components';
import { Button } from 'antd';
import ProTable from '../proSchemaTable';

const componentMap = {
  Wrap: styled.div`
    padding: 20px;
    background: #ccc;
  `,
  Button,
  ProTable,
  WhiteSpace: styled.div`
    margin: 0 0 20px;
  `,
  CustomRender: (value) => {
    return <div>custom render, status: {value.status}</div>;
  },
};

const schema = JSON.parse(
  JSON.stringify({
    structure: {
      component: 'page',
      id: 'page',
      children: [
        {
          component: 'Wrap',
          id: 'wrap_demo',
          children: [
            {
              component: 'Button',
              id: 'button_demo',
              children: 'test',
            },
            {
              component: 'WhiteSpace',
            },
            {
              component: 'ProTable',
              id: 'protable_demo',
            },
          ],
        },
      ],
    },
    data: {
      button_demo: {
        type: 'primary',
      },
      protable_demo: {
        url: 'https://yapi.jushuitan.com/mock/93/v2/open/api/approvelist',
        columns: [
          {
            title: 'name',
            dataIndex: 'name',
          },
          {
            title: '操作',
            render: '$C.CustomRender',
          },
        ],
      },
    },
    event: {},
  }),
);

export default () => (
  <SchemaRender componentMap={componentMap} schema={schema} />
);
```
