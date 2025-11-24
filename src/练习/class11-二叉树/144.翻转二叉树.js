/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {TreeNode} root
 * @return {TreeNode}
 */
const { TreeNode, printTree } = require("./tools");
var flipTree = function (root) {
  if (root == null) return null;

  const newNode = new TreeNode(root.val);

  const left = flipTree(root.right);
  const right = flipTree(root.left);

  newNode.left = left;
  newNode.right = right;

  return newNode;
};

//example
const node = new TreeNode(1);
node.left = new TreeNode(2);
node.right = new TreeNode(3);
node.right.left = new TreeNode(4);
node.right.right = new TreeNode(5);

printTree(node);
printTree(flipTree(node));
