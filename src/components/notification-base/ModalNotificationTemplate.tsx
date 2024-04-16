import React, { createContext, useContext } from "react";
import { Modal } from "antd";
import { ModalType } from "../../interface/constants/type/Type.const";
import { t } from "i18next";

interface ModalContextType {
  openModal: (
    type: ModalType,
    title: string,
    message: React.ReactNode,
    onOk: Function
  ) => void;
}

const ModalContext = createContext<ModalContextType | undefined>(undefined);

export const ModalNotificationTemplate: React.FC<any> = ({ children }) => {
  const openModal = (
    type: ModalType,
    title: string,
    message: React.ReactNode,
    onOk: Function
  ) => {
    switch (type) {
      case "info":
        Modal.info({
          title: title,
          content: message,
          okButtonProps: {
            className: "bg-blue-500",
          },
          okText: t("common.confirm.okText"),
          cancelText: t("common.confirm.cancelText"),
          onOk() {
            onOk();
          },
        });
        break;
      case "error":
        Modal.error({
          title: title,
          content: message,
          okButtonProps: {
            className: "bg-blue-500",
          },
          okText: t("common.confirm.okText"),
          cancelText: t("common.confirm.cancelText"),
          onOk() {
            onOk();
          },
        });
        break;
      case "success":
        Modal.success({
          title: title,
          content: message,
          okButtonProps: {
            className: "bg-blue-500",
          },
          okText: t("common.confirm.okText"),
          cancelText: t("common.confirm.cancelText"),
          onOk() {
            onOk();
          },
        });
        break;
      case "warning":
        Modal.warning({
          title: title,
          content: message,
          okButtonProps: {
            className: "bg-blue-500",
          },
          okText: t("common.confirm.okText"),
          cancelText: t("common.confirm.cancelText"),
          onOk() {
            onOk();
          },
        });
        break;
      case "confirm":
        Modal.confirm({
          title: title,
          content: message,
          okButtonProps: {
            className: "bg-blue-500",
          },
          okText: t("common.confirm.okText"),
          cancelText: t("common.confirm.cancelText"),
          onOk() {
            onOk();
          },
        });
        break;
      default:
        break;
    }
  };

  return (
    <ModalContext.Provider value={{ openModal }}>
      {children}
    </ModalContext.Provider>
  );
};

export const useModalProvider = () => {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error("useModal must be used within a ModalProvider");
  }
  return context;
};
