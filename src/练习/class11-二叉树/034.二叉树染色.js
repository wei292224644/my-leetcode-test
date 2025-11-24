/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
const { TreeNode } = require("./tools");
/**
 * 小扣有一个根结点为 root 的二叉树模型，初始所有结点均为白色，可以用蓝色染料给模型结点染色，模型的每个结点有一个 val 价值。小扣出于美观考虑，希望最后二叉树上每个蓝色相连部分的结点个数不能超过 k 个，求所有染成蓝色的结点价值总和最大是多少？
 * @param {TreeNode} root
 * @param {number} k
 * @return {number}
 */

//TODO 未完成
class Info {
  constructor(flag, max) {
    this.flag = flag; // 当前节点是否染色
    this.max = max; // 当前节点染色的最大价值
  }
}
var maxValue = function (root, k) {
  if (root == null) return 0;
  if (k <= 0) return 0;

  const process = (node) => {
    if (node == null) return new Info(false, 0);

    const leftInfo = process(node.left);
    const rightInfo = process(node.right);
    let max = 0;
    let flag = false;

    max = Math.max(leftInfo.max, rightInfo.max) + node.val;

    //判断当前节点是否可以染色

    return new Info(flag, max);
  };

  return process(root);
};

//example
const node = new TreeNode(5);
node.left = new TreeNode(3);
node.right = new TreeNode(8);
node.left.left = new TreeNode(2);
node.left.right = new TreeNode(4);
node.right.right = new TreeNode(10);

console.log(maxValue(node, 3)); //18
