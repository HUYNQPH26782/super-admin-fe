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
import { Button, Tooltip } from "antd";
import FormSearchChildTemplate from "../../../components/form-base/form-search-base/FormSearchChildTemplate";
import InputTextTemplate from "../../../components/input-base/InputTextTemplate";
import { useForm } from "react-hook-form";
import SelectBoxTemplate from "../../../components/input-base/SelectBoxTemplate";

function ObjectsManagementIndex() {
  const navigate = useNavigate();
  const data = useAppSelector(GetObjects);
  const [loading, setLoading] = useState<boolean>(true);
  const dispatch = useAppDispatch();
  
  const { control, handleSubmit, getValues } = useForm({
    defaultValues: {
      code: "aaaaaaaaa",
      name: "bbbbbbbb",
      type: "ccccccccc"
    },
  })

  const [tableParams, setTableParams] = useState<ObjectsRequest>({
    code: "",
    name: "",
    pagination: {
      current: 1,
      pageSize: 10,
    },
  });
  useEffect(() => {
    ObjectsAPI.getObjects().then((result: any) => {
      dispatch(SetObjects(result.data.data.data));
      console.log(result.data.data.data);
      
      setLoading(false)
    });
  }, [dispatch]);
  
  const columns = [
    {
      title: t('common.rowNum'),
      dataIndex: 'stt',
      key: 'stt',
      align: 'center',
      showSorterTooltip: false
    },
    {
      title: t('objectsManagement.table.name'),
      dataIndex: 'name',
      key: 'name',
      sorter: true,
      showSorterTooltip: false,
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
          <><Button>Clear</Button><Button>Tìm kiếm</Button></>
        }>

          <FormSearchChildTemplate label={t('objectsManagement.table.name')}>
            <InputTextTemplate control={control} name="name"></InputTextTemplate>
          </FormSearchChildTemplate>

          <FormSearchChildTemplate label={t('objectsManagement.table.code')}>
            <InputTextTemplate control={control} name="code"></InputTextTemplate>
          </FormSearchChildTemplate>

          <FormSearchChildTemplate label={t('objectsManagement.table.type')}>
            <SelectBoxTemplate className='w-full' name="iceCreamType" control={control} options={options} />
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
        columns={columns}
        data={data}
        tableParams={tableParams}
        loading={loading}></TableTemplate>
    </>
  );
}

export default ObjectsManagementIndex;
