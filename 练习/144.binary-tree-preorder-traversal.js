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
var preorderTraversal = function (root) {
  const res = [];

  const process = (node) => {
    if (node == null) return;

    res.push(node.val);
    process(node.left);
    process(node.right);
  };

  process(root);

  return res;
};

// example
const tree1 = new TreeNode(1, null, new TreeNode(2, new TreeNode(3), null));
console.log(preorderTraversal(tree1)); // [1,2,3]

const tree2 = null;
console.log(preorderTraversal(tree2)); // []

const tree3 = new TreeNode();
console.log(preorderTraversal(tree3)); // [0]

const tree4 = new TreeNode(
  1,
  new TreeNode(2, new TreeNode(4), new TreeNode(5)),
  new TreeNode(3)
);
console.log(preorderTraversal(tree4)); // [1,2,4,5,3]

const tree5 = new TreeNode(
  1,
  new TreeNode(2, new TreeNode(3, new TreeNode(4), null), null),
  null
);
console.log(preorderTraversal(tree5)); // [1,2,3,4]
