const { TreeNode, generateRandomBST, printTree } = require("./tools");

// 满二叉树：每个节点要么是叶节点，要么有两个子节点的二叉树。
// 检测所有节点数量是否等于2的高度次方减1。
class Info {
  constructor(nodes, height) {
    this.nodes = nodes;
    this.height = height;
  }
}

const isFullBST = (root) => {
  if (root == null) return true;

  const process = (node) => {
    if (node == null) return new Info(0, 0);

    const leftInfo = process(node.left);
    const rightInfo = process(node.right);

    const height = Math.max(leftInfo.height, rightInfo.height) + 1;
    const nodes = leftInfo.nodes + rightInfo.nodes + 1;

    return new Info(nodes, height);
  };

  const info = process(root);
  return info.nodes === (1 << info.height) - 1;
};

//example
const maxLevel = 4;
const maxValue = 100;
const head = generateRandomBST(maxLevel, maxValue);
printTree(head);
const result = isFullBST(head);
console.log(`Is the binary tree a full binary tree? ${result}`);
