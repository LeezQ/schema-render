import { Table, Button, Badge, Modal, Drawer, Space, Tag } from 'antd';
import styled from 'styled-components';

import ProSchemaTable from '../../proSchemaTable';
import React, { useState } from 'react';
import loginComponentMap from './login';
import layoutComponentMap from '../../layout';

import { PlusOutlined } from '@ant-design/icons';

const Detail = () => {
  const [visible, setVisible] = useState(false);
  return (
    <>
      <a href="#" onClick={() => setVisible(true)}>
        详情
      </a>
    </>
  );
};

const componentMap: any = {
  ProSchemaTable,
  AntdButton: Button,
  AntDTable: Table,
  Title: (props) => {
    return (
      <span>
        <button
          onClick={() => props.store.updateData('asdffasdf', { name: '123ss' })}
        >
          button
        </button>{' '}
      </span>
    );
  },
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

  Status: (status: string) => {
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

  Options: (value: any, record: { id: any }, index: any) => {
    const OptionWrap = styled.div`
      a {
        margin-right: 10px;
      }
    `;
    return (
      <OptionWrap>
        <Detail />
        <a href={`/${record.id}`} target="_blank">
          通过
        </a>
        <a href={`/${record.id}`} target="_blank">
          不通过
        </a>
      </OptionWrap>
    );
  },

  ToolBar: (action: any) => {
    return [
      <Button
        key="button"
        icon={<PlusOutlined />}
        type="primary"
        onClick={() => {
          alert(123);
        }}
      >
        新建
      </Button>,
      <Button onClick={() => action.reload()}>刷新</Button>,
    ];
  },
};

export default {
  ...componentMap,
  ...loginComponentMap,
  ...layoutComponentMap,
};
