import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { memo, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { TYPE_MANAGEMENT } from "../../../interface/constants/type/Type.const";
import { t } from "i18next";
import CardLayoutTemplate from "../../../components/layout-base/CardLayoutTemplate";
import FormSearchTemplate from "../../../components/form-base/form-search-base/FormSearchTemplate";
import { Space, TablePaginationConfig, Tooltip } from "antd";
import FormSearchChildTemplate from "../../../components/form-base/form-search-base/FormSearchChildTemplate";
import InputTextTemplate from "../../../components/input-base/InputTextTemplate";
import TableTemplate from "../../../components/table-base/TableTemplate";
import ButtonBase from "../../../components/button-base/ButtonBase";
import { ROUTER_BASE } from "../../../router/router.constant";
import { IObjects } from "../../../interface/response/systemManagement/objects/Objects.interface";
import TagTemplate from "../../../components/tag-base/TagTemplate";
import { ObjectsGroupAPI } from "../../../api/systemManagement/objectsGroup.api";
import { GetObjectsGroup, SetObjectsGroup } from "../../../app/reducers/systemManagement/ObjectsGroup/ObjectGroup.reducer";
import { CodeMngApi } from "../../../api/common/codeMng.api";
import { ICodeMng } from "../../../interface/response/common/codeMng/CodeMng.interface";
import SelectBoxTemplate from "../../../components/input-base/SelectBoxTemplate";
import ListRadioboxTemplate from "../../../components/input-base/ListRadioboxTemplate";
import FontAwesomeBase from "../../../components/font-awesome/FontAwesomeBase";

function ObjectGroupIndex() {
  const navigate = useNavigate();
  const data = useAppSelector(GetObjectsGroup);
  const [loading, setLoadingTable] = useState<boolean>(true);
  const dispatch = useAppDispatch();
  const [role, setRoles] = useState<any>();
  const [module, setModule] = useState<any>();
  const [status, setStatus] = useState<ICodeMng[]>();

  const { control, getValues, setValue } = useForm({
    defaultValues: {
      name: "",
      code: "",
      subName: "",
      urlNote: "",
      status: "",
      roleName: "",
      moduleName: "",
      current: TYPE_MANAGEMENT.DEFAULT_CURRENT,
      size: TYPE_MANAGEMENT.DEFAULT_SIZE,
      total: TYPE_MANAGEMENT.DEFAULT_TOTAL,
      sortField: null,
      sortType: "",
    },
  });

  const handlePageChange = (
    pagination: TablePaginationConfig,
    sorter: any,
    extra: any
  ) => {
    setValue("sortType", extra.order ? extra.order.slice(0, -3) : "");
    setValue("sortField", extra.field);
    fetchData();
  };

  const fetchData = () => {
    setLoadingTable(true);
    ObjectsGroupAPI.getObjects(getValues()).then((result: any) => {
      if (result.data.data && result.data.data.data) {
        dispatch(SetObjectsGroup(result.data.data.data));
        setValue("current", result.data.data.currentPage);
        setValue("total", result.data.data.totalPages);
      }
    }).finally(() => {
      setLoadingTable(false);
    });
  };

  useEffect(() => {
    setLoadingTable(true);
    CodeMngApi.getCodeMng("ACTIVE_TYPE").then((res) => {
      setStatus(res.data.data as ICodeMng[]);
    });
    ObjectsGroupAPI.getModuleAll().then((res) => {
      setModule(res.data.data.map((el:any) => {
        return {
          value: el.id,
          label: el.name
        }
      }));
    });
    ObjectsGroupAPI.getRoleAll().then((res) => {
      setRoles(res.data.data.map((el:any) => {
        return {
          value: el.id,
          label: el.name
        }
      }));
    });
    ObjectsGroupAPI.getObjects(getValues()).then((result: any) => {
      if (result.data.data && result.data.data.data) {
        console.log(result.data.data.data);
        
        dispatch(SetObjectsGroup(result.data.data.data));
        setValue("current", result.data.data.currentPage);
        setValue("total", result.data.data.totalPages);
      }
    }).finally(() => {
      setLoadingTable(false);
    });
    setLoadingTable(false);
  }, []);

  const handlePageSizeChange = (value: number) => {
    setValue("size", value);
    setLoadingTable(true);
    ObjectsGroupAPI.getObjects({size: getValues("size")}).then((result: any) => {
      if (result.data.data && result.data.data.data) {
        dispatch(SetObjectsGroup(result.data.data.data));
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
      title: t("objectGroupManagement.table.name"),
      dataIndex: "name",
      key: "name",
      sorter: true,
      showSorterTooltip: false,
      sortDirections: ["descend", "ascend"],
    },
    {
      title: t("objectGroupManagement.table.code"),
      dataIndex: "code",
      key: "code",
      sorter: true,
      showSorterTooltip: false,
    },
    {
      title: t("objectGroupManagement.table.subName"),
      dataIndex: "subName",
      key: "subName",
      sorter: true,
      showSorterTooltip: false,
    },
    {
      title: t("objectGroupManagement.table.urlNote"),
      dataIndex: "urlNote",
      key: "urlNote",
      sorter: true,
      showSorterTooltip: false,
    },
    {
      title: t("objectGroupManagement.table.status"),
      dataIndex: "status",
      key: "status",
      sorter: true,
      showSorterTooltip: false,
      render: (data: string) => { return (<>
          {data === 'ACTIVE_TYPE_1' ? <TagTemplate color="cyan">
            {t("objectsManagement.status.active")}
        </TagTemplate> : <TagTemplate color="red">
            {t("objectsManagement.status.unActive")}
        </TagTemplate> }
      </>)
      },
    },
    {
      title: t("objectGroupManagement.table.roleName"),
      dataIndex: "roleName",
      key: "roleName",
      sorter: true,
      showSorterTooltip: false,
    },
    {
      title: t("objectGroupManagement.table.moduleName"),
      dataIndex: "moduleName",
      key: "moduleName",
      sorter: true,
      showSorterTooltip: false,
    },
    {
      title: t("common.action"),
      key: 'action',
      render: (record: IObjects) => (
        <Space size="middle">              
          <Tooltip title={t("common.button.detail")}>
            <ButtonBase
                onClick={() =>
                  navigate(
                    `${ROUTER_BASE.objectGroup.path}/${TYPE_MANAGEMENT.MODE_DETAIL}/${record.id}`
                  )
                }
                className="mx-2 btn btn__table btn__detail"
              >
                <FontAwesomeBase iconName={"circle-info"} />
            </ButtonBase>
          </Tooltip>
        </Space>
      ),
    },
  ];

  return (
    <>
      <CardLayoutTemplate 
        title={() => (
          <>
            <FontAwesomeBase className="mr-2" iconName={"filter"} /> {t("titleSearch")}
          </>
        )}
        className="mb-10 mt-8 shadow-md">
        <FormSearchTemplate
          footer={
            <>
              <ButtonBase className="mx-2 btn__header_form btn__clearFrom"><FontAwesomeBase className="mr-1" iconName={"filter-circle-xmark"} /> {t('common.formSearch.clear')}</ButtonBase>
              <ButtonBase className="mx-2 btn__header_form btn__search" onClick={() => fetchData()}><FontAwesomeBase className="mr-1" iconName={"magnifying-glass"} />{t('common.formSearch.search')}</ButtonBase>
            </>
          }
        >
          <FormSearchChildTemplate label={t("objectGroupManagement.table.name")}>
            <InputTextTemplate
              control={control}
              name="name"
            ></InputTextTemplate>
          </FormSearchChildTemplate>

          <FormSearchChildTemplate label={t("objectGroupManagement.table.code")}>
            <InputTextTemplate
              control={control}
              name="code"
            ></InputTextTemplate>
          </FormSearchChildTemplate>
          
          <FormSearchChildTemplate label={t("objectGroupManagement.table.subName")}>
            <InputTextTemplate
              control={control}
              name="subName"
            ></InputTextTemplate>
          </FormSearchChildTemplate>
          
          <FormSearchChildTemplate label={t("objectGroupManagement.table.roleName")}>
            <SelectBoxTemplate
              className="w-full"
              name="roleId"
              control={control}
              options={role}
            />
          </FormSearchChildTemplate>
          
          <FormSearchChildTemplate label={t("objectGroupManagement.table.moduleName")}>
            
            <SelectBoxTemplate
              isCheck={true}
              className="w-full"
              name="moduleId"
              control={control}
              options={module}
            />
          </FormSearchChildTemplate>
          
          <FormSearchChildTemplate label={t("objectGroupManagement.table.status")}>
            <ListRadioboxTemplate
              name="status"
              control={control}
              options={status}
              isCheck={true}
            />
          </FormSearchChildTemplate>
        </FormSearchTemplate>
      </CardLayoutTemplate>
      
      <TableTemplate
        title={() => (
          <>
            <FontAwesomeBase className="mr-2" iconName={"list"} /> {t("titleTable")}
          </>
        )}
        active={
          <>
            <ButtonBase
              onClick={() =>
                navigate(
                  `${ROUTER_BASE.objectGroup.path}/${TYPE_MANAGEMENT.MODE_CREATE}/0`
                )
              }
              className="mx-2 btn btn__header__table btn__create"
            >
              <FontAwesomeBase className="mr-1" iconName={"plus"} /> {t("common.button.create")}
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

export default memo(ObjectGroupIndex);
