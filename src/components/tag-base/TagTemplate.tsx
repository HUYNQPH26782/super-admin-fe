import React, { memo } from "react";
import { Tag } from "antd";

const TagTemplate: React.FC<any> = ({
  children,
  color,
  ...restProps
}) => {
  return (
    <>
      <Tag color={color} {...restProps}>
        {children}
      </Tag>
    </>
  );
};

export default memo(TagTemplate);
