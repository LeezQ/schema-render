import { Table, Button, Badge, Modal, Drawer } from 'antd';
import dayjs from 'dayjs';
import styled from 'styled-components';

import { WebsiteBaseTable } from 'schema-components';
import React, { useState } from 'react';
import SchemaRender from '..';

import demoJSON from '../demo.json';

const Detail = () => {
  const [visible, setVisible] = useState(false);
  return (
    <>
      <a href="#" onClick={() => setVisible(true)}>
        抽屉
      </a>
      <Drawer title="Basic Drawer" placement="right" visible={visible}>
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
      </Drawer>
    </>
  );
};

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
    return (
      <>
        <a href={`/${record.id}`} target="_blank">
          详情
        </a>
        <Detail />
      </>
    );
  },
  Date: (
    value: any,
    record: { value: string | number | Date | dayjs.Dayjs | null | undefined },
    index: any,
  ) => {
    return <span>{dayjs(record.value).format('YYYY-MM-DD hh:mm')}</span>;
  },

  AddAppBtn: () => {
    const [visible, setVisible] = useState(false);
    return (
      <>
        <Button type="primary" onClick={() => setVisible(true)}>
          申请
        </Button>
        <Modal title="sdf" visible={visible}>
          多少度
          <SchemaRender componentMap={componentMap} schema={demoJSON} />
        </Modal>
      </>
    );
  },
};

export default componentMap;
