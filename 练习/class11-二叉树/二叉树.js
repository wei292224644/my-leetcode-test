function TreeNode(val, left, right) {
  this.val = val === undefined ? 0 : val;
  this.left = left === undefined ? null : left;
  this.right = right === undefined ? null : right;
}

class Stack {
  constructor() {
    this.items = [];
  }
  push(element) {
    this.items.push(element);
  }

  pop() {
    if (this.isEmpty()) return null;
    return this.items.pop();
  }

  isEmpty() {
    return this.items.length === 0;
  }
  peek() {
    if (this.isEmpty()) return null;
    return this.items[this.items.length - 1];
  }
}

/**
 * 中序遍历
 */

function inOrderTraversal(root) {
  const process = (node) => {
    if (node == null) return;

    process(node.left);
    console.log(node.val);
    process(node.right);
  };
  process(root);
}

/**
 * 后序遍历
 */

function postOrderTraversal(root) {
  const process = (node) => {
    if (node == null) return;

    process(node.left);
    process(node.right);
    console.log(node.val);
  };
  process(root);
}

/**
 * 前序遍历
 */
function preOrderTraversal(root) {
  const process = (node) => {
    if (node == null) return;
    console.log(node.val);
    process(node.left);
    process(node.right);
  };
  process(root);
}

/**
 * 前序遍历非递归
 */
function preOrderTraversalIterative(root) {
  if (root == null) return;
  const stack = new Stack();
  stack.push(root);

  while (!stack.isEmpty()) {
    const node = stack.pop();
    console.log(node.val);

    if (node.right != null) {
      stack.push(node.right);
    }
    if (node.left != null) {
      stack.push(node.left);
    }
  }
}

/**
 * 后序遍历非递归
 */
function postOrderTraversalIterative(root) {
  if (root == null) return;
  const stack1 = new Stack();
  const stack2 = new Stack();
  stack1.push(root);

  while (!stack1.isEmpty()) {
    const node = stack1.pop();
    stack2.push(node);

    if (node.left != null) {
      stack1.push(node.left);
    }
    if (node.right != null) {
      stack1.push(node.right);
    }
  }

  while (!stack2.isEmpty()) {
    const node = stack2.pop();
    console.log(node.val);
  }
}

// example usage:
const root = new TreeNode(
  1,
  new TreeNode(2, new TreeNode(4), new TreeNode(5)),
  new TreeNode(3, new TreeNode(6), new TreeNode(7))
);

console.log("In-order Traversal:");
inOrderTraversal(root); // 4 2 5 1 6 3 7

console.log("Post-order Traversal:");
postOrderTraversal(root); // 4 5 2 6 7 3 1

console.log("Pre-order Traversal:");
preOrderTraversal(root); // 1 2 4 5 3 6 7

console.log("Pre-order Traversal (Iterative):");
preOrderTraversalIterative(root); // 1 2 4 5 3 6 7

console.log("Post-order Traversal (Iterative):");
postOrderTraversalIterative(root); // 4 5 2 6 7 3 1
