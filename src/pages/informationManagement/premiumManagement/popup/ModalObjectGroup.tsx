import React, { memo, useEffect, useState } from 'react';
import ModalTemplate from '../../../../components/modal-base/ModalTemplate';
import { useFieldArray } from 'react-hook-form';
import { PremiumAPI } from '../../../../api/informationManagement/premium.api';
import TableTemplate from '../../../../components/table-base/TableTemplate';
import { t } from 'i18next';
import { TYPE_MANAGEMENT } from '../../../../interface/constants/type/Type.const';
import { Checkbox, Space, TablePaginationConfig, Tooltip } from 'antd';
import TagTemplate from '../../../../components/tag-base/TagTemplate';
import { IObjectGroup } from '../../../../interface/response/informationManagement/premium/Premium.interface';
import CardLayoutTemplate from '../../../../components/layout-base/CardLayoutTemplate';
import FormSearchTemplate from '../../../../components/form-base/form-search-base/FormSearchTemplate';
import FontAwesomeBase from '../../../../components/font-awesome/FontAwesomeBase';
import FormSearchChildTemplate from '../../../../components/form-base/form-search-base/FormSearchChildTemplate';
import InputTextTemplate from '../../../../components/input-base/InputTextTemplate';
import ButtonBase from '../../../../components/button-base/ButtonBase';

const ModalObjectGroup: React.FC<any> = ({ visible, onClose, onOk, control, name, getValues }) => {
    const { fields, append, remove } = useFieldArray({
        control,
        name: name,
    });
      
  const [data, setData] = useState([]);
  const [loading, setLoadingTable] = useState<boolean>(true);

    const [formSearch, SetFormSearch] = useState({
        code: "",
        name: "",
        subName: "",
        roleId: getValues("roleId"),
        current: TYPE_MANAGEMENT.DEFAULT_CURRENT,
        size: TYPE_MANAGEMENT.DEFAULT_SIZE,
        total: TYPE_MANAGEMENT.DEFAULT_TOTAL,
        sortField: null,
        sortType: "",
      },
    )

  useEffect(() => {
    setLoadingTable(true);
    
    PremiumAPI.getAllObjectGroup({roleId: getValues("roleId")}).then((result: any) => {
      if (result.data.data && result.data.data.data) {
        setData(result.data.data.data);
        formSearch.current = result.data.data.currentPage;
        formSearch.total = result.data.data.totalPages;
      }
    }).finally(() => {
      setLoadingTable(false);
    });
  }, [])
  
  const fetchData = () => {
    setLoadingTable(true);
    formSearch.code = getValues("codeSearch");
    formSearch.name = getValues("nameSearch");
    formSearch.subName = getValues("subNameSearch");
    formSearch.roleId = getValues("roleId");

    SetFormSearch(formSearch);

    PremiumAPI.getAllObjectGroup(formSearch).then((result: any) => {
      if (result.data.data && result.data.data.data) {
        setData(result.data.data.data);
        formSearch.current = result.data.data.currentPage;
        formSearch.total = result.data.data.totalPages;
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
    formSearch.sortType = extra.order ? extra.order.slice(0, -3) : "";
    formSearch.sortField = extra.field;
    fetchData();
  };

  const handlePageSizeChange = (value: number) => {
    formSearch.size = value;
    setLoadingTable(true);
    PremiumAPI.getAllObjectGroup({size: formSearch.size}).then((result: any) => {
      if (result.data.data && result.data.data.data) {
        setData(result.data.data.data);
        formSearch.current = result.data.data.currentPage;
        formSearch.total = result.data.data.totalPages;
      }
    }).finally(() => {
      setLoadingTable(false);
    });
  };

  const handlePaginationChange = (page: number) => {
    formSearch.current = page - 1;
    fetchData();
  };

  const onChangeData = (item:IObjectGroup) => {
    const currentValues = getValues(name);
    const index = currentValues.findIndex((el: IObjectGroup) => el.id === item.id);
    if (index !== -1) {
        remove(index);
    } else {
        append(item);
    }
  }

  const dataChecked = (item: IObjectGroup) => {
    const currentValues = getValues(name);
    const index = currentValues.findIndex((el: IObjectGroup) => el.id === item.id);
    if (index !== -1) {
        return true;
    }
    return false;
  }

  const columns = [
    {
      title: t("common.rowNum"),
      dataIndex: "rowNumber",
      key: "rowNumber",
      align: "center",
      showSorterTooltip: false,
      render: (text: any, record: any, index: number) =>
        formSearch.current * formSearch.size + index + 1,
    },
    {
      title: t("premiumManagement.modalObjectGroup.table.name"),
      dataIndex: "name",
      key: "name",
      sorter: true,
      showSorterTooltip: false,
      sortDirections: ["descend", "ascend"],
    },
    {
      title: t("premiumManagement.modalObjectGroup.table.code"),
      dataIndex: "code",
      key: "code",
      sorter: true,
      showSorterTooltip: false,
      sortDirections: ["descend", "ascend"],
    },
    {
      title: t("premiumManagement.modalObjectGroup.table.subName"),
      dataIndex: "subName",
      key: "subName",
      sorter: true,
      showSorterTooltip: false,
      sortDirections: ["descend", "ascend"],
    },
    {
      title: t("premiumManagement.modalObjectGroup.table.status"),
      dataIndex: "status",
      key: "status",
      sorter: true,
      showSorterTooltip: false,
      sortDirections: ["descend", "ascend"],
      render: (data: string) => { return (<>
          {data === "ACTIVE_TYPE_1" ? <TagTemplate color="cyan">
            {t("base.common.code.status.active")}
        </TagTemplate> : <TagTemplate color="red">
            {t("base.common.code.status.unActive")}
        </TagTemplate> }
      </>)}
    },
    {
      title: t("common.action"),
      key: 'action',
      render: (record: IObjectGroup) => {
        const checked = dataChecked(record);
        return (
            <Space size="middle">
              <Tooltip key={record.id} title={checked ? t("premiumManagement.modalObjectGroup.noSelect") : t("premiumManagement.modalObjectGroup.select")}>
                <Checkbox key={record.id} onChange={() => onChangeData(record)} checked={checked}></Checkbox>
              </Tooltip>
            </Space>
          )
      },
    },
  ];


  return (
    <ModalTemplate width={1000} visible={visible} onClose={onClose} onOk={onOk} title={t("premiumManagement.modalObjectGroup.title")} footerCheck={true}>
      
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
          <FormSearchChildTemplate label={t("premiumManagement.modalObjectGroup.fieldSearch.name")}>
            <InputTextTemplate
              control={control}
              name="nameSearch"
            ></InputTextTemplate>
          </FormSearchChildTemplate>

          <FormSearchChildTemplate label={t("premiumManagement.modalObjectGroup.fieldSearch.code")}>
            <InputTextTemplate
              control={control}
              name="codeSearch"
            ></InputTextTemplate>
          </FormSearchChildTemplate>

          <FormSearchChildTemplate label={t("premiumManagement.modalObjectGroup.fieldSearch.subName")}>
            <InputTextTemplate
              control={control}
              name="subNameSearch"
            ></InputTextTemplate>
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
          </>
        }
        onChange={handlePageChange}
        handlePageSizeChange={handlePageSizeChange}
        handlePaginationChange={handlePaginationChange}
        columns={columns}
        dataSource={data}
        loading={loading}
        paginationProp={{
          current: formSearch.current,
          size: formSearch.size,
          total: formSearch.total,
        }}
      ></TableTemplate>
      
    </ModalTemplate>
  );
};

export default memo(ModalObjectGroup);
