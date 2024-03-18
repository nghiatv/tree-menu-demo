"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useCreateNodeStore } from "@/stores/createNode";
import useTreeStore from "@/stores/tree";
import { useUpdateNodeStore } from "@/stores/updateNode";
import { SendIcon } from "lucide-react";
import { use, useEffect, useState } from "react";

export function UpdateNodeDialog() {
  const { updateNode } = useTreeStore();
  const { open, setOpen, node } = useUpdateNodeStore();
  const [value, setValue] = useState<string>(() => node?.value || "");

  const handleUpdateNode = () => {
    try {
      if (node) {
        updateNode(node.id, value);
      }

      setOpen(false);
    } catch (error) {
      // TODO: Handle error
    }
  };

  useEffect(() => {
    setValue(node?.value || "");
  }, [node]);

  return (
    <Dialog onOpenChange={setOpen} open={open} defaultOpen={false}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Update Node #{node?.id}</DialogTitle>
        </DialogHeader>
        <div className="flex items-center space-x-2">
          <div className="grid flex-1 gap-2">
            <Label htmlFor="node-value" className="sr-only">
              Node Value
            </Label>
            <Input
              id="node-value"
              value={value}
              onChange={(e) => setValue(e.target.value)}
            />
          </div>
          <Button
            type="submit"
            size="icon"
            className="px-3"
            onClick={handleUpdateNode}
          >
            <span className="sr-only">Copy</span>
            <SendIcon className="h-4 w-4" />
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
