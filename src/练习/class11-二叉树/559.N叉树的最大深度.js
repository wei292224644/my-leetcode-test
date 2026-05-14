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

class Info {
  constructor(maxDepth) {
    this.maxDepth = maxDepth;
  }
}

const maxDepth2 = (root) => {
  if (root == null) return 0;
  const process = (node) => {
    if (node == null || node.children.length == 0) return new Info(0);

    let max = 0;
    for (let index = 0; index < node.children.length; index++) {
      max = Math.max(max, process(node.children));
    }

    return new Info(max);
  };

  const result = process(root);

  return result.maxDepth;
};


const root2 = new _Node(1, [
  new _Node(3, [new _Node(5), new _Node(6)]),
  new _Node(2),
  new _Node(4),
]);

console.log(maxDepth(root2)); // 3
