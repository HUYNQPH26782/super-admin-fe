import React, { memo } from "react";

const FormFooterTemplate: React.FC<any> = ({
  children
}) => {
  return (
    <>        
    <tr>
      <th className="h-14 p-4 pb-0" colSpan={2}>{children}</th>
    </tr>
    </>
  );
};

export default memo(FormFooterTemplate);
