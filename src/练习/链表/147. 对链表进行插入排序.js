/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */

function ListNode(val, next) {
  this.val = val === undefined ? 0 : val;
  this.next = next === undefined ? null : next;
}

/**
 * @param {ListNode} head
 * @return {ListNode}
 */
var insertionSortList = function (head) {
  if (!head || !head.next) return head;

  const dummy = new ListNode(0);
  dummy.next = head;

  let tail = head;

  while (tail.next) {
    const cur = tail.next;

    if (cur.val >= tail.val) {
      tail = tail.next;
      continue;
    }
    tail.next = cur.next;
    let p = dummy;
    while (p.next.val < cur.val) {
      p = p.next;
    }
    cur.next = p.next;
    p.next = cur;
  }

  return dummy.next;
};

//example
const head = new ListNode(4);
head.next = new ListNode(2);
head.next.next = new ListNode(1);
head.next.next.next = new ListNode(3);

console.log(insertionSortList(head)); // [1,2,3,4]

// const head2 = new ListNode(-1);
// head2.next = new ListNode(5);
// head2.next.next = new ListNode(3);
// head2.next.next.next = new ListNode(4);
// head2.next.next.next.next = new ListNode(0);

// console.log(insertionSortList(head2)); // [-1,0,3,4,5]
