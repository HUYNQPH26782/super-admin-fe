import React from "react";
import { Select } from "antd";
import { Controller } from "react-hook-form";
import { TYPE_MANAGEMENT } from "../../interface/constants/type/Type.const";

const SelectBoxTemplate: React.FC<any> = ({
  name,
  control,
  mode,
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
                disabled={mode === TYPE_MANAGEMENT.MODE_DETAIL}
                className="min-w-[150px] text-black"
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
