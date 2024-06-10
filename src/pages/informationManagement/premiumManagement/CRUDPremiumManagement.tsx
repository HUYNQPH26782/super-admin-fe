import FormChildTemplate from "../../../components/form-base/form-basic-base/FormChildTemplate";
import FormFooterTemplate from "../../../components/form-base/form-basic-base/FormFooterTemplate";
import FormTemplate from "../../../components/form-base/form-basic-base/FormTemplate";
import InputTextTemplate from "../../../components/input-base/InputTextTemplate";
import CardLayoutTemplate from "../../../components/layout-base/CardLayoutTemplate";
import { useForm } from "react-hook-form";
import ButtonBase from "../../../components/button-base/ButtonBase";
import { useNavigate, useParams } from "react-router-dom";
import { ROUTER_BASE } from "../../../router/router.constant";
import { t } from "i18next";
import { useNotification } from "../../../components/notification-base/NotificationTemplate";
import { memo, useEffect, useState } from "react";
import { TYPE_MANAGEMENT } from "../../../interface/constants/type/Type.const";
import { CodeMngApi } from "../../../api/common/codeMng.api";
import ListRadioboxTemplate from "../../../components/input-base/ListRadioboxTemplate";
import { useGlobalLoading } from "../../../components/global-loading/GlobalLoading";
import { useModalProvider } from "../../../components/notification-base/ModalNotificationTemplate";
import { PremiumRequest } from "../../../interface/request/informationManagement/PremiumRequest.inteface";
import { PremiumAPI } from "../../../api/informationManagement/premium.api";
import FontAwesomeBase from "../../../components/font-awesome/FontAwesomeBase";
import { ICodeMng } from "../../../interface/response/common/codeMng/CodeMng.interface";
import SelectBoxTemplate from "../../../components/input-base/SelectBoxTemplate";
import TagTemplate from "../../../components/tag-base/TagTemplate";
import ModalObjectGroup from "./popup/ModalObjectGroup";
import { IObjectGroup } from "../../../interface/response/informationManagement/premium/Premium.interface";

function CRUDPremiumManagement() {
  const navigate = useNavigate();
  const { mode, id } = useParams();
  const { openNotification } = useNotification();
  const [activeList, setActiveList] = useState();
  const [premiumList, setPremiumList] = useState();
  const [defaultList, setDefaultList] = useState();
  const [roleList, setRoleList] = useState();
  const [showModal, setShowModal] = useState(false);

  const { setLoading } = useGlobalLoading();
  const { openModal } = useModalProvider();

  const { control, getValues, watch, reset } = useForm<PremiumRequest>({
    defaultValues: {
      id: "",
      name: "",
      code: "",
      money: null,
      note: "",
      level: null,
      roleId: "",
      status: "ACTIVE_TYPE_1",
      type: "PREMIUM_TYPE_1",
      isDefault: "DEFAULT_TYPE_1",
      objectGroup: []
  },
  });

  const back = () => {
    navigate(ROUTER_BASE.serviceManagement.path);
  };

  const onCreate = () => {
    openModal(
      "confirm",
      t("common.confirm.title"),
      t("premiumManagement.confirmCreate"),
      () => {
        setLoading(true);
        PremiumAPI.addObject(getValues())
          .then((response) => {
            if (
              response.status &&
              response.status === TYPE_MANAGEMENT.STATUS_SUCCESS
            ) {
              openNotification(
                "success",
                t("common.notification.success"),
                t("premiumManagement.createSuccess")
              );
              back();
            }
          })
          .catch((error) => {
            if (
              error.response &&
              error.response.status === TYPE_MANAGEMENT.STATUS_ERROR_400
            ) {
              if (
                error.response.data &&
                error.response.data.status === TYPE_MANAGEMENT.STATUS_ERROR_400
              ) {
                openNotification(
                  "error",
                  t("common.notification.error"),
                  error.response.data
                );
              }
            }
          })
          .finally(() => {
            setLoading(false);
          });
      }
    );
  };

  const onUpdate = () => {
    openModal(
      "confirm",
      t("common.confirm.title"),
      t("premiumManagement.confirmUpdate"),
      () => {
        setLoading(true);
        PremiumAPI.updateObject(getValues())
          .then((response) => {
            if (
              response.status &&
              response.status === TYPE_MANAGEMENT.STATUS_SUCCESS
            ) {
              openNotification(
                "success",
                t("common.notification.success"),
                t("premiumManagement.updateSuccess")
              );
              back();
            }
          })
          .catch((error) => {
            if (
              error.response &&
              error.response.status === TYPE_MANAGEMENT.STATUS_ERROR_400
            ) {
              if (
                error.response.data &&
                error.response.data.status === TYPE_MANAGEMENT.STATUS_ERROR_400
              ) {
                openNotification(
                  "error",
                  t("common.notification.error"),
                  error.response.data
                );
              }
            }
          })
          .finally(() => {
            setLoading(false);
          });
      }
    );
  };

  const onDelete = () => {
    openModal(
      "confirm",
      t("common.confirm.title"),
      t("premiumManagement.confirmDelete"),
      () => {
        setLoading(true);
        // PremiumAPI.getObjectDelete(getValues("id"))
        //   .then((response) => {
        //     if (
        //       response.status &&
        //       response.status === TYPE_MANAGEMENT.STATUS_SUCCESS
        //     ) {
        //       openNotification(
        //         "success",
        //         t("common.notification.success"),
        //         t("premiumManagement.deleteSuccess")
        //       );
        //       back();
        //     }
        //   })
        //   .catch((error) => {
        //     if (
        //       error.response &&
        //       error.response.status === TYPE_MANAGEMENT.STATUS_ERROR_400
        //     ) {
        //       if (
        //         error.response.data &&
        //         error.response.data.status === TYPE_MANAGEMENT.STATUS_ERROR_400
        //       ) {
        //         openNotification(
        //           "error",
        //           t("common.notification.error"),
        //           error.response.data
        //         );
        //       }
        //     }
        //   })
        //   .finally(() => {
        //     setLoading(false);
        //   });
      }
    );
  };

  useEffect(() => {
    setLoading(true);
    CodeMngApi.getCodeMng("ACTIVE_TYPE,PREMIUM_TYPE,DEFAULT_TYPE").then((res) => {
      setActiveList(res.data.data.filter((el:ICodeMng) => el.type === "ACTIVE_TYPE"))
      setDefaultList(res.data.data.filter((el:ICodeMng) => el.type === "DEFAULT_TYPE"))
      setPremiumList(res.data.data.filter((el:ICodeMng) => el.type === "PREMIUM_TYPE"))
    });
    PremiumAPI.getAllRoles().then((res) => {
      setRoleList(res.data.data.map((el:any) => {
        return {
          value: el.id,
          label: el.name
        }
      }));
    })
    if (mode !== TYPE_MANAGEMENT.MODE_CREATE && id && id !== "0") {
      
    } 
    setLoading(false);
  }, []);

  const handleClose = (id:string|number|undefined|null) => {
    console.log('Tag closed! ', id);
    // Bạn có thể thêm các hành động khác ở đây
  };

  const onCloseModal = () => {
    setShowModal(false);
  }

  const onOpentModal = () => {
    if (!getValues("roleId")) {
      openNotification(
        "error",
        t("common.notification.error"),
        "Bạn phải chọn quyền truy cập trước"
      );
      return;
    }
    setShowModal(true);
  }

  const onOk = () => {
    console.log(getValues());
    onCloseModal();
  }

  return (
    <>
      {(showModal ) && <><ModalObjectGroup control={control} name="objectGroup" onOk={onOk} visible={showModal} getValues={getValues} onClose={onCloseModal}></ModalObjectGroup> </>}
      <CardLayoutTemplate
        className="mb-10 mt-8 shadow-md"
        title={
          mode === TYPE_MANAGEMENT.MODE_CREATE
            ? t("premiumManagement.titleCreate")
            : mode === TYPE_MANAGEMENT.MODE_UPDATE
            ? t("premiumManagement.titleUpdate")
            : t("premiumManagement.titleDetail")
        }
      >
        {/* form crud */}
        <FormTemplate contentSize={"70"} labelSize={"30"}>
          {/* content form crud */}
          
          <FormChildTemplate
            title={t("premiumManagement.fieldName.code")}
            required={true}
          >
            <InputTextTemplate mode={mode} name="code" control={control} />
          </FormChildTemplate>
          
          <FormChildTemplate
            title={t("premiumManagement.fieldName.name")}
            required={true}
          >
            <InputTextTemplate mode={mode} name="name" control={control} />
          </FormChildTemplate>

          <FormChildTemplate
            title={t("premiumManagement.fieldName.money")}
            required={true}
          >
            <InputTextTemplate
              mode={mode}
              name="money"
              control={control}
              type="number"
            />
          </FormChildTemplate>

          <FormChildTemplate
            title={t("premiumManagement.fieldName.type")}
            required={true}
          >
            <ListRadioboxTemplate
              name="type"
              mode={mode}
              control={control}
              options={premiumList}
              isCheck={false}
            />
          </FormChildTemplate>

          <FormChildTemplate
            title={t("premiumManagement.fieldName.isDefault")}
            required={true}
          >
            <ListRadioboxTemplate
              name="isDefault"
              mode={mode}
              control={control}
              options={defaultList}
              isCheck={false}
            />
          </FormChildTemplate>

          <FormChildTemplate
            title={t("premiumManagement.fieldName.urlNote")}
            required={true}
          >
            <InputTextTemplate mode={mode} name="urlNote" control={control} />
          </FormChildTemplate>

          <FormChildTemplate
            title={t("premiumManagement.fieldName.level")}
            required={true}
          >
            <InputTextTemplate
              mode={mode}
              name="level"
              control={control}
              type="number"
            />
          </FormChildTemplate>

          <FormChildTemplate
            title={t("premiumManagement.fieldName.role")}
            required={true}
          >
            <SelectBoxTemplate
              className="w-full"
              name="roleId"
              control={control}
              options={roleList}
            />
          </FormChildTemplate>

          <FormChildTemplate
            title={t("premiumManagement.fieldName.status")}
            required={true}
          >
            <ListRadioboxTemplate
              name="objectGroup"
              mode={mode}
              control={control}
              options={activeList}
              isCheck={false}
            />
          </FormChildTemplate>

          <FormChildTemplate
            title={t("premiumManagement.fieldName.objectGroup")}
            required={true}
          >
            <ButtonBase onClick={() => onOpentModal()} className="">
              {t("premiumManagement.btnSelect")}
            </ButtonBase>
            <br/>
            <div className="mt-2">
              {
                getValues("objectGroup") && getValues("objectGroup").map((el:IObjectGroup) => (<>
                  <TagTemplate key={el.id} closeIcon={<FontAwesomeBase className="ml-1 text-sm" iconName={"xmark"} />} onClose={() => handleClose(el.id)}>
                    {el.code} - {el.name}
                  </TagTemplate></>))
              }
            </div>
          </FormChildTemplate>

          <FormFooterTemplate>
            {mode === TYPE_MANAGEMENT.MODE_CREATE ? (
              <ButtonBase
                className="mx-2 btn btn__create"
                onClick={() => onCreate()}
              >
                <FontAwesomeBase className="mr-2" iconName={"plus"} />
                {t("common.button.create")}
              </ButtonBase>
            ) : mode === TYPE_MANAGEMENT.MODE_DETAIL ? (
              <ButtonBase
                onClick={() =>
                  navigate(
                    `${ROUTER_BASE.serviceManagement.path}/${TYPE_MANAGEMENT.MODE_UPDATE}/${id}`
                  )
                }
                className="mx-2 btn btn__goToUpdate"
              >
                <FontAwesomeBase className="mr-2" iconName={"file-pen"} />
                {t("common.button.goToUpdate")}
              </ButtonBase>
            ) : (
              <>
                {" "}
                <ButtonBase
                  className="mx-2 btn btn__update"
                  onClick={() => onUpdate()}
                >
                  <FontAwesomeBase
                    className="mr-2"
                    iconName={"pen-to-square"}
                  />
                  {t("common.button.update")}
                </ButtonBase>
                <ButtonBase
                  className="mx-2 btn btn__delete"
                  onClick={() => onDelete()}
                >
                  <FontAwesomeBase className="mr-2" iconName={"trash"} />
                  {t("common.button.delete")}
                </ButtonBase>
              </>
            )}
            <ButtonBase className="mx-2 btn btn__back" onClick={() => back()}>
              <FontAwesomeBase className="mr-2" iconName={"rotate-left"} />
              {t("common.button.back")}
            </ButtonBase>
          </FormFooterTemplate>
        </FormTemplate>
      </CardLayoutTemplate>
    </>
  );
}

export default memo(CRUDPremiumManagement);
