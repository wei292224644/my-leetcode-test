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
var countNodes = function (root) {
  if (root == null) return 0;

  // 判断完全二叉树最后一层第 k 个节点是否存在
  const exists = (root, level, k) => {
    // bits 用于定位路径上的每一层，从最高位开始
    let bits = 1 << (level - 1);
    let node = root;
    // 遍历路径，直到 bits 为 0 或节点为空
    while (node !== null && bits > 0) {
      // 检查 k 的当前位，决定走左还是右
      if (!(bits & k)) {
        // 当前位为 0，走左子树
        node = node.left;
      } else {
        // 当前位为 1，走右子树
        node = node.right;
      }
      // bits 右移一位，进入下一层
      bits >>= 1;
    }
    // 如果最终 node 不为 null，说明节点存在
    return node !== null;
  };

  let level = 0;
  let node = root;
  while (node.left) {
    level++;
    node = node.left;
  }

  let low = 1 << level,
    high = (1 << (level + 1)) - 1;

  while (low < high) {
    const mid = Math.floor((high - low + 1) / 2) + low;
    // 判断第 mid 个节点是否存在
    if (exists(root, level, mid)) {
      // 存在，说明节点数至少为 mid，继续在右半部分查找
      low = mid;
    } else {
      high = mid - 1;
    }
  }

  return low;
};

// Example usage:
console.log(
  countNodes(
    new TreeNode(
      1,
      new TreeNode(2, new TreeNode(4), new TreeNode(5)),
      new TreeNode(3, new TreeNode(6), null)
    )
  )
); // 6
// console.log(countNodes(null)); // 0
// console.log(countNodes(new TreeNode(1))); // 1
// console.log(
//   countNodes(
//     new TreeNode(
//       1,
//       new TreeNode(2, new TreeNode(4), new TreeNode(5)),
//       new TreeNode(3, new TreeNode(6), new TreeNode(7))
//     )
//   )
// ); // 7
// console.log(
//   countNodes(
//     new TreeNode(
//       1,
//       new TreeNode(
//         2,
//         new TreeNode(4, new TreeNode(8), new TreeNode(9)),
//         new TreeNode(5, new TreeNode(10), null)
//       ),
//       new TreeNode(3, new TreeNode(6), new TreeNode(7))
//     )
//   )
// ); // 10
