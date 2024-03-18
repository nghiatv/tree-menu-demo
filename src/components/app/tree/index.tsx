import { FC } from "react";
import { TreeNode } from "./Node";
import { Node } from "@/stores/tree";

type TreeProps = {
  root: Node | null;
};

const Tree: FC<TreeProps> = ({ root }) => (
  <ul className="pl-4">{root && <TreeNode {...root} />}</ul>
);

export default Tree;
