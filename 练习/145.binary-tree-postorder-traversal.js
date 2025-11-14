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
var postorderTraversal = function (root) {
  const res = [];

  const process = (node) => {
    if (node == null) return null;

    process(node.left);
    process(node.right);

    res.push(node.val);
  };

  process(root);

  return res;
};

// example
const tree1 = new TreeNode(1, null, new TreeNode(2, new TreeNode(3), null));
console.log(postorderTraversal(tree1)); // [3,2,1]

const tree2 = null;
console.log(postorderTraversal(tree2)); // []

const tree3 = new TreeNode();
console.log(postorderTraversal(tree3)); // [0]

const tree4 = new TreeNode(
  1,
  new TreeNode(2, new TreeNode(4), new TreeNode(5)),
  new TreeNode(3)
);
console.log(postorderTraversal(tree4)); // [4,5,2,3,1]

const tree5 = new TreeNode(
  1,
  new TreeNode(2, new TreeNode(3, new TreeNode(4), null), null),
  null
);
console.log(postorderTraversal(tree5)); // [4,3,2,1]
