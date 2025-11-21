/**
 * // Definition for a _Node.
 * function _Node(val,children) {
 *    this.val = val === undefined ? null : val;
 *    this.children = children === undefined ? null : children;
 * };
 */

function _Node(val, children) {
  this.val = val === undefined ? null : val;
  this.children = children === undefined ? [] : children;
}

/**
 * @param {_Node|null} root
 * @return {number}
 */
var maxDepth = function (root) {
  if (root == null) return 0;

  let max = 0;

  for (const children of root.children) {
    max = Math.max(max, maxDepth(children));
  }

  return max + 1;
};

// example
const root = new _Node(1, [
  new _Node(3, [new _Node(5), new _Node(6)]),
  new _Node(2),
  new _Node(4),
]);

console.log(maxDepth(root)); // 3
