const { TreeNode, generateRandomBST, printTree } = require("./tools");

//计算二叉树中两个节点的最大距离
//最大距离定义：二叉树中任意两个节点之间的路径长度的最大值。

class Info {
  constructor(maxDistance, height) {
    this.maxDistance = maxDistance;
    this.height = height;
  }
}

const maxDistance = (root) => {
  if (root == null) return 0;

  const process = (node) => {
    // if (node == null) {
    //   return new Info(0, 0);
    // }
    // const leftInfo = process(node.left);
    // const rightInfo = process(node.right);
    // const height = Math.max(leftInfo.height, rightInfo.height) + 1;
    // const maxDistance = Math.max(
    //   leftInfo.maxDistance,
    //   rightInfo.maxDistance,
    //   leftInfo.height + rightInfo.height + 1
    // );
    // return new Info(maxDistance, height);
  };

  return process(root).maxDistance;
};

//example
const maxLevel = 4;
const maxValue = 100;
const head = generateRandomBST(maxLevel, maxValue);
printTree(head);
const result = maxDistance(head);
console.log(
  `The maximum distance between any two nodes in the binary tree is: ${result}`
);
