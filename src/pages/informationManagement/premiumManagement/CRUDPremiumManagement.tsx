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
import { memo, useEffect } from "react";
import { TYPE_MANAGEMENT } from "../../../interface/constants/type/Type.const";
import { CodeMngApi } from "../../../api/common/codeMng.api";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import {
  GetCodeMng,
  SetCodeMng,
} from "../../../app/reducers/common/CodeMng/CodeMng.reducer";
import ListRadioboxTemplate from "../../../components/input-base/ListRadioboxTemplate";
import {
  GetMenuParent,
} from "../../../app/reducers/systemManagement/Objects/MenuParent.reducer";
import { useGlobalLoading } from "../../../components/global-loading/GlobalLoading";
import { useModalProvider } from "../../../components/notification-base/ModalNotificationTemplate";
import { PremiumRequest } from "../../../interface/request/informationManagement/PremiumRequest.inteface";
import { PremiumAPI } from "../../../api/informationManagement/premium.api";

function CRUDPremiumManagement() {
  const navigate = useNavigate();
  const { mode, id } = useParams();
  const { openNotification } = useNotification();
  const codeMngData = useAppSelector(GetCodeMng);
  const menuParentData = useAppSelector(GetMenuParent);
  const dispatch = useAppDispatch();
  const { setLoading } = useGlobalLoading();
  const { openModal } = useModalProvider();

  const { control, getValues, watch, reset } = useForm<PremiumRequest>({
    defaultValues: {
      id: "",
      name: "1",
      code: "",
      money: 0,
      note: "",
      level: 1,
      roleId: "",
      status: 1,
    },
  });

  const isStatus = [
    { value: "1", label: t("objectsManagement.status.active") },
    { value: "0", label: t("objectsManagement.status.unActive") },
  ];

  const back = () => {
    navigate(ROUTER_BASE.objectManagement.path);
  };

  const onCreate = () => {
    openModal(
      "confirm",
      t("common.confirm.title"),
      t("objectsManagement.confirmCreate"),
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
                t("objectsManagement.createSuccess")
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
      t("objectsManagement.confirmUpdate"),
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
                t("objectsManagement.updateSuccess")
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
      t("objectsManagement.confirmDelete"),
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
        //         t("objectsManagement.deleteSuccess")
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
    CodeMngApi.getCodeMng("OBJECT_TYPE").then((res) => {
      dispatch(SetCodeMng(res.data.data));
    });
    if (mode !== TYPE_MANAGEMENT.MODE_CREATE && id && id !== "0") {
      // PremiumAPI.getMenuSelect(id).then((res) => {
      //   dispatch(
      //     SetMenuParent(
      //       res.data.data.map((el: any) => {
      //         return {
      //           value: el.id,
      //           label: `${el.code} - ${t(el.name)}`,
      //         };
      //       })
      //     )
      //   );
      // });

      // PremiumAPI.getObjectDetail(id)
      //   .then((res) => {
      //     reset(res.data.data);
      //   })
      //   .catch((error) => {
      //     if (
      //       error.response &&
      //       error.response.status === TYPE_MANAGEMENT.STATUS_ERROR_400
      //     ) {
      //       if (
      //         error.response.data &&
      //         error.response.data.status === TYPE_MANAGEMENT.STATUS_ERROR_404
      //       ) {
      //         openModal(
      //           "error",
      //           t("common.notification.error"),
      //           t("objectsManagement.error.notFound"),
      //           () => {
      //             back();
      //           }
      //         );
      //       }
      //     }
      //   })
      //   .finally(() => {
      //     setLoading(false);
      //   });
    } else {
      // PremiumAPI.getMenuCreateSelect().then((res) => {
      //   dispatch(
      //     SetMenuParent(
      //       res.data.data.map((el: any) => {
      //         return {
      //           value: el.id,
      //           label: `${el.code} - ${t(el.name)}`,
      //         };
      //       })
      //     )
      //   );
      // });
    }
    setLoading(false);
  }, []);

  const filterOption = (
    input: string,
    option?: { label: string; value: string }
  ) => {
    return (option?.label ?? "").toLowerCase().includes(input.toLowerCase());
  };

  return (
    <>
      <CardLayoutTemplate
        className="mb-10 mt-8 shadow-md"
        title={
          mode === TYPE_MANAGEMENT.MODE_CREATE
            ? t("objectsManagement.titleCreate")
            : mode === TYPE_MANAGEMENT.MODE_UPDATE
            ? t("objectsManagement.titleUpdate")
            : t("objectsManagement.titleDetail")
        }
      >
        {/* form crud */}
        <FormTemplate contentSize={"70"} labelSize={"30"}>
          {/* content form crud */}
          <FormChildTemplate
            title={t("objectsManagement.fieldName.code")}
            required={true}
          >
            <InputTextTemplate mode={mode} name="code" control={control} />
          </FormChildTemplate>

          <FormChildTemplate
            title={t("objectsManagement.fieldName.name")}
            required={true}
          >
            <InputTextTemplate mode={mode} name="name" control={control} />
          </FormChildTemplate>

          <FormChildTemplate
            title={t("objectsManagement.fieldName.type")}
            required={true}
          >
            <ListRadioboxTemplate
              name="type"
              mode={mode}
              control={control}
              options={codeMngData}
              isCheck={false}
            />
          </FormChildTemplate>

          <FormChildTemplate
            title={t("objectsManagement.fieldName.url")}
            required={true}
          >
            <InputTextTemplate mode={mode} name="url" control={control} />
          </FormChildTemplate>

          <FormChildTemplate
            title={t("objectsManagement.fieldName.isStart")}
            required={true}
          >
            <ListRadioboxTemplate
              name="isStart"
              mode={mode}
              control={control}
              options={isStatus}
              isCheck={false}
            />
          </FormChildTemplate>

          <FormChildTemplate
            title={t("objectsManagement.fieldName.key")}
            required={true}
          >
            <InputTextTemplate mode={mode} name="key" control={control} />
          </FormChildTemplate>

          <FormFooterTemplate>
            {mode === TYPE_MANAGEMENT.MODE_CREATE ? (
              <ButtonBase
                className="mx-2 btn btn__create"
                onClick={() => onCreate()}
              >
                {t("common.button.create")}
              </ButtonBase>
            ) : mode === TYPE_MANAGEMENT.MODE_DETAIL ? (
              <ButtonBase
                onClick={() =>
                  navigate(
                    `${ROUTER_BASE.objectManagement.path}/${TYPE_MANAGEMENT.MODE_UPDATE}/${id}`
                  )
                }
                className="mx-2 btn btn__goToUpdate"
              >
                {t("common.button.goToUpdate")}
              </ButtonBase>
            ) : (
              <>
                {" "}
                <ButtonBase
                  className="mx-2 btn btn__update"
                  onClick={() => onUpdate()}
                >
                  {t("common.button.update")}
                </ButtonBase>
                <ButtonBase
                  className="mx-2 btn btn__delete"
                  onClick={() => onDelete()}
                >
                  {t("common.button.delete")}
                </ButtonBase>
              </>
            )}
            <ButtonBase className="mx-2 btn btn__back" onClick={() => back()}>
              {t("common.button.back")}
            </ButtonBase>
          </FormFooterTemplate>
        </FormTemplate>
      </CardLayoutTemplate>
    </>
  );
}

export default memo(CRUDPremiumManagement);
