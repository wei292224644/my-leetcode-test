/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */

const { TreeNode, printTree } = require("./tools");

//example
// const preorder = [3, 9, 20, 15, 7];
// const inorder = [9, 3, 15, 20, 7];

const node = new TreeNode(3);
node.left = new TreeNode(9);
node.left.right = new TreeNode(4);

node.right = new TreeNode(20);
node.right.left = new TreeNode(15);
node.right.left.left = new TreeNode(14);
node.right.right = new TreeNode(7);

//找到公共祖先3
//在中序遍历中找到3左侧的 即为左子树 右侧的为右子树
// 左侧值为9,4 右侧值为20,15,14,7
//从前序遍历中找到3左子树为9,右子树为20
//在中序遍历中找到9左侧为空 右侧为4
//在中序遍历中找到20的左侧为15,14 右侧为7
//在前序遍历中找到20的左子树为15，右子树为7
//在中序遍历中找到15的左侧为14 右侧为空
//最终构建出整棵树

/**
 * @param {number[]} preorder
 * @param {number[]} inorder
 * @return {TreeNode}
 */
var deduceTree = function (preorder, inorder) {
  const map = new Map();
  for (let i = 0; i < inorder.length; i++) {
    map.set(inorder[i], i);
  }

  const build = (preLeft, preRight, inLeft, inRight) => {
    if (preLeft > preRight || inLeft > inRight) return null;

    const rootVal = preorder[preLeft];
    const root = new TreeNode(rootVal);
    const inRootIdx = map.get(rootVal);
    // 计算左子树的节点数量
    const leftTreeSize = inRootIdx - inLeft;

    root.left = build(
      preLeft + 1,
      preLeft + leftTreeSize,
      inLeft,
      inRootIdx - 1
    );
    root.right = build(
      preLeft + leftTreeSize + 1,
      preRight,
      inRootIdx + 1,
      inRight
    );

    return root;
  };
  return build(0, preorder.length - 1, 0, inorder.length - 1);

  // if (!preorder.length || !inorder.length) return null;

  // // 根节点为前序遍历的第一个节点
  // const rootVal = preorder[0];
  // const root = new TreeNode(rootVal);

  // // 在中序遍历中找到根节点的位置
  // const midIdx = inorder.indexOf(rootVal);

  // // 切分中序遍历的左右子树
  // const leftInorder = inorder.slice(0, midIdx);
  // const rightInorder = inorder.slice(midIdx + 1);

  // // 切分前序遍历的左右子树
  // const leftPreorder = preorder.slice(1, leftInorder.length + 1);
  // const rightPreorder = preorder.slice(leftInorder.length + 1);

  // // 递归构建左右子树
  // root.left = deduceTree(leftPreorder, leftInorder);
  // root.right = deduceTree(rightPreorder, rightInorder);

  // return root;
};

function preOrderTraversal(root) {
  if (!root) return;
  console.log(root.val);
  preOrderTraversal(root.left);
  preOrderTraversal(root.right);
}
function inOrderTraversal(root) {
  if (!root) return;
  inOrderTraversal(root.left);
  console.log(root.val);
  inOrderTraversal(root.right);
}
// console.log(preOrderTraversal(node));
// console.log(inOrderTraversal(node));

// const preorder = [3, 9, 20, 15, 7];
// const inorder = [9, 3, 15, 20, 7];

// const preorder = [1, 2, 3];
// const inorder = [3, 2, 1];

const preorder = [1, 2];
const inorder = [1, 2];

printTree(deduceTree(preorder, inorder));
