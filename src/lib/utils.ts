import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { Node } from "@/stores/tree";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Finds a node with the specified targetId in the tree rooted at the given root node.
 * @param root - The root node of the tree.
 * @param targetId - The id of the node to find.
 * @returns The node with the specified targetId, or undefined if not found.
 */
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

/**
 * Finds the sibling node of the given target node within the parent node's children.
 * A sibling node is a node that shares the same parent and is located either before or after the target node.
 *
 * @param parent - The parent node.
 * @param targetId - The ID of the target node.
 * @returns The sibling node of the target node, or undefined if no sibling is found.
 */
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

/**
 * Finds the path to a node with the specified target ID in a tree.
 *
 * @param root - The root node of the tree.
 * @param targetId - The ID of the target node to find.
 * @returns An array of nodes representing the path to the target node, or undefined if the node is not found.
 */
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

/**
 * Checks if a node is a descendant or itself of another node in a tree.
 *
 * @param tree - The root node of the tree.
 * @param targetId - The ID of the target node.
 * @param ancestorId - The ID of the ancestor node.
 * @returns A boolean indicating whether the target node is a descendant or itself of the ancestor node.
 */
export function isDescendantOrSelf(
  tree: Node | undefined | null,
  targetId: string,
  ancestorId: string
): boolean {
  if (!tree) return false;

  // If the target node is the ancestor node, return true
  if (targetId === ancestorId) {
    return true;
  }

  const ancestor = findNode(tree, ancestorId);

  return findNode(ancestor, targetId) !== undefined;
}
