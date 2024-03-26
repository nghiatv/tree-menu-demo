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
import useTreeStore, { useTree } from "@/stores/tree";
import { confrimationDialogRef } from "../dialogs/Confirmation";
import { useUpdateNodeStore } from "@/stores/updateNode";
import { Node } from "@/stores/tree";
import {
  findSibling,
  findNode,
  findPathToNode,
  isDescendantOrSelf,
} from "@/lib/utils";
import { usePathname, useRouter } from "next/navigation";
import { useCallback, useMemo } from "react";

type ActionsProps = {
  node: Node;
};

export function Actions({ node }: ActionsProps) {
  const { openDialog } = useCreateNodeStore();
  const { openUpdateDialog } = useUpdateNodeStore();
  const { removeNode } = useTreeStore();
  const tree = useTree();
  const router = useRouter();
  const pathname = usePathname();

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

  const handleRemoveNode = useCallback(async () => {
    const path = findPathToNode(tree, node.id);

    const confirmed = await confrimationDialogRef.current?.show();

    if (confirmed) {
      // find parent node
      const parentNode = findNode(tree, node.parentId);

      // find the sibling of the node
      const sibling = findSibling(parentNode, node.id);

      const shouldRedirect = isDescendantOrSelf(
        tree,
        pathname.slice(1),
        node.id
      );

      // Remove the node from the tree
      removeNode(node.id);

      // If the current pathname is not the node's pathname, do nothing
      if (!shouldRedirect) {
        return;
      }

      // If the node has a sibling, navigate to the sibling
      if (sibling) {
        router.push(`/${sibling.id}`);
      } else {
        // If the node does not have a sibling, navigate to the parent
        router.push(`/${parentNode?.id}`);
      }
    }
  }, [tree, node.id, node.parentId, removeNode, pathname, router]);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          className="opacity-0 group-hover:opacity-100 w-5 h-5 px-0 outline-none focus:outline-none focus-within:ring-0"
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
        <DropdownMenuItem disabled={!node.parentId} onClick={handleRemoveNode}>
          <Trash2Icon className="mr-2 h-4 w-4 text-red-700" />{" "}
          <span className="text-red-700 font-semibold">Remove Node</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
