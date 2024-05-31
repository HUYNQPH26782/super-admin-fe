import React, { memo } from 'react';
import { Tree } from 'antd';
import type { TreeDataNode } from 'antd';
import { useController } from 'react-hook-form';

interface TreeTemplateProps {
  data: TreeDataNode[];
  name: string;
  control: any;
  disabled: boolean;
}

const TreeTemplate: React.FC<TreeTemplateProps> = ({ data, disabled, name, control }) => {
  const {
    field: { onChange, value },
  } = useController({ name, control });

  return (
    <Tree
      checkable
      disabled={disabled}
      autoExpandParent={true}
      onCheck={onChange}
      checkedKeys={value}
      treeData={data}
    />
  );
};

export default memo(TreeTemplate);
