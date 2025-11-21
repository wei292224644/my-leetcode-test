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
 * @return {boolean}
 */
var isBalanced = function (root) {
  if (root == null) return true;

  const getHeight = (node) => {
    if (node === null) return 0;
    const left = getHeight(node.left);
    if (left === -1) return -1;

    const right = getHeight(node.right);
    if (right === -1) return -1;
    if (Math.abs(left - right) > 1) return -1;
    return Math.max(left, right) + 1;
  };

  return getHeight(root) !== -1;
};

//example
const tree1 = new TreeNode(
  3,
  new TreeNode(9),
  new TreeNode(20, new TreeNode(15), new TreeNode(7))
);
console.log(isBalanced(tree1)); // true

const tree2 = new TreeNode(
  1,
  new TreeNode(2, new TreeNode(3, new TreeNode(4), null), null),
  new TreeNode(2, null, new TreeNode(3, null, new TreeNode(4)))
);
console.log(isBalanced(tree2)); // false

const tree3 = null;
console.log(isBalanced(tree3)); // true

const tree4 = new TreeNode();
console.log(isBalanced(tree4)); // true

const tree5 = new TreeNode(
  1,
  new TreeNode(2, new TreeNode(4), new TreeNode(5)),
  new TreeNode(3)
);
console.log(isBalanced(tree5)); // true
