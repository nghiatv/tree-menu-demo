import { create } from "zustand";
import { v4 as uuidv4 } from "uuid";

export type Entry = {
  id: string;
  value: string;
  parentId: string;
};

type State = {
  entries: Entry[];
};

export type Node = Entry & {
  children: Node[];
};

const initialEntries: Entry[] = Array.from({ length: 100 }, (_, index) => {
  const id = (index + 1).toString();
  const value = `Node ${id}`;
  const parentId = index > 0 ? (((index - 1) / 2) >> 0).toString() : ""; // Each node has its parent as the half of its index (integer division), except for the root node

  return { id, value, parentId };
});

type Actions = {
  addNode: (parentId: string, value: string) => void;
  removeNode: (id: string) => void;
  updateNode: (id: string, value: string) => void;
};

/**
 * Custom hook for managing a tree store.
 *
 * @returns An object containing the state and actions for the tree store.
 */
const useTreeStore = create<State & Actions>((set) => ({
  entries: initialEntries,
  addNode: (parentId, value: string) =>
    set((state) => {
      const newNode = {
        id: uuidv4(),
        value,
        parentId,
      };
      return { entries: [...state.entries, newNode] };
    }),
  removeNode: (id) =>
    set((state) => {
      const newTree = state.entries.filter((node) => node.id !== id);
      return { entries: newTree };
    }),
  updateNode: (id, value) =>
    set((state) => {
      const newTree = state.entries.map((node) =>
        node.id === id ? { ...node, value } : node
      );
      return { entries: newTree };
    }),
}));

export const useTree = () => {
  // build a tree from the flat list of nodes
  const tree = useTreeStore((state) => {
    const root = state.entries.find((node) => !node.parentId);
    if (!root) return null;
    const buildTree = (entry: Entry): Node => ({
      ...entry,
      children: state.entries
        .filter((n) => n.parentId === entry.id)
        .map(buildTree),
    });
    return buildTree(root);
  });
  return tree;
};
export default useTreeStore;
