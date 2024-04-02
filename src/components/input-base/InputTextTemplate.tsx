import React from "react";
import { Input } from "antd";
import { Controller, useFormContext } from "react-hook-form";
import { FieldError } from "react-hook-form";

interface Props {
  name: string;
  control: any;
  [key: string]: any;
}

const InputTextTemplate: React.FC<Props> = ({ name, control, ...restProps }) => {
  return (
    <>
      <Controller
        name={name}
        control={control}
        rules={{ required: 'Trường này là bắt buộc' }}
        render={({ field }) => (
          <Input
            {...field}
            {...restProps}
            onBlur={(e) => {
              if (field.value) {
                field.onChange(field.value.trim());
              }
            }}
          />
        )}
      />
    </>
  );
};

export default InputTextTemplate;
