import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { GetRoles, SetRoles } from "../../../app/reducers/systemManagement/Roles/Roles.reducer";
import { memo, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { TYPE_MANAGEMENT } from "../../../interface/constants/type/Type.const";
import { t } from "i18next";
import CardLayoutTemplate from "../../../components/layout-base/CardLayoutTemplate";
import FormSearchTemplate from "../../../components/form-base/form-search-base/FormSearchTemplate";
import { Button, Space, TablePaginationConfig, Tooltip } from "antd";
import FormSearchChildTemplate from "../../../components/form-base/form-search-base/FormSearchChildTemplate";
import InputTextTemplate from "../../../components/input-base/InputTextTemplate";
import TableTemplate from "../../../components/table-base/TableTemplate";
import ButtonBase from "../../../components/button-base/ButtonBase";
import { ROUTER_BASE } from "../../../router/router.constant";
import { IObjects } from "../../../interface/response/systemManagement/objects/Objects.interface";
import { RolesAPI } from "../../../api/systemManagement/roles.api";

function RolesManagementIndex() {
  const navigate = useNavigate();
  const data = useAppSelector(GetRoles);
  const [loading, setLoadingTable] = useState<boolean>(true);
  const dispatch = useAppDispatch();

  const { control, getValues, setValue } = useForm({
    defaultValues: {
      roleCode: "",
      roleName: "",
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
    RolesAPI.getRoles(getValues()).then((result: any) => {
      if (result.data.data && result.data.data.data) {
        dispatch(SetRoles(result.data.data.data));
        setValue("current", result.data.data.currentPage);
        setValue("total", result.data.data.totalPages);
      }
    }).finally(() => {
      setLoadingTable(false);
    });
  };

  useEffect(() => {
    setLoadingTable(true);
    RolesAPI.getRoles({}).then((result: any) => {
      if (result.data.data && result.data.data.data) {
        console.log(result.data.data.data);
        
        dispatch(SetRoles(result.data.data.data));
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
    RolesAPI.getRoles({size: getValues("size")}).then((result: any) => {
      if (result.data.data && result.data.data.data) {
        dispatch(SetRoles(result.data.data.data));
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
      title: t("rolesManagement.table.name"),
      dataIndex: "roleName",
      key: "roleName",
      sorter: true,
      showSorterTooltip: false,
      sortDirections: ["descend", "ascend"],
    },
    {
      title: t("rolesManagement.table.code"),
      dataIndex: "roleCode",
      key: "roleCode",
      sorter: true,
      showSorterTooltip: false,
    },
    {
      title: t("common.action"),
      key: 'action',
      render: (record: IObjects) => (
        <Space size="middle">
          <Tooltip title="aaaaaaa">
            
          <ButtonBase
              onClick={() =>
                navigate(
                  `${ROUTER_BASE.roleManagement.path}/${TYPE_MANAGEMENT.MODE_DETAIL}/${record.id}`
                )
              }
              className="mx-2 btn btn__create"
            >
              {t("common.button.detail")}
            </ButtonBase>
          </Tooltip>
        </Space>
      ),
    },
  ];

  return (
    <>
      <CardLayoutTemplate title={t("titleSearch")} 
        className="mb-10 mt-8 shadow-md">
        <FormSearchTemplate
          footer={
            <>
              <Button className="mx-2">{t('common.formSearch.clear')}</Button>
              <Button className="mx-2" onClick={() => fetchData()}>{t('common.formSearch.search')}</Button>
            </>
          }
        >
          <FormSearchChildTemplate label={t("rolesManagement.table.name")}>
            <InputTextTemplate
              control={control}
              name="name"
            ></InputTextTemplate>
          </FormSearchChildTemplate>

          <FormSearchChildTemplate label={t("rolesManagement.table.code")}>
            <InputTextTemplate
              control={control}
              name="code"
            ></InputTextTemplate>
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
                  `${ROUTER_BASE.roleManagement.path}/${TYPE_MANAGEMENT.MODE_CREATE}/0`
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

export default memo(RolesManagementIndex);
