import { FC } from "react";
import { TreeNode, TreeNodeProps } from "./Node";

type TreeProps = {
  root: TreeNodeProps;
};

const Tree: FC<TreeProps> = ({ root }) => (
  <ul className="pl-4">
    <TreeNode {...root} />
  </ul>
);

export default Tree;
