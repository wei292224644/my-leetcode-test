const { printTree } = require("./tools.js");
/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
function TreeNode(val, left = null, right = null) {
  this.val = val;
  this.left = left;
  this.right = right;
}
/**
 * @param {TreeNode} root
 * @return {TreeNode}
 */
var pruneTree = function (root) {
  if (root == null) return null;
  const process = (node) => {
    if (node == null) {
      return null;
    }

    node.left = process(node.left);
    node.right = process(node.right);
    if (node.left == null && node.right == null && node.val == 0) {
      return null;
    }

    return node;
  };

  return process(root);
};

//example
const head = new TreeNode(1);
head.left = new TreeNode(0);
head.right = new TreeNode(1);
head.left.left = new TreeNode(0);
head.left.right = new TreeNode(0);
head.right.left = new TreeNode(0);
head.right.right = new TreeNode(1);

printTree(head);
printTree(pruneTree(head));
