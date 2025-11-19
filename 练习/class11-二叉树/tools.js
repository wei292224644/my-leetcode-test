class TreeNode {
  constructor(val, left = null, right = null) {
    this.val = val;
    this.left = left;
    this.right = right;
  }
}
/**
 * 随机生成二叉树
 */
function generateRandomBST(maxLevel, maxValue) {
  function generate(level, maxLevel, maxValue) {
    if (level > maxLevel || Math.random() < 0.5) {
      return null;
    }

    const head = new TreeNode(Math.floor(Math.random() * (maxValue + 1)));
    head.left = generate(level + 1, maxLevel, maxValue);
    head.right = generate(level + 1, maxLevel, maxValue);
    return head;
  }

  return generate(1, maxLevel, maxValue);
}

function printTree(head) {
  console.log("Binary Tree:");
  printInOrder(head, 0, "H", 17);
  console.log("\n");
}

function printInOrder(head, height, to, len) {
  if (head == null) {
    return;
  }

  printInOrder(head.right, height + 1, "v", len);
  let val = to + head.val + to;
  const lenM = val.length;
  const leftLen = Math.floor((len - lenM) / 2);
  const rightLen = len - lenM - leftLen;
  val = " ".repeat(leftLen) + val + " ".repeat(rightLen);
  console.log(" ".repeat(height * len) + val);
  printInOrder(head.left, height + 1, "^", len);
}

export { generateRandomBST, printTree, TreeNode };
