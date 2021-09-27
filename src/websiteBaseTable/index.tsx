import { BaseTable, BaseTableProps } from 'ali-react-table';
import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';

import Date from './components/Date';
import axios from 'axios';

const DarkSupportBaseTable: any = styled(BaseTable)`
  ${(props: any) => props.css};
  &.dark {
    --bgcolor: #333;
    --header-bgcolor: #45494f;
    --hover-bgcolor: #46484a;
    --header-hover-bgcolor: #606164;
    --highlight-bgcolor: #191a1b;
    --header-highlight-bgcolor: #191a1b;
    --color: #dadde1;
    --header-color: #dadde1;
    --lock-shadow: rgb(37 37 37 / 0.5) 0 0 6px 2px;
    --border-color: #3c4045;
  }
`;

interface SchemaTableProps extends BaseTableProps {
  registComponents: [];
  url?: string;
}

const WebsiteBaseTable = React.forwardRef<BaseTable, SchemaTableProps>(
  (props, ref) => {
    const registComponents = props.registComponents || [];
    const [dataSource, setDataSource] = useState(props.dataSource || []);
    const [columns, setColumns] = useState(props.columns || []);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
      (async () => {
        if (props.url) {
          setLoading(true);
          const res = await axios(props.url);
          setDataSource(res.data.dataSource);
          setColumns(
            res.data.columns.map(
              (
                column: {
                  render: (value: any, record: any, rowIndex: any) => any;
                },
                index: any,
              ) => {
                const renderComponent = column.render;
                if (renderComponent) {
                  column.render = (value, record, rowIndex) => {
                    return registComponents[renderComponent].apply(null, [
                      value,
                      record,
                      rowIndex,
                    ]);
                  };
                }
                return column;
              },
            ),
          );
        }
      })();
    }, []);

    return (
      <DarkSupportBaseTable
        ref={ref}
        dataSource={dataSource}
        columns={columns}
      />
    );
  },
);

export default WebsiteBaseTable;
