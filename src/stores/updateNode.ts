import { create } from "zustand";
import { Entry } from "./tree";

type CreateNodeState = {
  open: boolean;
  setOpen: (open: boolean) => void;
  node?: Entry;
  openUpdateDialog: (node: Entry) => void;
};

export const useUpdateNodeStore = create<CreateNodeState>((set) => ({
  open: false,
  node: undefined,
  setOpen: (open: boolean) => set({ open }),
  openUpdateDialog: (node: Entry) => set({ node, open: true }),
}));
