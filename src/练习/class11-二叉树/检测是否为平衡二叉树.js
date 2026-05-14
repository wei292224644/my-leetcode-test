import { TreeNode, generateRandomBST, printTree } from "./tools.js";

// 平衡二叉树：任意节点的左子树和右子树的高度差不超过1的二叉树。
class Info {
  constructor(isBalanced, height) {
    this.isBalanced = isBalanced;
    this.height = height;
  }
}

/**
 *
 * @param {TreeNode} root
 * @returns {Info}
 */
const isBalancedBST = function (root) {
  /**
   *
   * @param {TreeNode} node
   * @returns
   */
  const process = (node) => {
    if (node == null) return new Info(true, 0);

    const leftInfo = process(node.left);
    const rightInfo = process(node.right);

    const height = leftInfo.height + rightInfo.height + 1;

    const isBalanced =
      leftInfo.isBalanced &&
      rightInfo.isBalanced &&
      Math.abs(leftInfo.height - rightInfo.height) <= 1;

    return new Info(isBalanced, height);
  };

  return process(root).isBalanced;
};

const isBalanceBST = (root) => {
  if (root === null) return true;
  const process = (node) => {
    if (node == null) return new Info(true, 0);

    const leftInfo = process(node.left);
    const rightInfo = process(node.right);

    const isBalanced =
      leftInfo.isBalanced &&
      rightInfo.isBalanced &&
      Math.abs(leftInfo.height - rightInfo.height) <= 1;

    const height = leftInfo.height + rightInfo.height + 1;

    return new Info(isBalanced, height);
  };

  return process(root).isBalanced;
};

//example

const loop = 100000;
let flag = true;
for (let i = 0; i < loop; i++) {
  const maxLevel = 4;
  const maxValue = 100;
  const head = generateRandomBST(maxLevel, maxValue);
  // printTree(head);

  flag = isBalancedBST(head) === isBalanceBST(head);

  if (!flag) {
    console.log("错误");
    break;
  }
}
