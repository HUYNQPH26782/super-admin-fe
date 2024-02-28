import React, { useEffect, useState } from "react";
import "./App.css";
import LayoutTemplate from "./components/LayoutTemplate";
import TableTemplate, { type TableParams } from "./components/TableTemplate";
import type { TableProps } from "antd";
import qs from "qs";
import InputTextTemplate from "./components/InputTextTemplate";
import { useTranslation } from "react-i18next";

type ColumnsType<T> = TableProps<T>["columns"];

interface DataType {
  name: {
    first: string;
    last: string;
  };
  gender: string;
  email: string;
  login: {
    uuid: string;
  };
}

const columns: ColumnsType<DataType> = [
  {
    title: "Name",
    dataIndex: "name",
    sorter: true,
    render: (name) => `${name.first} ${name.last}`,
    width: "20%",
  },
  {
    title: "Gender",
    dataIndex: "gender",
    filters: [
      { text: "Male", value: "male" },
      { text: "Female", value: "female" },
    ],
    width: "20%",
  },
  {
    title: "Email",
    dataIndex: "email",
    sorter: true,
  },
];

const getRandomuserParams = (params: TableParams) => ({
  results: params.pagination?.pageSize,
  page: params.pagination?.current,
  ...params,
});
function App() {
  const { t } = useTranslation()
  const [data, setData] = useState<DataType[]>();
  const [loading, setLoading] = useState(false);

  const [tableParams, setTableParams] = useState<TableParams>({
    pagination: {
      current: 1,
      pageSize: 10,
    },
  });

  const fetchData = () => {
    setLoading(true);
    fetch(
      `https://randomuser.me/api?${qs.stringify(
        getRandomuserParams(tableParams)
      )}`
    )
      .then((res) => res.json())
      .then(({ results }) => {
        setData(results);
        setLoading(false);
        setTableParams({
          ...tableParams,
          pagination: {
            ...tableParams.pagination,
            total: 200,
            // 200 is mock data, you should read it from server
            // total: data.totalCount,
          },
        });
      });
  };

  useEffect(() => {
    fetchData();
  }, [JSON.stringify(tableParams)]);

  const handleTableChange: TableProps["onChange"] = (
    pagination,
    filters,
    sorter
  ) => {
    setTableParams({
      pagination,
      filters,
      ...sorter,
    });

    if (pagination.pageSize !== tableParams.pagination?.pageSize) {
      setData([]);
    }
  };

  return (
    <div className="App">
      <LayoutTemplate title={t('about')}>
        <div>
          <InputTextTemplate value={t('about')}></InputTextTemplate>
          <TableTemplate
            title={t('about')}
            columns={columns}
            data={data}
            tableParams={tableParams}
            loading={loading}
            handleTableChange={handleTableChange}></TableTemplate>
        </div>
      </LayoutTemplate>
    </div>
  );
}

export default App;
