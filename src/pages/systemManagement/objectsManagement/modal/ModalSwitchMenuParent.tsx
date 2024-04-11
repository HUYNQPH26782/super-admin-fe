import React from 'react';
import ModalTemplate, { ModalTemplateProps } from '../../../../components/modal-base/ModalTemplate';

const ModalSwitchMenuParent: React.FC<any> = ({ visible, onClose, onOk }) => {
  return (
    <ModalTemplate visible={visible} onClose={onClose} onOk={onOk} title={"aaaaaaa"} footerCheck={false}>
      <h1>aaaaaaa</h1>
    </ModalTemplate>
  );
};

export default ModalSwitchMenuParent;
