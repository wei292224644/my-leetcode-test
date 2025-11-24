const { TreeNode, generateRandomBST, printTree } = require("./tools");

//找到最大搜索二叉树的节点数
// 题目：给定一棵二叉树的头节点head，返回这棵二叉树中最大的搜索二叉子树的节点数。
// 思路：使用后序遍历，遍历过程中获取每个节点的信息
// 搜索二叉树的定义：
// 1. 左子树所有节点值均小于根节点值
// 2. 右子树所有节点值均大于根节点值
// 3. 左右子树均为搜索二叉树

class Info {
  // maxBSTSubtreeSize：以该节点为根节点的子树中，最大搜索二叉子树的节点数
  // min：以该节点为根节点的子树中的最小值
  // max：以该节点为根节点的子树中的最大值
  // allSize：以该节点为根节点的子树的节点总数
  // bstNode：以该节点为根节点的子树中，最大搜索二叉子树的头节点
  constructor(maxBSTSubtreeSize, min, max, allSize, bstNode) {
    this.min = min;
    this.max = max;
    this.allSize = allSize;
    this.maxBSTSubtreeSize = maxBSTSubtreeSize;
    this.bstNode = bstNode;
  }
}

const largestBSTSubtree = (root) => {
  if (root === null) return 0;

  const process = (node) => {
    if (node == null) return new Info(0, Infinity, -Infinity, 0, null);

    const leftInfo = process(node.left);
    const rightInfo = process(node.right);

    const min = Math.min(leftInfo.min, rightInfo.min, node.val);
    const max = Math.max(leftInfo.max, rightInfo.max, node.val);

    const allSize = leftInfo.allSize + rightInfo.allSize + 1;

    let leftIsBST =
      leftInfo.maxBSTSubtreeSize == leftInfo.allSize && leftInfo.max < node.val;

    let rightIsBST =
      rightInfo.maxBSTSubtreeSize == rightInfo.allSize &&
      node.val < rightInfo.min;

    let maxBSTSubtreeSize = -1;
    let bstNode =
      leftInfo.maxBSTSubtreeSize >= rightInfo.maxBSTSubtreeSize
        ? leftInfo.bstNode
        : rightInfo.bstNode;

    if (leftIsBST && rightIsBST) {
      maxBSTSubtreeSize = leftInfo.allSize + rightInfo.allSize + 1;
      bstNode = node;
    }

    maxBSTSubtreeSize = Math.max(
      leftInfo.maxBSTSubtreeSize,
      rightInfo.maxBSTSubtreeSize,
      maxBSTSubtreeSize
    );

    return new Info(maxBSTSubtreeSize, min, max, allSize, bstNode);
  };
  const info = process(root);
  console.log("The root node of the largest BST subtree is:", info.bstNode);
  return info.maxBSTSubtreeSize;
};

//example

const getBSTSize = (node) => {
  if (node == null) return 0;

  const arr = [];

  const inOrder = (n) => {
    if (n == null) return;
    inOrder(n.left);
    arr.push(n.val);
    inOrder(n.right);
  };

  inOrder(node, arr);
  for (let i = 1; i < arr.length; i++) {
    if (arr[i] <= arr[i - 1]) {
      return 0;
    }
  }
  return arr.length;
};
const maxBSTSubtreeSize2 = (node) => {
  if (node == null) return 0;

  const h = getBSTSize(node);

  if (h != 0) return h;
  return Math.max(
    maxBSTSubtreeSize2(node.left),
    maxBSTSubtreeSize2(node.right)
  );
};

// const maxLevel = 4;
// const maxValue = 100;
// const node1 = generateRandomBST(maxLevel, maxValue);

// printTree(node1);
// const result = largestBSTSubtree(node1);
// console.log(
//   `The size of the largest search binary subtree in the binary tree is: ${result}`
// );

// const result2 = maxBSTSubtreeSize2(node1);
// console.log(
//   `The size of the largest search binary subtree in the binary tree is: ${result2}`
// );

const node2 = new TreeNode(4);
node2.left = new TreeNode(3);
node2.left.left = new TreeNode(2);
node2.left.right = new TreeNode(4);
node2.left.left.left = new TreeNode(1);
node2.right = new TreeNode(5);
node2.right.right = new TreeNode(3.5);
node2.right.right.right = new TreeNode(7);
node2.right.right.right.right = new TreeNode(8);

printTree(node2);
const result3 = largestBSTSubtree(node2);
console.log(
  `The size of the largest search binary subtree in the binary tree is: ${result3}`
); //11

const result4 = maxBSTSubtreeSize2(node2);
console.log(
  `The size of the largest search binary subtree in the binary tree is: ${result4}`
); //
