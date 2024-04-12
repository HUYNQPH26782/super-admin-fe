import React, { useState } from 'react';
import { Tree } from 'antd';
import type { TreeDataNode, TreeProps } from 'antd';

interface TreeTemplateProps {
  data: TreeDataNode[];
}

const TreeTemplate: React.FC<TreeTemplateProps> = ({ data }) => {
  const [checkedKeys, setCheckedKeys] = useState<React.Key[]>(['0-2']);


  const onCheck: TreeProps['onCheck'] = (checkedKeysValue) => {
    console.log('onCheck', checkedKeysValue);
    setCheckedKeys(checkedKeysValue as React.Key[]);
  };

  return (
    <Tree
      checkable
      autoExpandParent={true}
      onCheck={onCheck}
      checkedKeys={checkedKeys}
      treeData={data}
      defaultExpandedKeys={['0-0', '0-1']}
    />
  );
};

export default TreeTemplate;
