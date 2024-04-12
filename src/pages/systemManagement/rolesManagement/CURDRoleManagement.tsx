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
import { useEffect } from "react";
import { ObjectsAPI } from "../../../api/systemManagement/objects.api";
import { TYPE_MANAGEMENT } from "../../../interface/constants/type/Type.const";
import { useGlobalLoading } from "../../../components/global-loading/GlobalLoading";
import { useModalProvider } from "../../../components/notification-base/ModalNotificationTemplate";
import { RolesRequest } from "../../../interface/request/systemManagement/roles/RolesRequest.interface";
import TreeTemplate from "../../../components/tree-base/TreeTemplate";
import { TreeDataNode } from "antd";

function CRUDRolesManagement() {
  const navigate = useNavigate();
  const { mode, id } = useParams();
  const { openNotification } = useNotification();
  const { setLoading } = useGlobalLoading();
  const { openModal } = useModalProvider();

  const { control, getValues, watch, reset } = useForm<RolesRequest>({
    defaultValues: {
      id: "",
      isActive: 1,
      roleName: "",
      roleCode: ""
    },
  });

  const back = () => {
    navigate(ROUTER_BASE.roleManagement.path);
  };

  const onCreate = () => {
    setLoading(true);
    // ObjectsAPI.addObject(getValues())
    //   .then((response) => {
    //     if (
    //       response.status &&
    //       response.status === TYPE_MANAGEMENT.STATUS_SUCCESS
    //     ) {
    //       openNotification(
    //         "success",
    //         t("common.notification.success"),
    //         t("rolesManagement.createSuccess")
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
  };

  const onUpdate = () => {
    setLoading(true);
    // ObjectsAPI.updateObject(getValues())
    //   .then((response) => {
    //     if (
    //       response.status &&
    //       response.status === TYPE_MANAGEMENT.STATUS_SUCCESS
    //     ) {
    //       openNotification(
    //         "success",
    //         t("common.notification.success"),
    //         t("rolesManagement.updateSuccess")
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
  };

  useEffect(() => {
    setLoading(true);
    if (mode !== TYPE_MANAGEMENT.MODE_CREATE && id && id !== "0") {
      ObjectsAPI.getObjectDetail(id)
        .then((res) => {
          reset(res.data.data);
        })
        .catch((error) => {
          if (
            error.response &&
            error.response.status === TYPE_MANAGEMENT.STATUS_ERROR_400
          ) {
            if (
              error.response.data &&
              error.response.data.status === TYPE_MANAGEMENT.STATUS_ERROR_404
            ) {
              openModal(
                "error",
                t("common.notification.error"),
                t("rolesManagement.error.notFound"),
                () => {
                  back();
                }
              );
            }
          }
        })
        .finally(() => {
          setLoading(false);
        });
    }
    setLoading(false);
  }, []);
  
  const treeData: TreeDataNode[] = [
    {
      title: '0-0',
      key: '0-0',
      children: [
        {
          title: '0-0-0',
          key: '0-0-0',
          children: [
            { title: '0-0-0-0', key: '0-0-0-0' },
            { title: '0-0-0-1', key: '0-0-0-1' },
            { title: '0-0-0-2', key: '0-0-0-2' },
          ],
        },
        {
          title: '0-0-1',
          key: '0-0-1',
          children: [
            { title: '0-0-1-0', key: '0-0-1-0' },
            { title: '0-0-1-1', key: '0-0-1-1' },
            { title: '0-0-1-2', key: '0-0-1-2' },
          ],
        },
        {
          title: '0-0-2',
          key: '0-0-2',
        },
      ],
    },
    {
      title: '0-1',
      key: '0-1',
      children: [
        { title: '0-1-0-0', key: '0-1-0-0' },
        { title: '0-1-0-1', key: '0-1-0-1' },
        { title: '0-1-0-2', key: '0-1-0-2' },
      ],
    },
    {
      title: '0-2',
      key: '0-2',
    },
  ];

  return (
    <>
      <CardLayoutTemplate
        className="mb-10 mt-8 shadow-md"
        title={
          mode === TYPE_MANAGEMENT.MODE_CREATE
            ? t("rolesManagement.titleCreate")
            : mode === TYPE_MANAGEMENT.MODE_UPDATE
            ? t("rolesManagement.titleUpdate")
            : t("rolesManagement.titleDetail")
        }
      >
        {/* form crud */}
        <FormTemplate contentSize={"70"} labelSize={"30"}>
          {/* content form crud */}
          <FormChildTemplate
            title={t("rolesManagement.fieldName.code")}
            required={true}
          >
            <InputTextTemplate mode={mode} name="roleCode" control={control} />
          </FormChildTemplate>

          <FormChildTemplate
            title={t("rolesManagement.fieldName.name")}
            required={true}
          >
            <InputTextTemplate
              mode={mode}
              name="roleName"
              control={control}
            />
          </FormChildTemplate>

          <FormChildTemplate
            title={"Tree"}
            required={true}
          >
            <TreeTemplate data={treeData} />
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
                <ButtonBase className="mx-2 btn btn__delete">
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

export default CRUDRolesManagement;
