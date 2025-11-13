/**
 * https://leetcode.cn/problems/convert-sorted-array-to-binary-search-tree/
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
 * @param {number[]} nums
 * @return {TreeNode}
 */
var sortedArrayToBST = function (nums) {
  const process = (left, right) => {
    if (left >= right) return null;

    const mid = left + ((right - left) >> 1);
    const node = new TreeNode(nums[mid]);

    node.left = process(left, mid - 1);
    node.right = process(mid + 1, right);
    return node;
  };

  return process(0, nums.length - 1);
};

//example
console.log(sortedArrayToBST([-10, -3, 0, 5, 9])); // [0,-3,9,-10,null,5]
console.log(sortedArrayToBST([1, 3])); // [3,1]
console.log(sortedArrayToBST([0])); // [0]
