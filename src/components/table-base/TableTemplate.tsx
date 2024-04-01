import { Card, Pagination, Select, Table } from "antd";
import type { PaginationProps, TablePaginationConfig, TableProps } from "antd";
import { useEffect, useState } from "react";
const { Option } = Select;

interface TableTemplateProps extends TableProps {
  pagination: TablePaginationConfig;
  dataSource: Array<any>;
  columns: Array<any>;
  active: any;
  title: any;
  onChange: (
    pagination: TablePaginationConfig,
    filters: any,
    sorter: any,
    extra: any
  ) => void;
}

function TableTemplate({
  loading,
  rowSelection,
  expandable,
  active,
  title,
  dataSource, columns, pagination, onChange, ...restProps
}: TableTemplateProps) {
  const [pageSize, setPageSize] = useState<number>(20);

  const handlePageSizeChange = (value: number) => {
    setPageSize(value);
  };

  const handlePaginationChange = (page: number) => {
    onChange({ ...pagination, current: page }, null, null, null);
  };

  return (
    <>
      <Card
        title={<h1 className="text-lg">{title}</h1>}
        extra={active}>
        <Table
          size="small"
          scroll={{ x: "auto" }}
          dataSource={dataSource}
          columns={columns}
          pagination={false}
          onChange={onChange}
          {...restProps}
        />
        <Pagination
          total={85}
          showTotal={(total, range) => `${range[0]}-${range[1]} of ${total} items`}
          pageSize={pageSize}
          current={pagination.current}
          onChange={handlePaginationChange}
          showSizeChanger={false}
        />
        
        <Select value={pageSize} onChange={handlePageSizeChange}>
          <Option value={10}>10</Option>
          <Option value={20}>20</Option>
          <Option value={30}>30</Option>
          {/* Thêm các lựa chọn kích thước trang khác nếu cần */}
        </Select>
      </Card>
    </>
  );
};

export default TableTemplate;
