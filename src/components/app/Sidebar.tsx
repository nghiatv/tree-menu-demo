"use client";
import { cn } from "@/lib/utils";
import Tree from "./tree";
import { useTree } from "@/stores/tree";

interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {}

export function Sidebar({ className }: SidebarProps) {
  const rootData = useTree();

  return (
    <div className={cn("pb-12 min-h-screen", className)}>
      <div className="space-y-4 py-4">
        <div className="px-3 py-2">
          <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight">
            Demo
          </h2>
          <div className="space-y-1">
            <Tree root={rootData} />
          </div>
        </div>
      </div>
    </div>
  );
}
