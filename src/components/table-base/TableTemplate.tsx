import React from "react";
import { Card, Table } from "antd";
import type { GetProp, TableProps } from "antd";

type TablePaginationConfig = Exclude<
  GetProp<TableProps, "pagination">,
  boolean
>;

export interface TableParams {
  pagination?: TablePaginationConfig;
  sortField?: string;
  sortOrder?: string;
  filters?: Parameters<GetProp<TableProps, "onChange">>[1];
}

const TableTemplate: React.FC<any> = ({
  columns,
  data,
  tableParams,
  loading,
  handleTableChange,
  rowSelection,
  expandable,
  active,
  title,
  ...restProps
}) => {
  return (
    <>
      <Card
        title={title}
        extra={active}>
        <Table
          size="small"
          rowSelection={rowSelection}
          expandable={expandable}
          scroll={{ x: "auto" }}
          columns={columns}
          rowKey={(record) => record.login.uuid}
          dataSource={data}
          pagination={tableParams.pagination}
          loading={loading}
          onChange={handleTableChange}
          {...restProps}
        />
      </Card>
    </>
  );
};

export default TableTemplate;
