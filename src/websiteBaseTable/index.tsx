import { BaseTable, BaseTableProps } from 'ali-react-table';
import React from 'react';
import styled from 'styled-components';

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
  schema: any;
}

const WebsiteBaseTable = React.forwardRef<BaseTable, SchemaTableProps>(
  (props, ref) => {
    const { dataSource, columns } = props;

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
