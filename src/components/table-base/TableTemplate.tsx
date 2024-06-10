import { Card, Pagination, Select, Table } from "antd";
import type { TablePaginationConfig, TableProps } from "antd";
import { t } from "i18next";
import { memo, useState } from "react";
import FontAwesomeBase from "../font-awesome/FontAwesomeBase";
const { Option } = Select;

interface PaginationProps {
  current: number;
  size: number;
  total: number;
}
interface TableTemplateProps extends TableProps {
  paginationProp: PaginationProps;
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
  handlePageSizeChange: (value: number) => void;
  handlePaginationChange: (page: number) => void;
}

function TableTemplate({
  loading,
  rowSelection,
  expandable,
  active,
  title,
  dataSource, columns, paginationProp, onChange, handlePageSizeChange, handlePaginationChange, ...restProps
}: TableTemplateProps) {
  const [pageSize, setPageSize] = useState<number>(paginationProp.size);
  const [current, setCurrent] = useState<number>(paginationProp.current);
   
  const sizeChange = (value: number) => {
    setPageSize(value);
    handlePageSizeChange(value);
    setCurrent(0);
  };

  const paginationChange = (page: number) => {
    setCurrent(page);
    handlePaginationChange(page);
  };

  return (
    <>
      <Card
        className="shadow-md"
        title={<h1 className="text-lg">{title && (typeof title === 'function' ? title() : title)}</h1>}
        extra={active}>
        <Table
          size="small"
          scroll={{ x: "auto" }}
          dataSource={dataSource}
          columns={columns}
          pagination={false}
          rowKey="rowNumber"
          onChange={onChange}
          loading={loading}
          {...restProps}
        />
        <div className="flex justify-center mt-5">
          <Pagination
            className="mr-3"
            total={paginationProp.total * pageSize}
            showTotal={(total, range) => `${range[0]}-${range[1]} of ${total} items`}
            pageSize={pageSize}
            current={current}
            onChange={paginationChange}
            showSizeChanger={false}
          />
          
          <Select value={pageSize} onChange={sizeChange}>
            <Option value={10}>10 {t('common.pagination.page')}</Option>
            <Option value={20}>20 {t('common.pagination.page')}</Option>
            <Option value={30}>30 {t('common.pagination.page')}</Option>
            <Option value={50}>50 {t('common.pagination.page')}</Option>
            <Option value={100}>100 {t('common.pagination.page')}</Option>
          </Select>
        </div>
      </Card>
    </>
  );
};

export default memo(TableTemplate);
