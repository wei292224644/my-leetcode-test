const { TreeNode, generateRandomBST, printTree } = require("./tools");

// 搜索二叉树：对于二叉树的每一个节点，其左子树上所有节点的值都小于该节点的值，其右子树上所有节点的值都大于该节点的值。

class Info {
  constructor(isBST, min, max) {
    this.isBST = isBST;
    this.min = min;
    this.max = max;
  }
}
/**
 *
 * @param {TreeNode} root
 * @returns {Info}
 */
const isBST = (root) => {
  if (root == null) return true;

  /**
   *
   * @param {TreeNode} node
   */
  const process = (node) => {
    if (node == null) {
      return new Info(true, Infinity, -Infinity);
    }

    const leftInfo = process(node.left);
    const rightInfo = process(node.right);

    let min = Math.min(leftInfo.min, rightInfo.min, node.val);
    let max = Math.max(leftInfo.max, rightInfo.max, node.val);
    let isBST =
      leftInfo.isBST &&
      rightInfo.isBST &&
      leftInfo.max < node.val &&
      rightInfo.min > node.val;

    return new Info(isBST, min, max);
  };

  return process(root).isBST;

  // const process = (node) => {
  //   if (node == null) {
  //     return new Info(true, Infinity, -Infinity);
  //   }

  //   const leftInfo = process(node.left);
  //   const rightInfo = process(node.right);

  //   const min = Math.min(node.val, leftInfo.min, rightInfo.min);
  //   const max = Math.max(node.val, leftInfo.max, rightInfo.max);

  //   const isBST =
  //     leftInfo.isBST &&
  //     rightInfo.isBST &&
  //     leftInfo.max < node.val &&
  //     rightInfo.min > node.val;

  //   return new Info(isBST, min, max);
  // };

  // return process(root).isBST;
};

//example
const maxLevel = 4;
const maxValue = 100;
const head = generateRandomBST(maxLevel, maxValue);
printTree(head);
const result = isBST(head);
console.log(`Is the binary tree a BST? ${result}`);
