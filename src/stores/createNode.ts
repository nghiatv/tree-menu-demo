import { create } from "zustand";

type CreateNodeState = {
  open: boolean;
  openDialog: (parentId: string) => void;
  setOpen: (open: boolean) => void;
  parentId?: string;
};

export const useCreateNodeStore = create<CreateNodeState>((set) => ({
  open: false,
  parentId: undefined,
  openDialog: (parentId: string) => set({ parentId, open: true }),
  setOpen: (open: boolean) => set({ open }),
}));
