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
import { useGlobalLoading } from "../../../components/global-loading/GlobalLoading";
import { useModalProvider } from "../../../components/notification-base/ModalNotificationTemplate";
import TreeTemplate from "../../../components/tree-base/TreeTemplate";
import { TreeDataNode } from "antd";
import { ObjectsGroupRequest } from "../../../interface/request/systemManagement/object-group/ObjectGroupRequest.interface";
import { ObjectsGroupAPI } from "../../../api/systemManagement/objectsGroup.api";
import SelectBoxTemplate from "../../../components/input-base/SelectBoxTemplate";
import ListRadioboxTemplate from "../../../components/input-base/ListRadioboxTemplate";
import { CodeMngApi } from "../../../api/common/codeMng.api";
import { ICodeMng } from "../../../interface/response/common/codeMng/CodeMng.interface";

function CRUDObjectGroup() {
  const navigate = useNavigate();
  const { mode, id } = useParams();
  const { openNotification } = useNotification();
  const { setLoading } = useGlobalLoading();
  const { openModal } = useModalProvider();
  const [treeData, setTreeData] = useState<TreeDataNode[]>([]);
  const [dataObjectForm, setDataObjectForm] = useState<string[]>([]);
  const [role, setRoles] = useState<any>();
  const [module, setModule] = useState<any>();
  const [status, setStatus] = useState<ICodeMng[]>();

  const { control, getValues, watch, reset, setValue } = useForm<ObjectsGroupRequest>({
    defaultValues: {
      id: "",
      code: "",
      name: "",
      subName: "",
      urlNote: "",
      orderBy: 0,
      status: "ACTIVE_TYPE_1",
      roleId: "",
      moduleId: "",
      object: [],
    },
  });

  const object = watch("object");

  useEffect(() => {
    if (object) {
      var treeDataGetForm = new Set<string>();
      object.forEach((el) => {
        treeDataGetForm.add(el);
        const parentTree = searchParentTreeData(el, treeData);
        if (parentTree != undefined) {
          treeDataGetForm.add(parentTree.key as string);
        }
      });
      setDataObjectForm(Array.from(treeDataGetForm));
    }
  }, [object]);

  const searchParentTreeData = (
    id: string,
    treeData: TreeDataNode[]
  ): TreeDataNode | undefined => {
    for (const tree of treeData) {
      if (tree.children) {
        const childNode = tree.children.find((child) => child.key === id);
        if (childNode) {
          return tree;
        } else {
          const found = searchParentTreeData(id, tree.children);
          if (found) {
            return found;
          }
        }
      }
    }
    return undefined;
  };

  const back = () => {
    navigate(ROUTER_BASE.objectGroup.path);
  };

  const onCreate = () => {
    openModal(
      "confirm",
      t("common.confirm.title"),
      t("objectGroupManagement.confirmCreate"),
      () => {
        setLoading(true);
        setValue("object", dataObjectForm);
        ObjectsGroupAPI.addObject(getValues())
          .then((response) => {
            if (
              response.status &&
              response.status === TYPE_MANAGEMENT.STATUS_SUCCESS
            ) {
              openNotification(
                "success",
                t("common.notification.success"),
                t("objectGroupManagement.createSuccess")
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
      t("objectGroupManagement.confirmUpdate"),
      () => {
        setLoading(true);
        setValue("object", dataObjectForm);
        
        ObjectsGroupAPI.updateObject(getValues())
          .then((response) => {
            if (
              response.status &&
              response.status === TYPE_MANAGEMENT.STATUS_SUCCESS
            ) {
              openNotification(
                "success",
                t("common.notification.success"),
                t("objectGroupManagement.updateSuccess")
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
      t("objectGroupManagement.confirmDelete"),
      () => {
        setLoading(true);
        ObjectsGroupAPI.deleteObject(getValues("id"))
          .then((response) => {
            if (
              response.status &&
              response.status === TYPE_MANAGEMENT.STATUS_SUCCESS
            ) {
              openNotification(
                "success",
                t("common.notification.success"),
                t("objectGroupManagement.deleteSuccess")
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

  useEffect(() => {
    setLoading(true);
    CodeMngApi.getCodeMng("ACTIVE_TYPE").then((res) => {
      setStatus(res.data.data as ICodeMng[]);
    });
    ObjectsGroupAPI.getObjectAll().then((res) => {
      setTreeData(convertData(res.data.data));
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
    if (mode !== TYPE_MANAGEMENT.MODE_CREATE && id && id !== "0") {
      ObjectsGroupAPI.detailObject(id)
        .then((res) => {
          if (res.data.data && res.data.data.objectElementGroupDetails) {
            res.data.data.object = filteredNodes(res.data.data.objectElementGroupDetails).map((el: { idObject: number }) => el.idObject.toString());
            reset(res.data.data);
        }
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
                t("objectGroupManagement.error.notFound"),
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

  const filteredNodes = (data: Array<{idParent: number, idObject: number }>) => {
    return data.filter(obj => {
      const hasParent = data.some(el => el.idParent === obj.idObject);
      return !hasParent;
  });
  };

  const convertData = (data: Array<any>) => {
    return data.map((item) => {
      const newItem: TreeDataNode = {
        title: `${item.code} - ${item.name} - ${t(item.type)}`,
        key: `${item.id}`,
      };
      
      if (item.childId && item.childId.length > 0) {
        newItem.children = convertData(item.childId);
      }
      return newItem;
    });
  };

  return (
    <>
      <CardLayoutTemplate
        className="mb-10 mt-8 shadow-md"
        title={
          mode === TYPE_MANAGEMENT.MODE_CREATE
            ? t("objectGroupManagement.titleCreate")
            : mode === TYPE_MANAGEMENT.MODE_UPDATE
            ? t("objectGroupManagement.titleUpdate")
            : t("objectGroupManagement.titleDetail")
        }
      >
        {/* form crud */}
        <FormTemplate contentSize={"70"} labelSize={"30"}>
          {/* content form crud */}
          <FormChildTemplate
            title={t("objectGroupManagement.fieldName.code")}
            required={true}
          >
            <InputTextTemplate mode={mode} name="code" control={control} />
          </FormChildTemplate>

          <FormChildTemplate
            title={t("objectGroupManagement.fieldName.name")}
            required={true}
          >
            <InputTextTemplate mode={mode} name="name" control={control} />
          </FormChildTemplate>
          
          <FormChildTemplate
            title={t("objectGroupManagement.fieldName.subName")}
            required={true}
          >
            <InputTextTemplate mode={mode} name="subName" control={control} />
          </FormChildTemplate>

          <FormChildTemplate
            title={t("objectGroupManagement.fieldName.urlNote")}
            required={true}
          >
            <InputTextTemplate mode={mode} name="urlNote" control={control} />
          </FormChildTemplate>
          
          <FormChildTemplate
            title={t("objectGroupManagement.fieldName.status")}
            required={true}
          >
            <ListRadioboxTemplate
              name="status"
              mode={mode}
              control={control}
              options={status}
              isCheck={false}
            />
          </FormChildTemplate>

          <FormChildTemplate
            title={t("objectGroupManagement.fieldName.roleName")}
            required={true}
          >
            <SelectBoxTemplate
              className="w-full"
              name="roleId"
              control={control}
              options={role}
            />
          </FormChildTemplate>
          
          <FormChildTemplate
            title={t("objectGroupManagement.fieldName.moduleName")}
            required={true}
          >
            <SelectBoxTemplate
              className="w-full"
              name="moduleId"
              control={control}
              options={module}
            />
          </FormChildTemplate>

          <FormChildTemplate
            title={t("objectGroupManagement.fieldName.objects")}
            required={true}
          >
            <TreeTemplate data={treeData} disabled={mode === TYPE_MANAGEMENT.MODE_DETAIL} name="object" control={control} />
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
                    `${ROUTER_BASE.objectGroup.path}/${TYPE_MANAGEMENT.MODE_UPDATE}/${id}`
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

export default memo(CRUDObjectGroup);
