class TreeNode {
  constructor(val, left = null, right = null, parent = null) {
    this.val = val;
    this.left = left;
    this.right = right;
    this.parent = parent;
  }
}

//找到某个节点的后继节点：
// 中序遍历序列中的下一个节点称为该节点的后继节点。
//当前节点有右子树时，后继节点是右子树的最左节点；
//当前节点无右子树时，后继节点是第一个左连接的祖先节点。

function findSuccessor(node) {
  if (node == null) return null;

  if (node.right !== null) {
    // 情况一：有右子树, 后继节点是右子树的最左节点
    let cur = node.right;
    while (cur.left !== null) {
      cur = cur.left;
    }
    return cur;
  }
  // 情况二：无右子树, 后继节点是第一个左连接的祖先节点
  let parent = node.parent;
  // 如果当前节点是父节点的右子节点，则继续往上找，直到找到一个节点是其父节点的左子节点或者到达根节点
  while (parent !== null && parent.right === node) {
    node = parent;
    parent = node.parent;
  }
  return parent;

  // if (node == null) return null;
  // const getLeftMost = (n) => {
  //   if (n == null) return null;
  //   while (n.left !== null) {
  //     n = n.left;
  //   }
  //   return n;
  // };
  // if (node.right !== null) {
  //   // 情况一：有右子树, 后继节点是右子树的最左节点
  //   return getLeftMost(node.right);
  // }
  // // 情况二：无右子树, 后继节点是第一个左连接的祖先节点
  // let parent = node.parent;
  // while (parent !== null && parent.right === node) {
  //   node = parent;
  //   parent = node.parent;
  // }
  // return parent;
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
