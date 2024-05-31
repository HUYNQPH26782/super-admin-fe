import React, { memo } from "react";
import { Select } from "antd";
import { Controller } from "react-hook-form";
import { TYPE_MANAGEMENT } from "../../interface/constants/type/Type.const";
import { t } from "i18next";

const SelectBoxTemplate: React.FC<any> = ({
  name,
  control,
  mode,
  options,
  defaultValue,
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
                defaultValue={defaultValue}
                placeholder={t('common.select.placeholder')}
                disabled={mode === TYPE_MANAGEMENT.MODE_DETAIL}
                className="min-w-[150px] text-black"
                allowClear
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

export default memo(SelectBoxTemplate);
