"use client";

import { FC, use, useEffect, useState } from "react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { MinusCircleIcon, PlusCircleIcon } from "lucide-react";
import { Actions } from "./Actions";
import { Node, useTree } from "@/stores/tree";
import Link from "next/link";

import { usePathname } from "next/navigation";
import { cn, findPathToNode } from "@/lib/utils";

export const TreeNode: FC<Node> = (props) => {
  const { id, value, children } = props;
  const pathname = usePathname();
  const [open, setOpen] = useState(true);

  return (
    <Collapsible key={`node-${id}`} asChild open={open} onOpenChange={setOpen}>
      <li className=" relative before:border-l before:pr-2 before:h-full before:block before:absolute before:left-0 py-1 pl-2">
        <div className="flex justify-between group">
          <div className="flex flex-1 items-center">
            <CollapsibleTrigger className="cursor-pointer mr-1.5">
              <>
                {open ? (
                  <MinusCircleIcon size={16} />
                ) : (
                  <PlusCircleIcon size={16} />
                )}
              </>
            </CollapsibleTrigger>
            <Link
              href={`/${id}`}
              className={cn(
                "whitespace-nowrap",
                pathname === `/${id}` ? "font-semibold underline" : ""
              )}
            >
              <span className="text-sm">{value}</span>
            </Link>
          </div>
          <Actions node={props} />
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
