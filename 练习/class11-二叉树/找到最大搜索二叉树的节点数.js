const { TreeNode, generateRandomBST, printTree } = require("./tools");

//找到最大搜索二叉树的节点数



class Info {
  constructor(maxBSTSubtreeSize, min, max, allSize) {
    this.min = min;
    this.max = max;
    this.allSize = allSize;
    this.maxBSTSubtreeSize = maxBSTSubtreeSize;
  }
}

const largestBSTSubtree = (root) => {
  if (root === null) return 0;

  const process = (node) => {
    if (node == null) return new Info(0, Infinity, -Infinity, 0);

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

    if (leftIsBST && rightIsBST) {
      maxBSTSubtreeSize = leftInfo.allSize + rightInfo.allSize + 1;
    }

    maxBSTSubtreeSize = Math.max(
      leftInfo.maxBSTSubtreeSize,
      rightInfo.maxBSTSubtreeSize,
      maxBSTSubtreeSize
    );

    return new Info(maxBSTSubtreeSize, min, max, allSize);
  };

  return process(root).maxBSTSubtreeSize;
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

const maxLevel = 4;
const maxValue = 100;
const node1 = generateRandomBST(maxLevel, maxValue);

printTree(node1);
const result = largestBSTSubtree(node1);
console.log(
  `The size of the largest search binary subtree in the binary tree is: ${result}`
);

const result2 = maxBSTSubtreeSize2(node1);
console.log(
  `The size of the largest search binary subtree in the binary tree is: ${result2}`
);
