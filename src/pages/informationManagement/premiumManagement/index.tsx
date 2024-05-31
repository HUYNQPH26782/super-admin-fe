import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
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
import { PremiumAPI } from "../../../api/informationManagement/premium.api";
import TagTemplate from "../../../components/tag-base/TagTemplate";
import { GetPremium, SetPremium } from "../../../app/reducers/informationManagement/Premium/Preimium.reducer";

function PremiumManagementIndex() {
  const navigate = useNavigate();
  const data = useAppSelector(GetPremium);
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
    PremiumAPI.getAllPremium(getValues()).then((result: any) => {
      if (result.data.data && result.data.data.data) {
        dispatch(SetPremium(result.data.data.data));
        setValue("current", result.data.data.currentPage);
        setValue("total", result.data.data.totalPages);
      }
    }).finally(() => {
      setLoadingTable(false);
    });
  };

  useEffect(() => {
    setLoadingTable(true);
    PremiumAPI.getAllPremium({}).then((result: any) => {
      if (result.data.data && result.data.data.data) {
        dispatch(SetPremium(result.data.data.data));
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
    PremiumAPI.getAllPremium({size: getValues("size")}).then((result: any) => {
      if (result.data.data && result.data.data.data) {
        dispatch(SetPremium(result.data.data.data));
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
      title: t("premiumManagement.table.name"),
      dataIndex: "roleName",
      key: "roleName",
      sorter: true,
      showSorterTooltip: false,
      sortDirections: ["descend", "ascend"],
    },
    {
      title: t("premiumManagement.table.code"),
      dataIndex: "roleCode",
      key: "roleCode",
      sorter: true,
      showSorterTooltip: false,
      sortDirections: ["descend", "ascend"],
    },
    {
      title: t("premiumManagement.table.role"),
      dataIndex: "roleCode",
      key: "roleCode",
      sorter: true,
      showSorterTooltip: false,
      sortDirections: ["descend", "ascend"],
    },
    {
      title: t("premiumManagement.table.money"),
      dataIndex: "roleCode",
      key: "roleCode",
      sorter: true,
      showSorterTooltip: false,
      sortDirections: ["descend", "ascend"],
    },
    {
      title: t("premiumManagement.table.status"),
      dataIndex: "roleCode",
      key: "roleCode",
      sorter: true,
      showSorterTooltip: false,
      sortDirections: ["descend", "ascend"],
      render: (data: number) => { return (<>
          {data === 1 ? <TagTemplate color="cyan">
            {t("objectsManagement.status.active")}
        </TagTemplate> : <TagTemplate color="red">
            {t("objectsManagement.status.unActive")}
        </TagTemplate> }
      </>)}
    },
    {
      title: t("premiumManagement.table.note"),
      dataIndex: "roleCode",
      key: "roleCode",
      sorter: true,
      showSorterTooltip: false,
      sortDirections: ["descend", "ascend"],
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
          <FormSearchChildTemplate label={t("premiumManagement.table.name")}>
            <InputTextTemplate
              control={control}
              name="name"
            ></InputTextTemplate>
          </FormSearchChildTemplate>

          <FormSearchChildTemplate label={t("premiumManagement.table.code")}>
            <InputTextTemplate
              control={control}
              name="code"
            ></InputTextTemplate>
          </FormSearchChildTemplate>

          <FormSearchChildTemplate label={t("premiumManagement.table.role")}>
            <InputTextTemplate
              control={control}
              name="code"
            ></InputTextTemplate>
          </FormSearchChildTemplate>

          <FormSearchChildTemplate label={t("premiumManagement.table.money")}>
            <InputTextTemplate
              control={control}
              name="name"
            ></InputTextTemplate>
          </FormSearchChildTemplate>

          <FormSearchChildTemplate label={t("premiumManagement.table.status")}>
            <InputTextTemplate
              control={control}
              name="code"
            ></InputTextTemplate>
          </FormSearchChildTemplate>

          <FormSearchChildTemplate label={t("premiumManagement.table.note")}>
            <InputTextTemplate
              control={control}
              name="name"
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
                  `${ROUTER_BASE.serviceManagement.path}/${TYPE_MANAGEMENT.MODE_CREATE}/0`
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

export default memo(PremiumManagementIndex);
