/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */

function ListNode(val, next) {
  this.val = val;
  this.next = next === undefined ? null : next;
}

const getLoopNode = (node) => {
  if (node === null || node.next == null || node.next.next == null) return null;

  let slow = node.next;
  let fast = node.next.next;

  while (slow !== fast) {
    if (fast?.next === null || fast.next?.next === null) return null;

    slow = slow.next;
    fast = fast.next?.next || null;
  }
  fast = node;

  while (slow !== fast) {
    slow = slow.next;
    fast = fast.next;
  }

  return slow;
};

const noLoop = (node1, node2) => {
  if (node1 == null || node2 == null) return null;
  let cur1 = node1;
  let cur2 = node2;

  let n = 0;

  while (cur1.next !== null) {
    n++;
    cur1 = cur1.next;
  }

  while (cur2.next !== null) {
    n--;
    cur2 = cur2.next;
  }

  if (cur1 !== cur2) return null;

  cur1 = n > 0 ? node1 : node2;
  cur2 = cur1 == node1 ? node2 : node1;
  n = Math.abs(n);
  while (n != 0) {
    n--;
    cur1 = cur1.next;
  }

  while (cur1 !== cur2) {
    cur1 = cur1.next;
    cur2 = cur2.next;
  }

  return cur1;
};

const bothLoop = (node1, loop1, node2, loop2) => {
  let cur1 = null;
  let cur2 = null;
  if (loop1 == loop2) {
    cur1 = node1;
    cur2 = node2;
    let n = 0;
    while (cur1.next !== loop1) {
      n++;
      cur1 = cur1.next;
    }

    while (cur2.next !== loop2) {
      n--;
      cur2 = cur2.next;
    }

    if (cur1 !== cur2) return null;

    cur1 = n > 0 ? node1 : node2;
    cur2 = cur1 == node1 ? node2 : node1;
    n = Math.abs(n);

    while (n > 0) {
      n--;
      cur1 = cur1.next;
    }

    while (cur1 !== cur2) {
      cur1 = cur1.next;
      cur2 = cur2.next;
    }
    return cur1;
  } else {
    cur1 = loop1.next;

    while (cur1 !== loop1) {
      if (cur1 == loop2) return cur1;
    }

    return null;
  }
};

/**
 * @param {ListNode} headA
 * @param {ListNode} headB
 * @return {ListNode}
 */
var getIntersectionNode = function (headA, headB) {
  if (headA == null || headB == null) return null;

  const loop1 = getLoopNode(headA);
  const loop2 = getLoopNode(headB);

  if (loop1 == null && loop2 == null) {
    return noLoop(headA, headB);
  } else if (loop1 !== null && loop2 !== null) {
    return bothLoop(headA, loop1, headB, loop2);
  }
  return null;
};

// example usage:
const node1 = new ListNode(1);
const node2 = new ListNode(9);
const node3 = new ListNode(1);
const node4 = new ListNode(2);
const node5 = new ListNode(4);

node1.next = node2;
node2.next = node3;
node3.next = node4;
node4.next = node5;

const headA = node1;

const node6 = new ListNode(3);
node6.next = node4;

const headB = node6;

const intersectionNode = getIntersectionNode(headA, headB);

console.log(intersectionNode ? intersectionNode.val : null); // Output: 2
