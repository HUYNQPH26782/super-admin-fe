import React, { useEffect, useState } from 'react';
import { Tree } from 'antd';
import type { TreeDataNode, TreeProps } from 'antd';
import { useController } from 'react-hook-form';

interface TreeTemplateProps {
  data: TreeDataNode[];
  name: string;
  control: any;
}

const TreeTemplate: React.FC<TreeTemplateProps> = ({ data, name, control }) => {
  const {
    field: { onChange, value },
  } = useController({ name, control });
  const [checkedKeys, setCheckedKeys] = useState<React.Key[]>([]);

  const onCheck: TreeProps['onCheck'] = (checkedKeysValue) => {
    setCheckedKeys(checkedKeysValue as React.Key[]);
  };

  return (
    <Tree
      checkable
      autoExpandParent={true}
      onCheck={onChange}
      checkedKeys={value}
      treeData={data}
    />
  );
};

export default TreeTemplate;
