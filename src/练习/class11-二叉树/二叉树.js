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

class Queue {
  constructor() {
    this.items = [];
  }

  push(element) {
    this.items.push(element);
  }

  pop() {
    return this.items.shift();
  }

  isEmpty() {
    return this.items.length == 0;
  }

  peek() {
    return this.items[0];
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

/**
 * 中序排序非递归
 */
function inOrderTraversalIterative(cur) {
  if (cur === null) return;

  const stack = new Stack();
  while (!stack.isEmpty() || cur !== null) {
    if (cur !== null) {
      stack.push(cur);
      cur = cur.left;
    } else {
      cur = stack.pop();
      console.log(cur.val);
      cur = cur.right;
    }
  }
}

/**
 * 层级优先遍历
 */

function levelOrderTraversal(cur) {
  if (cur == null) return;

  const queue = new Queue();
  queue.push(cur);
  while (!queue.isEmpty()) {
    const v = queue.pop();

    console.log(v.val);

    if (v.left) {
      queue.push(v.left);
    }

    if (v.right) {
      queue.push(v.right);
    }
  }
}

/**
 * 基于前序遍历的序列化
 */

function serializeWithPreOrder(root) {
  if (root == null) return "null";
  return (
    root.val +
    "," +
    serializeWithPreOrder(root.left) +
    "," +
    serializeWithPreOrder(root.right)
  );
}
/**
 * 基于前序遍历的反序列化
 */
function deserializeWithPreOrder(data) {
  const nodes = data.split(",");

  let idx = 0;

  const process = (nodes) => {
    if (nodes[idx] == "null") return null;

    const node = new TreeNode(nodes[idx]);

    node.left = process(nodes, ++idx);
    node.right = process(nodes, ++idx);
    return node;
  };

  return process(nodes);
}

/**
 * 基于层级优先遍历的序列化
 */
function serializeWithLevelOrder(root) {
  if (root == null) return;
  const queue = new Queue();
  queue.push(root);
  let res = "";

  while (!queue.isEmpty()) {
    const v = queue.pop();
    if (v) {
      res += "," + v.val;
      if (v.left) {
        queue.push(v.left);
      } else {
        queue.push(null);
      }

      if (v.right) {
        queue.push(v.right);
      } else {
        queue.push(null);
      }
    } else {
      res += ",null";
    }
  }

  return res.substring(1);
}

/**
 * 基于层级优先遍历的反序列化
 */
function deserializeWithLevelOrder(data) {
  const generateNode = (val) => {
    if (val == "null") return null;
    return new TreeNode(val);
  };
  const nodes = data.split(",");

  let idx = 0;

  const queue = new Queue();
  const head = generateNode(nodes[idx++]);
  queue.push(head);

  let node;
  while (!queue.isEmpty()) {
    node = queue.pop();
    node.left = generateNode(nodes[idx++]);
    node.right = generateNode(nodes[idx++]);

    if (node.left) {
      queue.push(node.left);
    }

    if (node.right) {
      queue.push(node.right);
    }
  }

  return head;
}

// example usage:
const root = new TreeNode(
  1,
  new TreeNode(2, new TreeNode(4), new TreeNode(5)),
  new TreeNode(3, new TreeNode(6), new TreeNode(7))
);

//levelOrderTraversal(root);

console.log("Serialized Tree:");
const v = serializeWithPreOrder(root);
console.log(v);

const node = deserializeWithPreOrder(v);

console.log(node);

console.log("-----");

const v2 = serializeWithLevelOrder(root);

console.log(v2);

const node2 = deserializeWithLevelOrder(v2);
console.log(node2);

// console.log("In-order Traversal:");
// inOrderTraversal(root); // 4 2 5 1 6 3 7
// console.log("---");
// inOrderTraversalIterative(root);

// console.log("Post-order Traversal:");
// postOrderTraversal(root); // 4 5 2 6 7 3 1

// console.log("Pre-order Traversal:");
// preOrderTraversal(root); // 1 2 4 5 3 6 7

// console.log("Pre-order Traversal (Iterative):");
// preOrderTraversalIterative(root); // 1 2 4 5 3 6 7

// console.log("Post-order Traversal (Iterative):");
// postOrderTraversalIterative(root); // 4 5 2 6 7 3 1
