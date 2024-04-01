import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import TableTemplate from "../../../components/table-base/TableTemplate";
import { t } from "i18next";
import ButtonBase from "../../../components/button-base/ButtonBase";
import { useNavigate } from "react-router-dom";
import { ROUTER_BASE } from "../../../router/router.constant";
import { TYPE_MANAGEMENT } from "../../../interface/constants/type/Type.const";
import { ObjectsAPI } from "../../../api/systemManagement/objects.api";
import { GetObjects, SetObjects } from "../../../app/reducers/systemManagement/Objects/Objects.reducer";
import { ObjectsRequest } from "../../../interface/request/systemManagement/objects/ObjectsRequest.interface";
import CardLayoutTemplate from "../../../components/layout-base/CardLayoutTemplate";
import FormSearchTemplate from "../../../components/form-base/form-search-base/FormSearchTemplate";
import { Button, TablePaginationConfig, TableProps, Tooltip } from "antd";
import FormSearchChildTemplate from "../../../components/form-base/form-search-base/FormSearchChildTemplate";
import InputTextTemplate from "../../../components/input-base/InputTextTemplate";
import { useForm } from "react-hook-form";
import SelectBoxTemplate from "../../../components/input-base/SelectBoxTemplate";

function ObjectsManagementIndex() {
  const navigate = useNavigate();
  const data = useAppSelector(GetObjects);
  const [loading, setLoading] = useState<boolean>(true);
  const dispatch = useAppDispatch();
  
  const { control, handleSubmit, getValues, reset, setValue } = useForm({
    defaultValues: {
      code: "",
      name: "",
      type: "",
      pagination: { 
        current: TYPE_MANAGEMENT.DEFAULT_CURRENT,
        size: TYPE_MANAGEMENT.DEFAULT_SIZE,
        total: TYPE_MANAGEMENT.DEFAULT_TOTAL,
      },
      sortField: null,
      sortType: ""
    },
  })

  const handlePageSizeChange = (value: number) => {
    setValue("pagination.size", value);

    console.log(getValues());
    fetchData();
    
    // Add logic to handle page size change
  };

  const handlePaginationChange = (page: number) => {
    console.log(page);
    
    setValue("pagination.current", page - 1);
    console.log(getValues());

    fetchData();
    // Add logic to handle page change
  };
  const fetchData = () => {
    setLoading(true)
    ObjectsAPI.getObjects(getValues()).then((result: any) => {
      dispatch(SetObjects(result.data.data.data));
      setValue("pagination.current", result.data.data.currentPage);
      setValue("pagination.total", result.data.data.totalPages);
    console.log(result.data.data.data);
    setLoading(false)
    });
    
  }

  const handlePageChange = (
    pagination: TablePaginationConfig,
    sorter: any,
    extra: any
  ) => {
    console.log(extra);
    setValue("sortType", extra.order ? extra.order.slice(0, -3) : '');
    setValue("sortField", extra.field);
    console.log(getValues());
    fetchData()
  };

  useEffect(() => {
    setLoading(true)
    ObjectsAPI.getObjects({}).then((result: any) => {
      dispatch(SetObjects(result.data.data.data));
      setValue("pagination.current", result.data.data.currentPage);
      setValue("pagination.total", result.data.data.totalPages);
      
      setLoading(false)
    });
  }, []);
  
  const columns = [
    {
      title: t('common.rowNum'),
      dataIndex: 'rowNumber',
      key: 'rowNumber',
      align: 'center',
      showSorterTooltip: false,
      render: (text: any, record: any, index: number) => getValues('pagination.current') * getValues('pagination.size') + index + 1,
    },
    {
      title: t('objectsManagement.table.name'),
      dataIndex: 'name',
      key: 'name',
      sorter: true,
      showSorterTooltip: false,
      sortDirections: ['descend', 'ascend'],
    },
    {
      title: t('objectsManagement.table.code'),
      dataIndex: 'code',
      key: 'code',
      sorter: true,
      showSorterTooltip: false
    },
    {
      title: t('objectsManagement.table.type'),
      dataIndex: 'type',
      key: 'type',
      sorter: true,
      showSorterTooltip: false,
      render: (data:string) => `${t(data)}`,
    },
  ];

  const options = [
    { value: 'jack', label: 'Jack' },
    { value: 'lucy', label: 'Lucy' },
    { value: 'Yiminghe', label: 'yiminghe' },
    { value: 'disabled', label: 'Disabled', disabled: true },
  ]

  return (
    <>
      <CardLayoutTemplate title={t('titleSearch')} className="mb-5">
        <FormSearchTemplate footer={
          <><Button>Clear</Button><Button onClick={() => fetchData()}>Tìm kiếm</Button></>
        }>

          <FormSearchChildTemplate label={t('objectsManagement.table.name')}>
            <InputTextTemplate control={control} name="name"></InputTextTemplate>
          </FormSearchChildTemplate>

          <FormSearchChildTemplate label={t('objectsManagement.table.code')}>
            <InputTextTemplate control={control} name="code"></InputTextTemplate>
          </FormSearchChildTemplate>

          <FormSearchChildTemplate label={t('objectsManagement.table.type')}>
            <SelectBoxTemplate className='w-full' name="type" control={control} options={options} />
          </FormSearchChildTemplate>

        </FormSearchTemplate>
      </CardLayoutTemplate>
      <TableTemplate
        title={t('titleTable')}
        active={
          <>
            <ButtonBase onClick={() => navigate(`${ROUTER_BASE.objectManagement.path}/${TYPE_MANAGEMENT.MODE_CREATE}/0`)} className='mx-2 btn btn__create'>{t('common.button.create')}</ButtonBase>
          </>
        }
        onChange={handlePageChange}
        handlePageSizeChange={handlePageSizeChange}
        handlePaginationChange={handlePaginationChange}
        columns={columns}
        dataSource={data}
        paginationProp={getValues().pagination}
        loading={loading}></TableTemplate>
    </>
  );
}

export default ObjectsManagementIndex;
