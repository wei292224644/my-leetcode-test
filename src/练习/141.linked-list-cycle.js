/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */

function ListNode(val) {
  this.val = val;
  this.next = null;
}

/**
 * @param {ListNode} head
 * @return {boolean}
 */
var hasCycle = function (head) {
  if (head == null) return false;
  const set = new Set();

  let current = head;
  while (current) {
    if (set.has(current)) {
      return true;
    }
    set.add(current);
    current = current.next;
  }
  return false;
};

// example
const node1 = new ListNode(3);
const node2 = new ListNode(2);
const node3 = new ListNode(0);
const node4 = new ListNode(-4);
node1.next = node2;
node2.next = node3;
node3.next = node4;
node4.next = node2; // 创建环

console.log(hasCycle(node1)); // true

const nodeA = new ListNode(1);
const nodeB = new ListNode(2);
nodeA.next = nodeB;

console.log(hasCycle(nodeA)); // false

const nodeX = new ListNode(1);

console.log(hasCycle(nodeX)); // false

const emptyList = null;

console.log(hasCycle(emptyList)); // false

const singleNodeCycle = new ListNode(1);
singleNodeCycle.next = singleNodeCycle;

console.log(hasCycle(singleNodeCycle)); // true
const twoNodeCycle1 = new ListNode(1);
const twoNodeCycle2 = new ListNode(2);
twoNodeCycle1.next = twoNodeCycle2;
twoNodeCycle2.next = twoNodeCycle1;

console.log(hasCycle(twoNodeCycle1)); // true

const twoNodeNoCycle1 = new ListNode(1);
const twoNodeNoCycle2 = new ListNode(2);
twoNodeNoCycle1.next = twoNodeNoCycle2;

console.log(hasCycle(twoNodeNoCycle1)); // false
