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
var deleteDuplicates = function (head) {
  let current = head;
  while (current && current.next) {
    if (current.val === current.next.val) {
      current.next = current.next.next;
    } else {
      current = current.next;
    }
  }
  return head;
};

// example
// const list = new ListNode(
//   1,
//   new ListNode(1, new ListNode(2, new ListNode(3, new ListNode(3))))
// );
// console.log(deleteDuplicates(list));
// // Output: [1,2,3]
// const list2 = new ListNode(
//   1,
//   new ListNode(
//     1,
//     new ListNode(2, new ListNode(3, new ListNode(3, new ListNode(4))))
//   )
// );
// console.log(deleteDuplicates(list2));
// Output: [1,2,3,4]

const list3 = new ListNode(1, new ListNode(1, new ListNode(1)));
console.log(deleteDuplicates(list3));
// Output: [1]

const list4 = new ListNode();
console.log(deleteDuplicates(list4));
// Output: []
