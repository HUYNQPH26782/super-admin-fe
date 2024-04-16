import React, { useState } from 'react';
import { Tree } from 'antd';
import type { TreeDataNode, TreeProps } from 'antd';

interface TreeTemplateProps {
  data: TreeDataNode[];
  name: string;
  control: any;
}

interface objectDataType {
  id: string;
  idParent: string;
}

const TreeTemplate: React.FC<TreeTemplateProps> = ({ data, name, control }) => {
  const [checkedKeys, setCheckedKeys] = useState<React.Key[]>(['0-2']);
  const [objectsData, setObjectData] = useState<objectDataType>();

//   function addMenusToList(menu:TreeDataNode, list:objectDataType[]) {
//     list.push(menu);
//     if (menu.children) {
//         menu.children.forEach(child => {
//             addMenusToList(child, list);
//         });
//     }
// }

  const onCheck: TreeProps['onCheck'] = (checkedKeysValue) => {
    console.log(data, checkedKeysValue);
    setCheckedKeys(checkedKeysValue as React.Key[]);
  };

  return (
    <Tree
      checkable
      autoExpandParent={true}
      onCheck={onCheck}
      checkedKeys={checkedKeys}
      treeData={data}
    />
  );
};

export default TreeTemplate;
