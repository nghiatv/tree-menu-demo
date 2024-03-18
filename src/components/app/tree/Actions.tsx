import * as React from "react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { MoreVertical, PencilIcon, PlusIcon, Trash2Icon } from "lucide-react";
import { useCreateNodeStore } from "@/stores/createNode";
import useTreeStore from "@/stores/tree";
import { confrimationDialogRef } from "../dialogs/Confirmation";
import { useUpdateNodeStore } from "@/stores/updateNode";
import { Node } from "@/stores/tree";

type ActionsProps = {
  node: Node;
};

export function Actions({ node }: ActionsProps) {
  const { openDialog } = useCreateNodeStore();
  const { openUpdateDialog } = useUpdateNodeStore();
  const { removeNode, updateNode } = useTreeStore();

  const handleAddNewNode = () => {
    if (node.id) {
      openDialog(node.id);
    }
  };

  const handleUpdateExistNode = () => {
    if (node.id) {
      openUpdateDialog(node);
    }
  };

  const handleRemoveNode = async () => {
    const confirmed = await confrimationDialogRef.current?.show();
    if (confirmed) {
      removeNode(node.id);
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          className="opacity-0 group-hover:opacity-100 w-5 h-5 px-0"
        >
          <MoreVertical className="h-4 w-4" />
          <span className="sr-only">More</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={handleAddNewNode}>
          <PlusIcon className="mr-2 h-4 w-4" /> Add Node
        </DropdownMenuItem>
        <DropdownMenuItem onClick={handleUpdateExistNode}>
          <PencilIcon className="mr-2 h-4 w-4" /> Update Node
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleRemoveNode}>
          <Trash2Icon className="mr-2 h-4 w-4 text-red-400" />{" "}
          <span className="text-red-400">Remove Node</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
