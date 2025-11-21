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
var isSymmetric = function (root) {
  const check = (left, right) => {
    if (!left && !right) return true;
    if (!left || !right) return false;

    return (
      left.val == right.val &&
      check(left.left, right.right) &&
      check(left.right, right.left)
    );
  };
  if (root == null) return true;
  return check(root.left, root.right);
};

//example
const tree1 = new TreeNode(
  1,
  new TreeNode(2, new TreeNode(3), new TreeNode(4)),
  new TreeNode(2, new TreeNode(4), new TreeNode(3))
);
console.log(isSymmetric(tree1)); // true

const tree2 = new TreeNode(
  1,
  new TreeNode(2, null, new TreeNode(3)),
  new TreeNode(2, null, new TreeNode(3))
);
console.log(isSymmetric(tree2)); // false

const tree3 = null;
console.log(isSymmetric(tree3)); // true

const tree4 = new TreeNode();
console.log(isSymmetric(tree4)); // true

const tree5 = new TreeNode(1, new TreeNode(2), new TreeNode(2));
console.log(isSymmetric(tree5)); // true

const tree6 = new TreeNode(
  1,
  new TreeNode(2, new TreeNode(3), null),
  new TreeNode(2, null, new TreeNode(3))
);
console.log(isSymmetric(tree6)); // true
