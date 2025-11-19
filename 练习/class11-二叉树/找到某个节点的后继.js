class TreeNode {
  constructor(val, left = null, right = null, parent = null) {
    this.val = val;
    this.left = left;
    this.right = right;
    this.parent = parent;
  }
}

function findSuccessor(node) {
  if (node == null) return null;

  const getLeftMost = (n) => {
    if (n == null) return null;
    while (n.left !== null) {
      n = n.left;
    }
    return n;
  };

  if (node.right !== null) {
    // 情况一：有右子树, 后继节点是右子树的最左节点
    return getLeftMost(node.right);
  }
  // 情况二：无右子树, 后继节点是第一个左连接的祖先节点
  let parent = node.parent;
  while (parent !== null && parent.right === node) {
    node = parent;
    parent = node.parent;
  }
  return parent;
}

//example
const head = new TreeNode(1);
head.left = new TreeNode(2, null, null, head);
head.right = new TreeNode(3, null, null, head);
head.left.left = new TreeNode(4, null, null, head.left);
head.left.right = new TreeNode(5, null, null, head.left);
head.right.left = new TreeNode(6, null, null, head.right);
head.right.right = new TreeNode(7, null, null, head.right);

console.log(findSuccessor(head.left.right).val); // 1
