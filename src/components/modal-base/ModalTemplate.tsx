import React, { memo } from 'react';
import { Modal, Button } from 'antd';

export interface ModalTemplateProps {
  visible: boolean;
  onClose?: () => void;
  onOk?: () => void;
  width?: number;
  footerCheck: boolean;
  children: React.ReactNode;
  title: string;
}

const ModalTemplate: React.FC<ModalTemplateProps> = ({ visible, onClose, footerCheck, children, onOk, width, title, ...modalProps }) => {
  return (
    <Modal {...modalProps} width={width} visible={visible} onCancel={onClose} title={title} footer={footerCheck ?[
      <Button key="cancel" onClick={onClose}>Cancel</Button>,
      <Button key="ok" type="primary" onClick={() => {
        onOk && onOk();
      }}>OK</Button>,
    ] : null}>
      {children}
    </Modal>
  );
};

export default memo(ModalTemplate);
