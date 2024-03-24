import FormChildTemplate from "../../../components/form-base/FormChildTemplate";
import FormFooterTemplate from "../../../components/form-base/FormFooterTemplate";
import FormTemplate from "../../../components/form-base/FormTemplate";
import InputTextTemplate from "../../../components/input-base/InputTextTemplate";
import CardLayoutTemplate from "../../../components/layout-base/CardLayoutTemplate";
import { useForm, SubmitHandler } from "react-hook-form";
import ButtonBase from "../../../components/button-base/ButtonBase";
import { useNavigate } from "react-router-dom";
import { ROUTER_BASE } from "../../../router/router.constant";
import { t } from "i18next";
import { useNotification } from "../../../components/notification-base/NotificationTemplate";
import { useState } from "react";
import ModalTemplate from "../../../components/modal-base/ModalTemplate";

enum GenderEnum {
  female = "female",
  male = "male",
  other = "other",
}

interface IFormInput {
  firstName: string;
  gender: GenderEnum;
}

function CRUDRolesManagement() {
  const navigate = useNavigate();
  const { openNotification } = useNotification();

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<IFormInput>({
    defaultValues: {
      firstName: "Huynq test",
    },
  });
  const onSubmit: SubmitHandler<IFormInput> = (data) => console.log(errors);

  const back = () => {
    navigate(ROUTER_BASE.roleManagement.path);
  };

  const onCreate = () => {
    openNotification(
      "error",
      "Notification Title",
      "This is the content of the notification."
    );
  };

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
      <CardLayoutTemplate title="[Thêm mới phân quyền]">
        {/* form crud */}
        <FormTemplate contentSize={"70"} labelSize={"30"}>
          {/* content form crud */}
          <FormChildTemplate title={"Jane Smith"} required={true}>
            <InputTextTemplate></InputTextTemplate>
          </FormChildTemplate>
          <FormChildTemplate title={"Jane Smith"} required={true}>
            <InputTextTemplate></InputTextTemplate>
          </FormChildTemplate>
          <FormChildTemplate title={"Jane Smith"} required={true}>
            <InputTextTemplate></InputTextTemplate>
          </FormChildTemplate>
          <FormChildTemplate title={"Jane Smith"} required={true}>
            <InputTextTemplate></InputTextTemplate>
          </FormChildTemplate>
          <FormChildTemplate title={"Jane Smith"} required={true}>
            <InputTextTemplate></InputTextTemplate>
          </FormChildTemplate>
          <FormChildTemplate title={"Jane Smith"} required={true}>
            <InputTextTemplate></InputTextTemplate>
          </FormChildTemplate>
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
        {/* <label>First Name</label>
            <input 
        {...register("firstName", { required: true })} />
        {errors.firstName && <p className="text-red-500">First name is required</p>}
            <label>Gender Selection</label>
            <select {...register("gender")}>
                <option value="female">female</option>
                <option value="male">male</option>
                <option value="other">other</option>
            </select>
            <button  onClick={handleSubmit(onSubmit)} >click</button> */}

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

export default CRUDRolesManagement;
