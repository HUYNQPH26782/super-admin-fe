import React, { memo } from "react";

interface FormSearchTemplateProps {
    footer: React.ReactNode;
    children: React.ReactNode;
}
const FormSearchTemplate: React.FC<FormSearchTemplateProps> = ({
    footer,
    children
}) => {

  return (
    <>
      <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 p-4 md:p-2 xl:p-5">
        {children}
      </div>
      <div className="grid grid-cols-1 justify-center items-center h-full p-4 md:p-2 xl:p-5">
            <div className="col-span-1 text-center">
                {footer}
            </div>
      </div>
    </>
  );
};

export default memo(FormSearchTemplate);
