/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */

function TreeNode(val, left, right) {
  this.val = val === undefined ? 0 : val;
  this.left = left === undefined ? null : left;
  this.right = right === undefined ? null : right;
}
/**
 * @param {TreeNode} root
 * @return {number[]}
 */
var inorderTraversal = function (root) {
  const res = [];

  const process = (node) => {
    if (node == null) return;

    process(node.left);
    res.push(node.val);
    process(node.right);
  };

  process(root);
  return res;
};

//example
const tree = new TreeNode(1, null, new TreeNode(2, new TreeNode(3), null));
console.log(inorderTraversal(tree)); // [1,3,2]

const tree2 = new TreeNode();
console.log(inorderTraversal(tree2)); // [0]

const tree3 = null;
console.log(inorderTraversal(tree3)); // []

const tree4 = new TreeNode(1);
console.log(inorderTraversal(tree4)); // [1]

const tree5 = new TreeNode(1, new TreeNode(2), new TreeNode(3));
console.log(inorderTraversal(tree5)); // [2,1,3]

const tree6 = new TreeNode(
  1,
  new TreeNode(2, new TreeNode(4), new TreeNode(5)),
  new TreeNode(3)
);
console.log(inorderTraversal(tree6)); // [4,2,5,1,3]
