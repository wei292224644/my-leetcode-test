// 完全二叉树：每一层节点数都达到最大值，除了最后一层，最后一层节点都集中在左侧

const { TreeNode, generateRandomBST, printTree, Queue } = require("./tools");

class Info {
  constructor(isFull, isCBT, height) {
    this.isFull = isFull;
    this.isCBT = isCBT;
    this.height = height;
  }
}

const isCompleteBinaryTree = (root) => {
  if (root == null) return true;

  const process = (node) => {
    if (node == null) {
      return new Info(true, true, 0);
    }

    const leftInfo = process(node.left);
    const rightInfo = process(node.right);

    const height = Math.max(leftInfo.height, rightInfo.height) + 1;

    const isFull =
      leftInfo.isFull &&
      rightInfo.isFull &&
      leftInfo.height == rightInfo.height;

    let isCBT = false;

    if (isFull) {
      isCBT = true;
    } else {
      if (
        leftInfo.isCBT &&
        rightInfo.isFull &&
        leftInfo.height == rightInfo.height + 1
      ) {
        isCBT = true;
      } else if (
        leftInfo.isFull &&
        rightInfo.isFull &&
        leftInfo.height == rightInfo.height + 1
      ) {
        isCBT = true;
      } else if (
        leftInfo.isFull &&
        rightInfo.isCBT &&
        leftInfo.height == rightInfo.height
      ) {
        isCBT = true;
      }
    }
    return new Info(isFull, isCBT, height);
  };

  return process(root).isCBT;
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
