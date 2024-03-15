import { TreeNodeProps } from "@/components/app/tree/Node";

export const rootData: TreeNodeProps = {
  value: "Root Node",
  children: [
    {
      value: "Child Node 1",
      children: [
        {
          value: "Grandchild Node 1",
        },
        {
          value: "Grandchild Node 2",
        },
      ],
    },
    {
      value: "Child Node 2",
    },
  ],
};
