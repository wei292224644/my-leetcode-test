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
 * @return {number}
 */
var maxDepth = function (root) {
  const process = (node) => {
    if (node == null) {
      return 0;
    }
    return Math.max(process(node.left), process(node.right)) + 1;
  };

  if (root === null) return 0;
  return process(root);
};

// example
const tree1 = new TreeNode(
  3,
  new TreeNode(9),
  new TreeNode(20, new TreeNode(15), new TreeNode(7))
);
console.log(maxDepth(tree1)); // 3

// const tree2 = new TreeNode(1, null, new TreeNode(2));
// console.log(maxDepth(tree2)); // 2

// const tree3 = null;
// console.log(maxDepth(tree3)); // 0

// const tree4 = new TreeNode();
// console.log(maxDepth(tree4)); // 1

// const tree5 = new TreeNode(
//   1,
//   new TreeNode(2, new TreeNode(4), new TreeNode(5)),
//   new TreeNode(3)
// );
// console.log(maxDepth(tree5)); // 3

// const tree6 = new TreeNode(
//   1,
//   new TreeNode(2, new TreeNode(3, new TreeNode(4), null), null),
//   null
// );
// console.log(maxDepth(tree6)); // 4
