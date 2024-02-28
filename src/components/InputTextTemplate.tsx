import React, { useEffect, useState } from "react";
import { Input } from "antd";

const InputTextTemplate: React.FC<any> = ({ value, ...restProps }) => {
  const [inputValue, setInputValue] = useState<string>("");
  useEffect(() => {
    setInputValue(value);
  }, []);

  const handleBlur = (event: React.FocusEvent<HTMLInputElement>) => {
    const inputValueTrim = event.target.value.trim();
    setInputValue(inputValueTrim);
  };
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  return (
    <>
      <Input
        value={inputValue}
        onBlur={handleBlur}
        onChange={handleChange}
        {...restProps}
      />
    </>
  );
};

export default InputTextTemplate;
