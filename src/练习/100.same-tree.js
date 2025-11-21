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
 * @param {TreeNode} p
 * @param {TreeNode} q
 * @return {boolean}
 */
var isSameTree = function (p, q) {
  if (p == null && q == null) return true;
  if (p == null || q == null) return false;
  if (p.val !== q.val) return false;

  return isSameTree(p.left, q.left) && isSameTree(p.right, q.right);
};

// example
const tree1 = new TreeNode(1, new TreeNode(2), new TreeNode(3));
const tree2 = new TreeNode(1, new TreeNode(2), new TreeNode(3));
console.log(isSameTree(tree1, tree2)); // true

const tree3 = new TreeNode(1, new TreeNode(2), null);
const tree4 = new TreeNode(1, null, new TreeNode(2));
console.log(isSameTree(tree3, tree4)); // false

const tree5 = new TreeNode(1, new TreeNode(2), new TreeNode(1));
const tree6 = new TreeNode(1, new TreeNode(1), new TreeNode(2));
console.log(isSameTree(tree5, tree6)); // false

const tree7 = null;
const tree8 = null;
console.log(isSameTree(tree7, tree8)); // true

const tree9 = new TreeNode();
const tree10 = new TreeNode();
console.log(isSameTree(tree9, tree10)); // true

const tree11 = new TreeNode(1);
const tree12 = new TreeNode(1);
console.log(isSameTree(tree11, tree12)); // true

const tree13 = new TreeNode(
  1,
  new TreeNode(2, new TreeNode(3), null),
  new TreeNode(4)
);
const tree14 = new TreeNode(
  1,
  new TreeNode(2, new TreeNode(3), null),
  new TreeNode(4)
);
console.log(isSameTree(tree13, tree14)); // true
