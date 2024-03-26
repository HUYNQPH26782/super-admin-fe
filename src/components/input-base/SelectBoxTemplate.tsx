import React from "react";
import { Select } from "antd";
import { Controller } from "react-hook-form";

const SelectBoxTemplate: React.FC<any> = ({
  name,
  control,
  options,
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
              <Select
                defaultValue="lucy"
                className="min-w-[150px]"
                options={options}
                {...field}
                {...restProps}
              />
            </>
          );
        }}
      />
    </>
  );
};

export default SelectBoxTemplate;
