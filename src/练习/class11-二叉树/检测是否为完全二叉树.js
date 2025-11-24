// 完全二叉树：每一层节点数都达到最大值，除了最后一层，最后一层节点都集中在左侧
// 思路：递归套路
// 1. 定义信息结构体 Info，包含三个属性：isFull（是否为满二叉树）、isCBT（是否为完全二叉树）、height（树的高度）
// 2. 递归函数 process(node) 返回以 node 为根节点的子树的信息 Info
//    - 如果 node 为空，返回 Info(true, true, 0)
//    - 递归获取左子树和右子树的信息 leftInfo 和 rightInfo
//    - 计算当前节点的高度 height = max(leftInfo.height, rightInfo.height) + 1
//    - 判断当前节点是否为满二叉树 isFull
//    - 判断当前节点是否为完全二叉树 isCBT，根据以下条件之一成立即可：
//      a. 左右子树均为满二叉树且高度相等
//      b. 左子树为完全二叉树，右子树为满二叉树，且左子树高度比右子树高度大 1
//      c. 左子树为满二叉树，右子树为满二叉树，且左子树高度比右子树高度大 1
//      d. 左子树为满二叉树，右子树为完全二叉树，且左子树高度等于右子树高度
// 3. 最终返回根节点的 Info.isCBT 即可判断整棵树是否为完全二叉树

const { TreeNode, generateRandomBST, printTree, Queue } = require("./tools");

class Info {
  constructor(isFull, isCBT, height) {
    this.isFull = isFull;
    this.isCBT = isCBT;
    this.height = height;
  }
}

/**
 *
 * @param {TreeNode} root
 * @returns {boolean}
 */
const isCompleteBinaryTree = (root) => {
  if (root == null) return true;

  /**
   *
   * @param {TreeNode} node
   * @returns {Info}
   */
  const process = (node) => {
    if (node == null) {
      return new Info(true, true, 0);
    }

    const leftInfo = process(node.left);
    const rightInfo = process(node.right);

    let isFull = false,
      isCBT = false,
      height = 0;

    height = Math.max(leftInfo.height, rightInfo.height) + 1;

    isFull =
      leftInfo.isFull &&
      rightInfo.isFull &&
      leftInfo.height == rightInfo.height;

    // a. 左右子树均为满二叉树且高度相等
    if (isFull) {
      isCBT = true;
    }
    // b. 左子树为完全二叉树，右子树为满二叉树，且左子树高度比右子树高度大 1
    if (
      leftInfo.isCBT &&
      rightInfo.isFull &&
      leftInfo.height == rightInfo.height + 1
    ) {
      isCBT = true;
    }
    // c. 左子树为满二叉树，右子树为满二叉树，且左子树高度比右子树高度大 1

    if (
      leftInfo.isFull &&
      rightInfo.isFull &&
      leftInfo.height == rightInfo.height + 1
    ) {
      isCBT = true;
    }
    // d. 左子树为满二叉树，右子树为完全二叉树，且左子树高度等于右子树高度

    if (
      leftInfo.isFull &&
      rightInfo.isCBT &&
      leftInfo.height == rightInfo.height
    ) {
      isCBT = true;
    }

    return new Info(isFull, isCBT, height);
  };

  return process(root).isCBT;

  // const process = (node) => {
  //   if (node == null) {
  //     return new Info(true, true, 0);
  //   }

  //   const leftInfo = process(node.left);
  //   const rightInfo = process(node.right);

  //   const height = Math.max(leftInfo.height, rightInfo.height) + 1;

  //   const isFull =
  //     leftInfo.isFull &&
  //     rightInfo.isFull &&
  //     leftInfo.height == rightInfo.height;

  //   let isCBT = false;

  //   if (isFull) {
  //     isCBT = true;
  //   } else {
  //     if (
  //       leftInfo.isCBT &&
  //       rightInfo.isFull &&
  //       leftInfo.height == rightInfo.height + 1
  //     ) {
  //       isCBT = true;
  //     } else if (
  //       leftInfo.isFull &&
  //       rightInfo.isFull &&
  //       leftInfo.height == rightInfo.height + 1
  //     ) {
  //       isCBT = true;
  //     } else if (
  //       leftInfo.isFull &&
  //       rightInfo.isCBT &&
  //       leftInfo.height == rightInfo.height
  //     ) {
  //       isCBT = true;
  //     }
  //   }
  //   return new Info(isFull, isCBT, height);
  // };

  // return process(root).isCBT;
};

//对数器
const isCBTByTraversal = (head) => {
  if (head == null) return true;
  const queue = new Queue();
  let leaf = false;
  let l = null;
  let r = null;
  queue.push(head);
  while (!queue.isEmpty()) {
    const node = queue.pop();
    l = node.left;
    r = node.right;
    if ((leaf && (l !== null || r !== null)) || (l === null && r !== null)) {
      return false;
    }
    if (l !== null) {
      queue.push(l);
    }
    if (r !== null) {
      queue.push(r);
    } else {
      leaf = true;
    }
  }
  return true;
};

//example
const maxLevel = 4;
const maxValue = 100;
const testTimes = 100000;
for (let i = 0; i < testTimes; i++) {
  const head = generateRandomBST(maxLevel, maxValue);
  const res1 = isCompleteBinaryTree(head);
  const res2 = isCBTByTraversal(head);
  if (res1 !== res2) {
    console.log("Oops!");
  }
}
console.log("finish!");
