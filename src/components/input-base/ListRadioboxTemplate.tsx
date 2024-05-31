import React, { memo } from "react";
import { Radio, RadioChangeEvent } from "antd";
import { Controller, useController } from "react-hook-form";
import { t } from "i18next";
import { ICodeMng } from "../../interface/response/common/codeMng/CodeMng.interface";
import { TYPE_MANAGEMENT } from "../../interface/constants/type/Type.const";

type Props = {
  options: ICodeMng[]|undefined;
  name: string;
  control: any;
  mode?: string;
  isCheck: Boolean;
};

const ListRadioboxTemplate: React.FC<Props> = ({
  options,
  control,
  name,
  mode,
  isCheck,
}) => {
  const {
    field: { onChange, value },
  } = useController({ name, control });

  const onChangeRadio = (e: RadioChangeEvent) => {
    onChange(e.target.value);
  };

  return (
    <Radio.Group
      onChange={onChangeRadio}
      value={value || null} 
      disabled={mode === TYPE_MANAGEMENT.MODE_DETAIL}
    >
      {isCheck ? (
        <Radio key={-1} value={null} checked={value === null}>
          {t("common.radiobox.radioboxAll")}
        </Radio>
      ) : (
        <></>
      )}
      {options && options.map((el: ICodeMng) => (
        <Radio key={el.value} value={el.value} className="text-black">
          {el.label}
        </Radio>
      ))}
    </Radio.Group>
  );
};

export default memo(ListRadioboxTemplate);
