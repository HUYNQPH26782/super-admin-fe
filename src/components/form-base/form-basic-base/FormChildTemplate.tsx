import React, { memo } from "react";

interface FormChildTemplateProps {
  title: String;
  required: Boolean;
  children: React.ReactNode;
}
const FormChildTemplate: React.FC<FormChildTemplateProps> = ({
  title,
  required,
  children,
}) => {
  return (
    <>
      <tr>
        <td className="h-14 pl-5 p-4 text-bor bg-gray-100 font-medium border-2 border-gray-300 border-l-0">{title} { required ? <span className="text-red-500 text-lg">*</span> : '' }</td>
        <td className=" pl-5 p-4 border-2  border-gray-300 border-r-0">{children}</td>
      </tr>
    </>
  );
};

export default memo(FormChildTemplate);
