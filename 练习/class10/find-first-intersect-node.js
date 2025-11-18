class Node {
  constructor(value, next) {
    this.value = value;
    this.next = next || null;
  }
}

function findFirstIntersectNode(head1, head2) {
  if (!head1 || !head2) return null;

  // 获取链表的入环节点，如果无环则返回null
  const getLoopNode = (node) => {
    if (node == null || node.next == null || node.next.next == null)
      return null;
    let slow = node.next;
    let fast = node.next.next;

    while (slow !== fast) {
      if (fast.next !== null && fast.next.next !== null) {
        return null;
      }

      fast = fast.next.next;
      slow = slow.next;
    }
    fast = node;
    while (fast !== slow) {
      fast = fast.next;
      slow = slow.next;
    }
    return slow;
  };

  // 两个无环链表的相交节点
  const noLoop = (node1, node2) => {
    if (node1 == null || node2 == null) return null;

    let cur1 = node1;
    let cur2 = node2;

    let n = 0;

    while (cur1.next) {
      n++;
      cur1 = cur1.next;
    }

    while (cur2.next) {
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
  };

  // 两个有环链表的相交节点
  const bothLoop = (node1, loop1, node2, loop2) => {
    let cur1 = null;
    let cur2 = null;

    if (loop1 == loop2) {
      cur1 = node1;
      cur2 = node2;
      let n = 0;
      while (cur1.next !== loop1) {
        cur1 = cur1.next;
        n++;
      }

      while (cur2.next !== loop2) {
        cur2 = cur2.next;
        n--;
      }
      if (cur1 !== cur2) return null;

      cur1 = n > 0 ? node1 : node2;
      cur2 = cur1 === node1 ? node2 : node1;

      while (n > 0) {
        cur1 = cur1.next;
        n--;
      }

      while (cur1 !== cur2) {
        cur1 = cur1.next;
        cur2 = cur2.next;
      }

      return cur1;
    } else {
      cur1 = loop1.next;

      while (cur1 !== loop1) {
        if (cur1 == loop2) {
          return loop1;
        }
        cur1 = cur1.next;
      }

      return null;
    }
  };

  const loop1 = getLoopNode(head1);
  const loop2 = getLoopNode(head2);

  if (loop1 == null && loop2 == null) {
    return noLoop(head1, head2);
  } else if (loop1 !== null && loop2 !== null) {
    return bothLoop(head1, loop1, head2, loop2);
  }

  return null;
}

//example
let a1 = new Node(1);
let a2 = new Node(2);
let a3 = new Node(3);
let c1 = new Node(6);
let c2 = new Node(7);
let c3 = new Node(8);
a1.next = a2;
a2.next = a3;
a3.next = c1;
c1.next = c2;
c2.next = c3;

let b1 = new Node(4);
let b2 = new Node(5);
b1.next = b2;
b2.next = c1;

console.log(findFirstIntersectNode(a1, b1)); // should return node with value 6

a1 = new Node(1);
a2 = new Node(2);
a3 = new Node(3);
c1 = new Node(6);
c2 = new Node(7);
c3 = new Node(8);
a1.next = a2;
a2.next = a3;
a3.next = c1;
c1.next = c2;
c2.next = c3;

b1 = new Node(4);
b2 = new Node(5);
b1.next = b2;

console.log(findFirstIntersectNode(a1, b1)); // should return null

a1 = new Node(1);
a2 = new Node(2);
a3 = new Node(3);
c1 = new Node(6);
c2 = new Node(7);
c3 = new Node(8);
a1.next = a2;
a2.next = a3;
a3.next = c1;
c1.next = c2;
c2.next = c3;

b1 = c2;

console.log(findFirstIntersectNode(a1, b1)); // should return node with value 7
