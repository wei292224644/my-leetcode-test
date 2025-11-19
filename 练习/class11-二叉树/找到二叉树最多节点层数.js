/**
 * 找到二叉树最多节点层数
 * 题目：给定一棵二叉树的头节点head，返回这棵二叉树的最大层数
 * 思路：使用层序遍历，遍历过程中记录层数
 */

const { generateRandomBST, printTree, TreeNode } = require("./tools.js");

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

function maxDepth(head) {
  //   if (head == null) return 0;

  //   let max = 1;
  //   let curLen = 0;
  //   let curEndNode, nextEndNode;

  //   const queue = new Queue();
  //   queue.push(head);

  //   curEndNode = head;

  //   while (!queue.isEmpty()) {
  //     const node = queue.pop();

  //     curLen++;

  //     if (node.left) {
  //       queue.push(node.left);

  //       nextEndNode = node.left;
  //     }
  //     if (node.right) {
  //       queue.push(node.right);
  //       nextEndNode = node.right;
  //     }

  //     if (node === curEndNode) {
  //       curEndNode = nextEndNode;
  //       nextEndNode = null;
  //       max = Math.max(max, curLen);
  //       curLen = 0;
  //     }
  //   }

  //   return max;

  if (head == null) return 0;

  let max = 1;
  let curLen = 0;
  let curEndNode, nextEndNode;

  const queue = new Queue();

  queue.push(head);

  curEndNode = head;

  while (!queue.isEmpty()) {
    const node = queue.pop();

    if (node.left) {
      queue.push(node.left);
      nextEndNode = node.left;
    }

    if (node.right) {
      queue.push(node.right);
      nextEndNode = node.right;
    }

    curLen++;

    if (node == curEndNode) {
      curEndNode = nextEndNode;
      nextEndNode = null;
      max = Math.max(max, curLen);
      curLen = 0;
    }
  }
  return max;
}

// example usage:

const randomBST = generateRandomBST(5, 100);
printTree(randomBST);
console.log("Max Depth:", maxDepth(randomBST));
