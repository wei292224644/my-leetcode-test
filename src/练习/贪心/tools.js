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
    if (level > maxLevel || Math.random() < 0.3) {
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

class Queue {
  constructor() {
    this.items = [];
  }

  push(element) {
    this.items.push(element);
  }

  pop() {
    return this.items.shift();
  }
  isEmpty() {
    return this.items.length == 0;
  }

  peek() {
    return this.items[0];
  }
}

class Stack {
  constructor() {
    this.items = [];
  }

  push(element) {
    this.items.push(element);
  }

  pop() {
    return this.items.pop();
  }

  isEmpty() {
    return this.items.length == 0;
  }

  peek() {
    return this.items[this.items.length - 1];
  }
}

class Heap {
  constructor(comparator) {
    this.heap = [];
    this.heapSize = 0;
    this.comparator = comparator || ((a, b) => b - a);
  }

  _swap(a, b) {
    const temp = this.heap[a];
    this.heap[a] = this.heap[b];
    this.heap[b] = temp;
  }

  add(value) {
    this.heap[this.heapSize] = value;
    this.heapInsert(this.heapSize++);
  }

  addAll(values) {
    this.heap.push(...values);
    this.heapSize += values.length;

    for (let i = (this.heapSize - 2) >> 1; i >= 0; i--) {
      this.heapify(i);
    }
  }
  pop() {
    const first = this.heap[0];

    this._swap(0, --this.heapSize);
    this.heapify(0);
    return first;
  }

  isEmpty() {
    return this.heapSize == 0;
  }

  heapInsert(index) {
    let parent = (index - 1) >> 1;

    while (
      parent >= 0 &&
      this.comparator(this.heap[index], this.heap[parent]) < 0
    ) {
      this._swap(index, parent);
      index = parent;
      parent = (index - 1) >> 1;
    }
  }

  heapify(index) {
    let left = index * 2 + 1;

    while (left < this.heapSize) {
      let largest =
        left + 1 < this.heapSize &&
        this.comparator(this.heap[left + 1], this.heap[left]) < 0
          ? left + 1
          : left;

      largest =
        this.comparator(this.heap[largest], this.heap[index]) < 0
          ? largest
          : index;

      if (largest == index) {
        break;
      }
      this._swap(largest, index);
      index = largest;
      left = index * 2 + 1;
    }
  }

  peek() {
    return this.heap[0];
  }

  size() {
    return this.heapSize;
  }
}

export { generateRandomBST, printTree, TreeNode, Queue, Stack, Heap };
