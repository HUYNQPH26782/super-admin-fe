import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import TableTemplate from "../../../components/table-base/TableTemplate";
import { t } from "i18next";
import ButtonBase from "../../../components/button-base/ButtonBase";
import { useNavigate } from "react-router-dom";
import { ROUTER_BASE } from "../../../router/router.constant";
import { TYPE_MANAGEMENT } from "../../../interface/constants/type/Type.const";
import { ObjectsAPI } from "../../../api/systemManagement/objects.api";
import {
  GetObjects,
  SetObjects,
} from "../../../app/reducers/systemManagement/Objects/Objects.reducer";
import CardLayoutTemplate from "../../../components/layout-base/CardLayoutTemplate";
import FormSearchTemplate from "../../../components/form-base/form-search-base/FormSearchTemplate";
import { Space, TablePaginationConfig } from "antd";
import FormSearchChildTemplate from "../../../components/form-base/form-search-base/FormSearchChildTemplate";
import InputTextTemplate from "../../../components/input-base/InputTextTemplate";
import { useForm } from "react-hook-form";
import SelectBoxTemplate from "../../../components/input-base/SelectBoxTemplate";
import { GetCodeMng, SetCodeMng } from "../../../app/reducers/common/CodeMng/CodeMng.reducer";
import { CodeMngApi } from "../../../api/common/codeMng.api";
import { IObjects } from "../../../interface/response/systemManagement/objects/Objects.interface";
import { useNotification } from "../../../components/notification-base/NotificationTemplate";
import TagTemplate from "../../../components/tag-base/TagTemplate";

function ObjectsManagementIndex() {
  const navigate = useNavigate();
  const data = useAppSelector(GetObjects);
  const codeMngData = useAppSelector(GetCodeMng);
  const [loading, setLoadingTable] = useState<boolean>(true);
  const dispatch = useAppDispatch();

  const { openNotification } = useNotification();

  const { control, getValues, setValue } = useForm({
    defaultValues: {
      code: "",
      name: "",
      type: "",
      current: TYPE_MANAGEMENT.DEFAULT_CURRENT,
      size: TYPE_MANAGEMENT.DEFAULT_SIZE,
      total: TYPE_MANAGEMENT.DEFAULT_TOTAL,
      sortField: null,
      sortType: "",
    },
  });

  const handlePageSizeChange = (value: number) => {
    setValue("size", value);
    setLoadingTable(true);
    ObjectsAPI.getObjects({size: getValues("size")}).then((result: any) => {
      if (result.data.data && result.data.data.data) {
        dispatch(SetObjects(result.data.data.data));
        setValue("current", result.data.data.currentPage);
        setValue("total", result.data.data.totalPages);
      }
    }).finally(() => {
      setLoadingTable(false);
    });
  };

  const handlePaginationChange = (page: number) => {
    setValue("current", page - 1);
    fetchData();
  };

  const fetchData = () => {
    setLoadingTable(true);
    ObjectsAPI.getObjects(getValues()).then((result: any) => {
      if (result.data.data && result.data.data.data) {
        dispatch(SetObjects(result.data.data.data));
        setValue("current", result.data.data.currentPage);
        setValue("total", result.data.data.totalPages);
      }
    }).finally(() => {
      setLoadingTable(false);
    });
  };

  const handlePageChange = (
    pagination: TablePaginationConfig,
    sorter: any,
    extra: any
  ) => {
    console.log(extra);
    setValue("sortType", extra.order ? extra.order.slice(0, -3) : "");
    setValue("sortField", extra.field);
    fetchData();
  };

  useEffect(() => {
    setLoadingTable(true);
    ObjectsAPI.getObjects({}).then((result: any) => {
      if (result.data.data && result.data.data.data) {
        console.log(result.data.data.data);
        
        dispatch(SetObjects(result.data.data.data));
        setValue("current", result.data.data.currentPage);
        setValue("total", result.data.data.totalPages);
      }
    }).finally(() => {
      setLoadingTable(false);
    });
    
    CodeMngApi.getCodeMng("OBJECT_TYPE").then((res) => {
      if (res.data.data) {
        res.data.data.unshift({ value: "", label: t('common.select.selectDefault') });
      }
      dispatch(SetCodeMng(res.data.data))
    })
    setLoadingTable(false);
  }, []);

  const columns = [
    {
      title: t("common.rowNum"),
      dataIndex: "rowNumber",
      key: "rowNumber",
      align: "center",
      showSorterTooltip: false,
      render: (text: any, record: any, index: number) =>
        getValues("current") * getValues("size") + index + 1,
    },
    {
      title: t("objectsManagement.table.name"),
      dataIndex: "name",
      key: "name",
      sorter: true,
      showSorterTooltip: false,
      sortDirections: ["descend", "ascend"],
    },
    {
      title: t("objectsManagement.table.code"),
      dataIndex: "code",
      key: "code",
      sorter: true,
      showSorterTooltip: false,
    },
    {
      title: t("objectsManagement.table.type"),
      dataIndex: "type",
      key: "type",
      sorter: true,
      showSorterTooltip: false,
      render: (data: string) => `${t(data)}`,
    },
    {
      title: t("objectsManagement.table.isStart"),
      dataIndex: "isStart",
      key: "isStart",
      sorter: true,
      showSorterTooltip: false,
      render: (data: number) => { return (<>
          {data === 1 ? <TagTemplate color="cyan">
            {t("objectsManagement.status.active")}
        </TagTemplate> : <TagTemplate color="red">
            {t("objectsManagement.status.unActive")}
        </TagTemplate> }
      </>)
      },
    },
    {
      title: t("common.action"),
      key: 'action',
      render: (record: IObjects) => (
        <Space size="middle">
          <ButtonBase
              onClick={() =>
                navigate(
                  `${ROUTER_BASE.objectManagement.path}/${TYPE_MANAGEMENT.MODE_DETAIL}/${record.id}`
                )
              }
              className="mx-2 btn btn__create"
            >
              {t("common.button.detail")}
            </ButtonBase>
        </Space>
      ),
    },
  ];

  return (
    <>
      <CardLayoutTemplate title={t("titleSearch")} className="mb-10 mt-8 shadow-md">
        <FormSearchTemplate
          footer={
            <>
              <ButtonBase className="mx-2 btnSearch__clear">{t('common.formSearch.clear')}</ButtonBase>
              <ButtonBase className="mx-2 btnSearch__search" onClick={() => fetchData()}>{t('common.formSearch.search')}</ButtonBase>
            </>
          }
        >
          <FormSearchChildTemplate label={t("objectsManagement.table.name")}>
            <InputTextTemplate
              control={control}
              name="name"
            ></InputTextTemplate>
          </FormSearchChildTemplate>

          <FormSearchChildTemplate label={t("objectsManagement.table.code")}>
            <InputTextTemplate
              control={control}
              name="code"
            ></InputTextTemplate>
          </FormSearchChildTemplate>

          <FormSearchChildTemplate label={t("objectsManagement.table.type")}>
            <SelectBoxTemplate
              className="w-full"
              name="type"
              control={control}
              options={codeMngData}
            />
          </FormSearchChildTemplate>
        </FormSearchTemplate>
      </CardLayoutTemplate>
      <TableTemplate
        title={t("titleTable")}
        active={
          <>
            <ButtonBase
              onClick={() =>
                navigate(
                  `${ROUTER_BASE.objectManagement.path}/${TYPE_MANAGEMENT.MODE_CREATE}/0`
                )
              }
              className="mx-2 btn btn__create"
            >
              {t("common.button.create")}
            </ButtonBase>
          </>
        }
        onChange={handlePageChange}
        handlePageSizeChange={handlePageSizeChange}
        handlePaginationChange={handlePaginationChange}
        columns={columns}
        dataSource={data}
        loading={loading}
        paginationProp={{
          current: getValues("current"),
          size: getValues("size"),
          total: getValues("total"),
        }}
      ></TableTemplate>
    </>
  );
}

export default ObjectsManagementIndex;
