import { create } from "zustand";
import { v4 as uuidv4 } from "uuid";

type Node = {
  id: string;
  value: string;
  children?: Node[];
};

type State = {
  tree: Node[];
};

type Actions = {
  addNode: (parentId: string, value: string) => void;
  removeNode: (id: string) => void;
  updateNode: (id: string, value: string) => void;
};

const useTreeStore = create<State & Actions>((set) => ({
  tree: [],
  addNode: (parentId, value: string) =>
    set((state) => {
      const newTree = state.tree.map((node) => {
        if (node.id === parentId) {
          return {
            ...node,
            children: [
              ...(node.children || []),
              {
                id: uuidv4(),
                value,
              },
            ],
          };
        }
        return node;
      });
      return { tree: newTree };
    }),
  removeNode: (id) =>
    set((state) => {
      const newTree = state.tree.map((node) => {
        if (node.id === id) {
          return {
            ...node,
            children: undefined,
          };
        }
        return node;
      });
      return { tree: newTree };
    }),
  updateNode: (id, value) =>
    set((state) => {
      const newTree = state.tree.map((node) => {
        if (node.id === id) {
          return {
            ...node,
            value,
          };
        }
        return node;
      });
      return { tree: newTree };
    }),
}));

export default useTreeStore;
