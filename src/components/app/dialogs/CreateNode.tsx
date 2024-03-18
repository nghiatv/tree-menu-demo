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
import { SendIcon } from "lucide-react";
import { useState } from "react";

export function CreateNodeDialog() {
  const { open, setOpen, parentId } = useCreateNodeStore();
  const { addNode } = useTreeStore();
  const [value, setValue] = useState<string>("");

  const handleCreateNode = () => {
    try {
      if (parentId) {
        addNode(parentId, value);
      }
      setOpen(false);
      setValue("");
    } catch (error) {
      // TODO: Handle error
    }
  };

  return (
    <Dialog onOpenChange={setOpen} open={open} defaultOpen={false}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Create Node</DialogTitle>
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
            onClick={handleCreateNode}
          >
            <span className="sr-only">Copy</span>
            <SendIcon className="h-4 w-4" />
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
