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
 * @return {boolean}
 */
var isPalindrome = function (head) {
  const vals = [];

  let current = head;

  while (current) {
    vals.push(current);
    current = current.next;
  }

  for (let i = 0, j = vals.length - 1; i < j; i++, --j) {
    if (vals[i].val !== vals[j].val) {
      return false;
    }
  }

  return true;
};

// Example usage:
console.log(
  isPalindrome(
    new ListNode(1, new ListNode(2, new ListNode(2, new ListNode(1))))
  )
); // true
console.log(isPalindrome(new ListNode(1, new ListNode(2)))); // false
console.log(isPalindrome(new ListNode(1))); // true
console.log(isPalindrome(new ListNode(1, new ListNode(1)))); // true
console.log(
  isPalindrome(
    new ListNode(
      1,
      new ListNode(2, new ListNode(3, new ListNode(2, new ListNode(1))))
    )
  )
); // true
