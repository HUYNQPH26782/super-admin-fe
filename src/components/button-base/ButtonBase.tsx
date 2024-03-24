import React from "react";
import { Button } from "antd";

const ButtonBase: React.FC<any> = ({  children, onClick, ...restProps }) => {

  return (
    <>
      <Button
        onClick={onClick}
        {...restProps}
      >
        {children}
      </Button>
    </>
  );
};

export default ButtonBase;
