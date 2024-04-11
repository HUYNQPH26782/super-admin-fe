import React from 'react';
import { Modal, Button } from 'antd';

export interface ModalTemplateProps {
  visible: boolean;
  onClose?: () => void;
  onOk?: () => void;
  footerCheck: boolean;
  children: React.ReactNode;
  title: string;
}

const ModalTemplate: React.FC<ModalTemplateProps> = ({ visible, onClose, footerCheck, children, onOk, title, ...modalProps }) => {
  return (
    <Modal {...modalProps} visible={visible} onCancel={onClose} title={title} footer={footerCheck ?[
      <Button key="cancel" onClick={onClose}>Cancel</Button>,
      <Button key="ok" type="primary" onClick={() => {
        onOk && onOk();
      }}>OK</Button>,
    ] : null}>
      {children}
    </Modal>
  );
};

export default ModalTemplate;
