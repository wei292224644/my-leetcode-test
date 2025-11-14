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
 * @param {number} val
 * @return {ListNode}
 */
var removeElements = function (head, val) {
  //   let first = new ListNode(-1);
  //   let current = first;
  //   while (head) {
  //     if (head.val !== val) {
  //       current.next = head;
  //       current = current.next;
  //     }
  //     head = head.next;
  //   }
  //   current.next = null;
  //   return first.next;

  if (head == null) return null;
  head.next = removeElements(head.next, val);
  return head.val == val ? head.next : head;
};

// Example usage:

console.log(
  removeElements(
    new ListNode(
      1,
      new ListNode(
        2,
        new ListNode(
          6,
          new ListNode(3, new ListNode(4, new ListNode(5, new ListNode(6))))
        )
      )
    ),
    6
  )
); // [1,2,3,4,5]
console.log(removeElements([], 1)); // []
console.log(
  removeElements(
    new ListNode(7, new ListNode(7, new ListNode(7, new ListNode(7)))),
    7
  )
); // []
console.log(
  removeElements(
    new ListNode(
      1,
      new ListNode(2, new ListNode(3, new ListNode(4, new ListNode(5))))
    ),
    3
  )
); // [1,2,4,5]
console.log(
  removeElements(new ListNode(1, new ListNode(1, new ListNode(1))), 1)
); // []
