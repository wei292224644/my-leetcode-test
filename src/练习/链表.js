class Node {
  constructor(value, next) {
    this.value = value;
    this.next = next || null;
  }
}

class DoubleNode {
  constructor(value, next, prev) {
    this.value = value;
    this.next = next || null;
    this.prev = prev || null;
  }
}

//反转链表
const reverseLinkedList = (head) => {
  let cur = head;
  let prev = null;

  while (cur !== null) {
    const next = cur.next;
    cur.next = prev;
    prev = cur;
    cur = next;
  }

  return prev;
};

const removeValue = (head, num) => {
  let first = head;

  while (first !== null) {
    if (first.value === num) {
      first = first.next;
    }
    break;
  }
  
  let cur = first;
  let prev = first;

  while (cur !== null) {
    const next = cur.next;

    if (cur.value !== num) {
      prev.next = cur;
      prev = cur;
    }
    cur = next;
  }

  return first;
};

const node = new Node(
  "2",
  new Node("3", new Node("1", new Node("3", new Node("2", new Node("4")))))
);

// const reverse = reverseLinkedList(node);
// console.log(reverse);

const removed = removeValue(node, "2");
console.log(removed);

// const reverseDoublyList = (head) => {
//   let cur = head;
//   let prev = null;
//   let next = null;

//   while (cur !== null) {
//     next = cur.next;
//     prev = cur.prev;

//     cur.prev = next;

//     if (prev == null) {
//       cur.next = null;
//     } else {
//       cur.next = prev;
//     }
//     prev = cur;
//     cur = next;
//   }

//   return prev;
// };

// const doubleNodeA = new DoubleNode("a", null, null);
// const doubleNodeB = new DoubleNode("b", null, null);
// const doubleNodeC = new DoubleNode("c", null, doubleNodeB);

// doubleNodeA.next = doubleNodeB;

// doubleNodeB.prev = doubleNodeA;
// doubleNodeB.next = doubleNodeC;

// doubleNodeC.prev = doubleNodeB;

// const reverseDouble = reverseDoublyList(doubleNodeA);

// console.log(reverseDouble);
