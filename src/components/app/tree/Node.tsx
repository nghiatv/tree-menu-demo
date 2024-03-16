import { FC, useState } from "react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { MinusCircleIcon, PlusCircleIcon } from "lucide-react";

export type TreeNodeProps = {
  id: string;
  value: string;
  children?: TreeNodeProps[];
};

export const TreeNode: FC<TreeNodeProps> = ({ value, children }) => {
  const [open, setOpen] = useState(true);
  return (
    <Collapsible asChild open={open} onOpenChange={setOpen}>
      <li className="relative before:border-l before:pr-2 before:h-full before:block before:absolute before:left-0 py-1 pl-2">
        <div className="flex">
          <CollapsibleTrigger className="cursor-pointer mr-1.5">
            <>
              {open ? (
                <MinusCircleIcon size={16} />
              ) : (
                <PlusCircleIcon size={16} />
              )}
            </>
          </CollapsibleTrigger>
          <span className="text-sm">{value}</span>
        </div>
        {children && children.length > 0 && (
          <CollapsibleContent asChild>
            <ul className="pl-4 my-2">
              {children.map((child, index) => (
                <TreeNode key={index} {...child} />
              ))}
            </ul>
          </CollapsibleContent>
        )}
      </li>
    </Collapsible>
  );
};
