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
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export const TreeNode: FC<Node> = (props) => {
  const { id, value, children } = props;
  const pathname = usePathname();
  const [open, setOpen] = useState(true);

  return (
    <Collapsible key={`node-${id}`} asChild open={open} onOpenChange={setOpen}>
      <li className="w-full relative before:border-l before:pr-2 before:h-full before:block before:absolute before:left-0 py-1 pl-1 overflow-x-hidden">
        <div className="flex group w-full gap-x-2">
          <CollapsibleTrigger className="cursor-pointer block">
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
              "block w-full truncate group-hover:underline",
              pathname === `/${id}` ? "font-semibold underline" : ""
            )}
          >
            <Tooltip>
              <TooltipTrigger asChild>
                <span className="text-sm block truncate line-clamp-1">
                  {value}
                </span>
              </TooltipTrigger>
              <TooltipContent>{value}</TooltipContent>
            </Tooltip>
          </Link>
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
