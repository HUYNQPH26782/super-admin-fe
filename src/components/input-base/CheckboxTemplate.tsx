import React, { memo } from "react";
import { Checkbox } from "antd";
import { Controller } from "react-hook-form";
import { TYPE_MANAGEMENT } from "../../interface/constants/type/Type.const";

const CheckboxTemplate: React.FC<any> = ({
  name,
  control,
  value,
  label,
  mode,
  ...restProps
}) => {
  return (
    <>
      <Controller
        name={name}
        control={control}
        render={({ field }) => {
          return (
            <>
              <Checkbox 
                disabled={mode === TYPE_MANAGEMENT.MODE_DETAIL} {...field} {...restProps}>
                {{ label }}
              </Checkbox>
            </>
          );
        }}
      />
    </>
  );
};

export default memo(CheckboxTemplate);
