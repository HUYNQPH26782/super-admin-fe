import React from "react";
import { Radio, RadioChangeEvent } from "antd";
import { Controller, useController } from "react-hook-form";
import { t } from "i18next";

interface Option {
  value: string | number | undefined | null;
  label: string;
}

type Props = {
  options: Option[];
  name: string;
  control: any;
  isCheck: Boolean;
};

const ListRadioboxTemplate: React.FC<Props> = ({
  options,
  control,
  name,
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
    >
      {isCheck ? (
        <Radio key={-1} value={null} checked={value === null}>
          {t("common.radiobox.radioboxAll")}
        </Radio>
      ) : (
        <></>
      )}
      {options.map((el: Option) => (
        <Radio key={el.value} value={el.value}>
          {el.label}
        </Radio>
      ))}
    </Radio.Group>
  );
};

export default ListRadioboxTemplate;
