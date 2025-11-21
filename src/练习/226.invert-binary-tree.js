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
 * @return {TreeNode}
 */
var invertTree = function (root) {
  if (root == null) return null;

  const invertTree = (node) => {
    if (node == null) return;

    // let left = invertTree(node.right);
    // let right = invertTree(node.left);

    // root.right = left;
    // root.left = right;

    let left = node.left;
    let right = node.right;

    node.right = left;
    node.left = right;

    invertTree(node.left);
    invertTree(node.right);
  };

  invertTree(root);

  return root;
};

// Example usage:
console.log(
  invertTree(
    new TreeNode(
      4,
      new TreeNode(2, new TreeNode(1), new TreeNode(3)),
      new TreeNode(7, new TreeNode(6), new TreeNode(9))
    )
  )
); // [4,7,2,9,6,3,1]
console.log(invertTree(new TreeNode(2, new TreeNode(1), new TreeNode(3)))); // [2,3,1]
console.log(invertTree(null)); // null
console.log(invertTree(new TreeNode(1))); // [1]
console.log(
  invertTree(
    new TreeNode(
      1,
      new TreeNode(2, new TreeNode(4), new TreeNode(5)),
      new TreeNode(3, new TreeNode(6), new TreeNode(7))
    )
  )
); // [1,3,2,7,6,5,4]
