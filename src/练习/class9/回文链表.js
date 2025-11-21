function ListNode(val, next) {
  this.val = val === undefined ? 0 : val;
  this.next = next === undefined ? null : next;
}

function isPalindrome(head) {
  if (head === null || head.next === null) return true;

  let n1 = head;
  let n2 = head;
  let n3;

  while (n2.next !== null && n2.next.next !== null) {
    n1 = n1.next;
    n2 = n2.next.next;
  }

  n2 = n1.next;
  n1.next = null;

  while (n2 !== null) {
    n3 = n2.next;
    n2.next = n1;
    n1 = n2;
    n2 = n3;
  }

  n3 = n1;
  n2 = head;

  let res = true;

  while (n2 !== null && n1 !== null) {
    if (n2.val !== n1.val) {
      res = false;
      break;
    }
    n1 = n1.next;
    n2 = n2.next;
  }

  n1 = n3.next;
  n3.next = null;

  while (n1 !== null) {
    n2 = n1.next;
    n1.next = n3;
    n3 = n1;
    n1 = n2;
  }

  return res;
}

// example usage:
const palindromeList = new ListNode(
  1,
  new ListNode(
    2,
    new ListNode(3, new ListNode(3, new ListNode(2, new ListNode(1))))
  )
);
console.log(isPalindrome(palindromeList)); // true

const nonPalindromeList = new ListNode(1, new ListNode(2, new ListNode(3)));
console.log(isPalindrome(nonPalindromeList)); // false

const singleNodeList = new ListNode(1);
console.log(isPalindrome(singleNodeList)); // true

const emptyList = null;
console.log(isPalindrome(emptyList)); // true

const twoNodePalindromeList = new ListNode(1, new ListNode(1));
console.log(isPalindrome(twoNodePalindromeList)); // true

const twoNodeNonPalindromeList = new ListNode(1, new ListNode(2));
console.log(isPalindrome(twoNodeNonPalindromeList)); // false
