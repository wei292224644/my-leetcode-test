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
var minDepth = function (root) {
  if (root == null) return 0;

  const process = (node) => {
    if (node == null) return Infinity;
    //判断是否含有子节点，如果不再含有子节点执行归操作
    if (node.left == null && node.right == null) return 1;
    return Math.min(process(node.left), process(node.right)) + 1;
  };

  return process(root);
};

//example
const tree1 = new TreeNode(
  3,
  new TreeNode(9),
  new TreeNode(20, new TreeNode(15), new TreeNode(7))
);
console.log(minDepth(tree1)); // 2

const tree2 = new TreeNode(
  2,
  null,
  new TreeNode(
    3,
    null,
    new TreeNode(4, null, new TreeNode(5, null, new TreeNode(6)))
  )
);
console.log(minDepth(tree2)); // 5

const tree3 = null;
console.log(minDepth(tree3)); // 0

const tree4 = new TreeNode();
console.log(minDepth(tree4)); // 1

const tree5 = new TreeNode(
  1,
  new TreeNode(2, new TreeNode(4), new TreeNode(5)),
  new TreeNode(3)
);
console.log(minDepth(tree5)); // 2

const tree6 = new TreeNode(
  1,
  new TreeNode(2, new TreeNode(3, new TreeNode(4), null), null),
  null
);
console.log(minDepth(tree6)); // 4
