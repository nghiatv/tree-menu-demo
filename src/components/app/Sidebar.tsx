"use client";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@radix-ui/react-scroll-area";
import { rootData } from "@/constants/tree";
import Tree from "./tree";

interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {
  playlists: any[];
}

export function Sidebar({ className }: SidebarProps) {
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
