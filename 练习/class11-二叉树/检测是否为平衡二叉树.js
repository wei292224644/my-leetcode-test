const { TreeNode, generateRandomBST, printTree } = require("./tools");

class Info {
  constructor(isBalanced, height) {
    this.isBalanced = isBalanced;
    this.height = height;
  }
}

const isBalancedBST = function (root) {
  const process = (node) => {
    if (node == null) {
      return new Info(true, 0);
    }

    const leftInfo = process(node.left);
    const rightInfo = process(node.right);

    const height = Math.max(leftInfo.height, rightInfo.height) + 1;

    const isBalanced =
      leftInfo.isBalanced &&
      rightInfo.isBalanced &&
      Math.abs(leftInfo.height - rightInfo.height) <= 1;

    return new Info(isBalanced, height);
  };

  return process(root).isBalanced;
};

//example

const maxLevel = 4;
const maxValue = 100;
const head = generateRandomBST(maxLevel, maxValue);
printTree(head);
const result = isBalancedBST(head);
console.log(`Is the binary tree balanced? ${result}`);
