import React from "react";
import { Tag } from "antd";

interface TagTemplateProps {
  children: React.ReactNode;
  color: string;
}

const TagTemplate: React.FC<TagTemplateProps> = ({
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

export default TagTemplate;
