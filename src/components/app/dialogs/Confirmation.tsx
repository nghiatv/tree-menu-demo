"use client";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import React from "react";
import { useCallback, useImperativeHandle, useRef, useState } from "react";

export const confrimationDialogRef = React.createRef<{
  show: () => Promise<unknown>;
  hide: (props: any, timeoutDuration: number) => Promise<any>;
}>();

type GenericFunction = (props: any) => any;

export function ConfirmationDialog() {
  const [open, setOpen] = useState(false);

  const onHideRef = useRef<GenericFunction>(() => {});

  const hide = useCallback(async (props?: any, timeoutDuration = 0) => {
    setOpen(false);

    await new Promise((resolve) => setTimeout(resolve, timeoutDuration));
    onHideRef.current(props);
  }, []);

  const show = useCallback(async () => {
    if (open) {
      await hide("cancelled", 0);
    }

    setOpen(true);

    return new Promise((resolve) => {
      onHideRef.current = resolve;
    });
  }, [hide, open]);

  useImperativeHandle(confrimationDialogRef, () => ({
    show,
    hide,
  }));

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your
            account and remove your data from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={() => hide(false)}>
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction onClick={() => hide(true)}>
            Continue
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
