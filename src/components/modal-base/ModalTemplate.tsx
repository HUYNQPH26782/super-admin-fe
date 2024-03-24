import React from 'react';
import { Modal, ModalProps, Button } from 'antd';

interface ModalTemplateProps extends ModalProps {
  visible: boolean;
  onClose: () => void;
  onOk: () => void;
}

const ModalTemplate: React.FC<ModalTemplateProps> = ({ visible, onClose, ...modalProps }) => {
  return (
    <Modal {...modalProps} visible={visible} onCancel={onClose} footer={[
      <Button key="cancel" onClick={onClose}>Cancel</Button>,
      <Button key="ok" type="primary" onClick={() => {
        modalProps.onOk && modalProps.onOk();
        onClose();
      }}>OK</Button>,
    ]}>
      {modalProps.children}
    </Modal>
  );
};

export default ModalTemplate;
