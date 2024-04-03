import FormChildTemplate from "../../../components/form-base/form-basic-base/FormChildTemplate";
import FormFooterTemplate from "../../../components/form-base/form-basic-base/FormFooterTemplate";
import FormTemplate from "../../../components/form-base/form-basic-base/FormTemplate";
import InputTextTemplate from "../../../components/input-base/InputTextTemplate";
import CardLayoutTemplate from "../../../components/layout-base/CardLayoutTemplate";
import { useForm } from "react-hook-form";
import ButtonBase from "../../../components/button-base/ButtonBase";
import { useNavigate } from "react-router-dom";
import { ROUTER_BASE } from "../../../router/router.constant";
import { t } from "i18next";
import { useNotification } from "../../../components/notification-base/NotificationTemplate";
import { useEffect, useState } from "react";
import ModalTemplate from "../../../components/modal-base/ModalTemplate";
import { ObjectsRequest } from "../../../interface/request/systemManagement/objects/ObjectsRequest.interface";
import { ObjectsAPI } from "../../../api/systemManagement/objects.api";
import { TYPE_MANAGEMENT } from "../../../interface/constants/type/Type.const";
import { CodeMngApi } from "../../../api/common/codeMng.api";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { GetCodeMng } from "../../../app/reducers/common/CodeMng/CodeMng.reducer";

function CRUDObjectManagement() {
  const navigate = useNavigate();
  const { openNotification } = useNotification();
  const codeMngData = useAppSelector(GetCodeMng);
  const dispatch = useAppDispatch();
  const { control, getValues } = useForm<ObjectsRequest>({
    defaultValues: {
      isActive: 1,
      name: "",
      code: "",
      orderBy: null,
      icons: "",
      url: "",
      isStart: null,
      type: "",
      key: "",
      parentId: null,
    }
  });

  const back = () => {
    navigate(ROUTER_BASE.objectManagement.path);
  };

  const onCreate = () => {
    
    console.log(getValues());
    ObjectsAPI.addObject(getValues()).then((response) => {
      if (response.status && response.status === TYPE_MANAGEMENT.STATUS_SUCCESS) {
        openNotification(
          "error",
          "Notification Title",
          "This is the content of the notification."
        );
      }
      
    })
  };

  useEffect(() => {
    CodeMngApi.getCodeMng("OBJECT_TYPE").then((res) => {
      console.log(res.data);
    })
  }, [])

  // Modal
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <CardLayoutTemplate title={t('objectsManagement.titleCreate')}>
        {/* form crud */}
        <FormTemplate contentSize={"70"} labelSize={"30"}>
          {/* content form crud */}
          <FormChildTemplate title={t('objectsManagement.fieldName.code')} required={true}>
            <InputTextTemplate name="code" control={control} />
          </FormChildTemplate>
          
          <FormChildTemplate title={t('objectsManagement.fieldName.name')} required={true}>
            <InputTextTemplate name="name" control={control} />
          </FormChildTemplate>
          
          <FormChildTemplate title={t('objectsManagement.fieldName.type')} required={true}>
            <InputTextTemplate name="type" control={control} />
          </FormChildTemplate>
          
          <FormChildTemplate title={t('objectsManagement.fieldName.orderBy')} required={true}>
            <InputTextTemplate name="orderBy" control={control} />
          </FormChildTemplate>
          
          <FormChildTemplate title={t('objectsManagement.fieldName.icons')} required={true}>
            <InputTextTemplate name="icons" control={control} />
          </FormChildTemplate>
          
          <FormChildTemplate title={t('objectsManagement.fieldName.url')} required={true}>
            <InputTextTemplate name="url" control={control} />
          </FormChildTemplate>
          
          <FormChildTemplate title={t('objectsManagement.fieldName.isStart')} required={true}>
            <InputTextTemplate name="isStart" control={control} />
          </FormChildTemplate>

          <FormChildTemplate title={t('objectsManagement.fieldName.key')} required={true}>
            <InputTextTemplate
              name="key"
              control={control}
            />
          </FormChildTemplate>
{/* 
          <FormChildTemplate title={"Ice cream type"} required={true}>
            <SelectBoxTemplate
              name="iceCreamType"
              control={control}
              options={options}
            />
          </FormChildTemplate>

          <FormChildTemplate title={"Do you like"} required={true}>
            <ListCheckboxTemplate
              name="youLike"
              control={control}
              options={optionsCheck}
              isCheckAll={true}
            />
          </FormChildTemplate>

          <FormChildTemplate title={"Do you like"} required={true}>
            <ListRadioboxTemplate
              name="gender"
              control={control}
              options={optionRadio}
              isCheck={true}
            />
          </FormChildTemplate> */}

          {/* footer form crud */}
          <FormFooterTemplate>
            <ButtonBase className="mx-2 btn btn__back" onClick={() => back()}>
              {t("common.button.back")}
            </ButtonBase>
            <ButtonBase
              className="mx-2 btn btn__create"
              onClick={() => onCreate()}
            >
              {t("common.button.create")}
            </ButtonBase>
            <ButtonBase
              className="mx-2 btn btn__update"
              onClick={() => showModal()}
            >
              {t("common.button.update")}
            </ButtonBase>
            <ButtonBase className="mx-2 btn btn__goToUpdate">
              {t("common.button.goToUpdate")}
            </ButtonBase>
            <ButtonBase className="mx-2 btn btn__delete">
              {t("common.button.delete")}
            </ButtonBase>
          </FormFooterTemplate>
        </FormTemplate>
        <ModalTemplate
          title="Basic Modal"
          visible={isModalOpen}
          onClose={handleCancel}
          onOk={handleOk}
        >
          <p>Some contents...</p>
          <p>Some contents...</p>
          <p>Some contents...</p>
        </ModalTemplate>
      </CardLayoutTemplate>
    </>
  );
}

export default CRUDObjectManagement;
