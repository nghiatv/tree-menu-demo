import { FC } from "react";

export type TreeNodeProps = {
  value: string;
  children?: TreeNodeProps[];
};

export const TreeNode: FC<TreeNodeProps> = ({ value, children }) => (
  <li>
    {value}
    {children && (
      <ul className="pl-4">
        {children.map((child, index) => (
          <TreeNode key={index} {...child} />
        ))}
      </ul>
    )}
  </li>
);
