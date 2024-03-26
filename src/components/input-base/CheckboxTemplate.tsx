import React from "react";
import { Checkbox } from "antd";
import { Controller } from "react-hook-form";

const CheckboxTemplate: React.FC<any> = ({
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
              <Checkbox {...field} {...restProps}>
                {{ label }}
              </Checkbox>
            </>
          );
        }}
      />
    </>
  );
};

export default CheckboxTemplate;
