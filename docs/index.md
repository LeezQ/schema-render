## 使用指南

### 安装

> npm i schema-render

### 使用

```javascript
<SchemaRender componentMap={componentMap} schema={schemeJson} />
```

### API

- ### componentMap 组件列表

`componentMap` 以 [key: string]: ReactComponent 形式组成，

```javascript
import { Table, Button } from 'antd';
import styled from 'styled-components';

const componentMap = {
  AntdButton: Button,
  AntDTable: Table,
  Title: styled.div({
    marginBottom: 40,
    '.ant-btn': {
      marginRight: 10,
    },
  }),
  Layout: style.div`
    background: #fff;
  `,
};
```

value 可以是 function 组件，也可以是外部 export 的组件，组件 map 用于在 schema 中的解析和定义

- ### schema 页面协议

```json
{
  "structure": {
    "component": "page",
    "id": "page",
    "children": [
      {
        "component": "Layout",
        "id": "vlsi2v",
        "style": { "position": "relative", "height": "calc(70vh)" },
        "children": [
          {
            "component": "LoginForm",
            "style": { "position": "absolute", "right": 30, "top": "30%" },
            "id": "ialvbj"
          }
        ]
      }
    ]
  },
  "data": {
    "ialvbj": {
      "name": "hello",
      "key": "world"
    },
    "vlsi2v": {
      "value": "$S.ialvbj"
    }
  },
  "event": {}
}
```

schema 由三部分组成 `structure` `data` `event`

- #### structure
  页面的结构，描述页面布局相关信息

```typescript
interface structure {
  component: string;
  id: uuid;
  style: React.CSSProperty;
  class: string;
  children: React.Node;
}
```

component 的 value 是 componentMap 中对应的 key 值，目前 component 只支持本地组件，后续可以扩展到加载异步组件模块

- #### data
  一般用于组件关联的初始数据或者 props 等，所有 data 字段都会被透传到组件 props 上。

```typescript
interface data {
  [key: string]: object;
}
```

注：data 中的 value 可以相互引用，在一些场景下，比如 table 中，有 render 方法，可以写自定义函数，这个时候，我们可以通过 `$C.` 来进行引用。

```json
    "toolBarRender": "$C.ToolBar",
```

- #### event
  页面相关的事件，典型场景：如组件之间联动，页面加载是进行数据请求

```typescript
interface event {
  when: '$ialvbj.onChange';
  execute: 'request:/api/getName';
  target: '$vlsi2v.value';
}
```
