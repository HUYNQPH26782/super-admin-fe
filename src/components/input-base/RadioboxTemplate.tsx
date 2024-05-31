import React, { memo } from "react";
import { Radio } from "antd";
import { Controller } from "react-hook-form";

const RadioTemplate: React.FC<any> = ({
  name,
  control,
  value,
  label,
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
              <Radio {...field} {...restProps}>
                {{ label }}
              </Radio>
            </>
          );
        }}
      />
    </>
  );
};

export default memo(RadioTemplate);
