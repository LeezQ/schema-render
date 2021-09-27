import React, { useRef } from 'react';
import type { ActionType } from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import request from 'umi-request';
import { Button } from 'antd';

export default (props: any) => {
  const { url = '', ...rest } = props;

  const actionRef = useRef<ActionType>();
  return (
    <ProTable
      actionRef={actionRef}
      request={async (params = {}, sort, filter) => {
        console.log(sort, filter);
        return request(url, {
          params,
        });
      }}
      form={{
        // 由于配置了 transform，提交的参与与定义的不同这里需要转化一下
        syncToUrl: (values, type) => {
          if (type === 'get') {
            return {
              ...values,
              created_at: [values.startTime, values.endTime],
            };
          }
          return values;
        },
      }}
      options={false}
      {...rest}
    />
  );
};
