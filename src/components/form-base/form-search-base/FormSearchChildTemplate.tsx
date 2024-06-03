import React, { memo } from "react";

interface FormSearchChildTemplateProps {
    label: String;
    children: React.ReactNode;
}
const FormSearchChildTemplate: React.FC<FormSearchChildTemplateProps> = ({label, children}) => {

  return (
    <>
        <div className="grid gap-2 grid-cols-8">
            <span className="col-span-8 font-medium">{label}</span>
            <div className="col-span-8">
                {children}
            </div>
        </div>
    </>
  );
};

export default memo(FormSearchChildTemplate);
