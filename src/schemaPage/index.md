## SchemaPage

Demo:

```tsx
import React from 'react';
import { SchemaPage } from 'schema-components';
import { Table, Button } from 'antd';
import styled from 'styled-components';

import { WebsiteBaseTable } from 'schema-components';

const componentMap: any = {
  AntdButton: Button,
  Table,
  Text: styled.div``,
  Actions: styled.div``,
  Form: styled.div``,
  WebsiteBaseTable,
};

const schemaString = JSON.stringify({
  structure: {
    component: 'page',
    id: 'page',
    className: 'm-l-10',
    style: { marginLeft: 10 },
    children: [
      {
        component: 'Text',
        id: 'Text_3123',
        children: [
          {
            component: 'Text',
            id: 'Text_9sa',
            children: 'test text',
          },
        ],
      },
      {
        component: 'Form',
        id: 'Form_001',
        children: '这里是 form',
      },

      {
        component: 'Actions',
        id: 'Actions_002',
        children: [
          {
            component: 'AntdButton',
            id: 'AntdButton_003',
          },
          {
            component: 'AntdButton',
            id: 'AntdButton_004',
          },
        ],
      },

      {
        component: 'Table',
        id: 'Table_004',
      },

      {
        component: 'WebsiteBaseTable',
        id: 'WebsiteBaseTable_010',
      },
    ],
  },
  data: {
    Form_001: {
      title: '我是 title',
    },
    Actions_002: {},
    AntdButton_003: {
      text: 'button ',
      type: 'primary',
      onClick: '$page.event.changeText',
    },
    Table_004: {
      columns: [
        {
          code: 'prov',
          name: '省份',
          width: 150,
          component: 'TableText',
          align: 'right',
        },
      ],
    },
    WebsiteBaseTable_010: {
      columns: [
        {
          code: 'prov',
          name: '省份',
          width: 150,
          component: 'TableText',
          align: 'right',
        },
        { code: 'confirmed', name: '确诊', width: 100, align: 'right' },
        { code: 'cured', name: '治愈', width: 100, align: 'right' },
        { code: 'dead', name: '死亡', width: 100, align: 'right' },
        { code: 't', name: '最后更新时间', width: 180 },
      ],
      dataSource: [
        {
          prov: '湖北省',
          confirmed: 54406,
          cured: 4793,
          dead: 1457,
          t: '2020-02-15 19:52:02',
        },
        {
          prov: '广东省',
          confirmed: 1294,
          cured: 409,
          dead: 2,
          t: '2020-02-15 19:52:02',
        },
        {
          prov: '河南省',
          confirmed: 1212,
          cured: 390,
          dead: 13,
          t: '2020-02-15 19:52:02',
        },
        {
          prov: '浙江省',
          confirmed: 1162,
          cured: 428,
          dead: 0,
          t: '2020-02-15 19:52:02',
        },
        {
          prov: '湖南省',
          confirmed: 1001,
          cured: 417,
          dead: 2,
          t: '2020-02-15 19:52:02',
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
  <SchemaPage
    title="First Demo"
    componentMap={componentMap}
    schema={schemaString}
  />
);
```
