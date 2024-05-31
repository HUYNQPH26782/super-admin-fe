import React, { memo } from "react";
import { Card } from "antd";

const CardLayoutTemplate: React.FC<any> = ({
    children,
  active,
  title,
  ...restProps
}) => {
  return (
    <>
      <Card
        className="shadow-md"
        title={<h1 className="text-lg">{title}</h1>}
        {...restProps}
        extra={active}>
            {children}
      </Card>
    </>
  );
};

export default memo(CardLayoutTemplate);
