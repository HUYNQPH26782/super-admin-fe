import React from "react";
import { Input } from "antd";
import { Controller } from "react-hook-form";

const InputTextTemplate: React.FC<any> = ({ name, control, ...restProps }) => {
  return (
    <>
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <Input
            {...field}
            {...restProps}
            onBlur={(e) => {
                field.onChange(field.value.trim());
            }}
          />
        )}
      />
    </>
  );
};

export default InputTextTemplate;
