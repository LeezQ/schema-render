## 基础使用

Demo:

```tsx
import React from 'react';
import { SchemaRender } from 'schema-components';
import { Table, Button, Switch, Badge } from 'antd';
import styled from 'styled-components';

import { WebsiteBaseTable } from 'schema-components';

const componentMap: any = {
  AntdButton: Button,
  AntDTable: Table,
  Title: styled.div`
    font-size: 16px;
  `,
  Actions: styled.div({
    marginBottom: 40,
    '.ant-btn': {
      marginRight: 10,
    },
  }),
  Wrap: styled.div`
    padding: 20px;
    background: #f5f8fa;
  `,
  Content: styled.div`
    padding: 20px;
    background: #fff;
  `,

  WebsiteBaseTable,
  TableRegistComponent: {
    Status: (status) => {
      let ele = null;
      switch (status) {
        case 'online':
          ele = '已启用';
          break;

        case 'approving':
          ele = <Badge status="processing" text="审批中" />;
          break;

        case 'reject':
          ele = <Badge status="error" text="已驳回" />;
          break;

        case 'offline':
          ele = <Badge status="default" text="已下线" />;
          break;

        default:
          break;
      }
      return <div>{ele}</div>;
    },
    Options: (props) => {
      console.log(22, props);
      return <a>详情</a>;
    },
  },
};

const schemaString = JSON.stringify({
  structure: {
    component: 'page',
    id: 'page',
    className: 'm-l-10',
    style: { marginLeft: 10 },
    children: [
      {
        component: 'Title',
        id: 'Text_3123',
        children: '管理应用',
      },

      {
        component: 'Wrap',
        id: 'Wrap_2123',
        children: [
          {
            component: 'Content',
            children: [
              {
                component: 'Actions',
                children: [
                  {
                    component: 'AntdButton',
                    id: 'AntdButton_003',
                    children: '申请应用 ',
                  },
                ],
              },
              {
                component: 'WebsiteBaseTable',
                id: 'WebsiteBaseTable_010',
              },
            ],
          },
        ],
      },
    ],
  },
  data: {
    Form_001: {
      title: '我是 title',
    },
    Actions_002: {},
    AntdButton_003: {
      type: 'primary',
      onClick: '$page.event.changeText',
    },
    WebsiteBaseTable_010: {
      registComponent: '$C.TableRegistComponent',
      columns: [
        {
          code: 'name',
          name: '应用名称',
          width: 150,
        },
        {
          code: 'created',
          name: '创建时间',
          width: 100,
          renderComponent: 'Date',
        },
        {
          code: 'status',
          name: '状态',
          width: 100,
          renderComponent: 'Status',
        },
        {
          name: '操作',
          width: 100,
          renderComponent: 'Options',
        },
      ],
      dataSource: [
        {
          id: 0,
          name: '阿鲁巴物流预警',
          created: 1632479873922,
          status: 'online',
        },
        {
          id: 1,
          name: '阿鲁巴物流预警',
          created: 1632479873922,
          status: 'approving',
        },
        {
          id: 2,
          name: '阿鲁巴物流预警',
          created: 1632479873922,
          status: 'reject',
        },
        {
          id: 3,
          name: '阿鲁巴物流预警',
          created: 1632479873922,
          status: 'offline',
        },
      ],
    },
  },

  event: {
    onLoad: {
      type: 'request',
      url: '/api/getData',
    },
    changeText: {},
  },
});

export default () => (
  <SchemaRender
    title="First Demo"
    componentMap={componentMap}
    schema={schemaString}
  />
);
```

<API></API>
