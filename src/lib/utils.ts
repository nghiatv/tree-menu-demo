import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { Node } from "@/stores/tree";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function findNode(
  root: Node | undefined | null,
  targetId: string
): Node | undefined {
  if (!root) return undefined;

  const stack: Node[] = [root];

  while (stack.length > 0) {
    const node = stack.pop()!;
    if (node.id === targetId) {
      return node;
    }

    if (node.children) {
      stack.push(...node.children);
    }
  }

  return undefined;
}

export function findSibling(
  parent: Node | undefined | null,
  targetId: string
): Node | undefined {
  if (!parent) return undefined;
  const node = parent.children.find((node) => node.id === targetId);
  if (!node) return undefined;

  // Find the index of the target node in the parent's children
  const index = parent.children.indexOf(node);

  // Find the next sibling that is a leaf
  for (let i = index + 1; i < parent.children.length; i++) {
    const sibling = parent.children[i];
    if (sibling) {
      return sibling;
    }
  }

  // If no next leaf sibling is found, find the previous sibling that is a leaf
  for (let i = index - 1; i >= 0; i--) {
    const sibling = parent.children[i];
    if (sibling) {
      return sibling;
    }
  }

  return undefined;
}

export function findPathToNode(
  root: Node | undefined | null,
  targetId: string
): Node[] | undefined {
  if (!root) return undefined;

  const stack: { node: Node; path: Node[] }[] = [{ node: root, path: [] }];

  while (stack.length > 0) {
    const { node, path } = stack.pop()!;
    if (node.id === targetId) {
      return [...path, node];
    }

    if (node.children) {
      for (const child of node.children) {
        stack.push({ node: child, path: [...path, node] });
      }
    }
  }

  return undefined;
}
