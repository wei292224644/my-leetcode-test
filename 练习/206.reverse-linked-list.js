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
var reverseList = function (head) {
  if (head == null) return null;
  let current = head; //1

  let next = head.next; //2

  while (next) {
    let newNext = next.next; //3
    next.next = current; //2->1
    current = next; //2
    next = newNext; // 3
  }

  head.next = null;

  return current;
};

// Example usage:
console.log(
  reverseList(
    new ListNode(
      1,
      new ListNode(2, new ListNode(3, new ListNode(4, new ListNode(5))))
    )
  )
); // [5,4,3,2,1]
console.log(reverseList([])); // []
console.log(reverseList(new ListNode(1))); // [1]
console.log(reverseList(new ListNode(1, new ListNode(2)))); // [2,1]
console.log(
  reverseList(
    new ListNode(
      1,
      new ListNode(
        2,
        new ListNode(3, new ListNode(4, new ListNode(5, new ListNode(6))))
      )
    )
  )
); // [6,5,4,3,2,1]
