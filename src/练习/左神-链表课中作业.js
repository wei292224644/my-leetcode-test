function ListNode(val, next) {
  this.val = val === undefined ? 0 : val;
  this.next = next === undefined ? null : next;
}

/**
 * 输入链表的头结点 head,奇数长度返回中点，偶数长度返回上中点
 */

function getMiddleOrUpperMiddleNode(head) {
  if (head == null || head.next == null || head.next.next == null) return head;

  let I = head.next;
  let J = head.next?.next;

  while (J?.next != null && J?.next?.next != null) {
    I = I.next;
    J = J?.next?.next;
  }
  return I;
}

/**
 * 输入链表的头结点 head,奇数长度返回中点，偶数长度返回下中点
 */

function getMiddleOrLowerMiddleNode(head) {
  if (head == null || head.next == null) return head;

  let I = head.next;
  let J = head.next;

  while (J?.next != null && J?.next?.next != null) {
    I = I.next;
    J = J?.next?.next;
  }
  return I;
}

/**
 * 输入链表的头结点 head,奇数长度返回中点前一个，偶数长度返回上中点前一个
 */
function getMiddleOrUpperMiddlePreNode(head) {
  if (head == null || head.next == null || head.next.next == null) return null;

  let I = head;
  let J = head.next.next;

  while (J?.next != null && J?.next?.next != null) {
    I = I.next;
    J = J?.next?.next;
  }
  return I;
}

/**
 * 输入链表的头结点 head,奇数长度返回中点前一个，偶数长度返回下中点前一个
 */

function getMiddleOrLowerMiddlePreNode(head) {
  if (head == null || head.next == null) return null;

  let I = head;
  let J = head.next;

  while (J?.next != null && J?.next?.next != null) {
    I = I.next;
    J = J?.next?.next;
  }
  return I;
}

// example
// const list1 = new ListNode(
//   1,
//   new ListNode(2, new ListNode(3, new ListNode(4, new ListNode(5))))
// );
// console.log(getMiddleOrUpperMiddleNode(list1)); // 3
// console.log(getMiddleOrLowerMiddleNode(list1)); // 3
// console.log(getMiddleOrUpperMiddlePreNode(list1)); // 2
// console.log(getMiddleOrLowerMiddlePreNode(list1)); // 2
// console.log("----");

// const list2 = new ListNode(
//   1,
//   new ListNode(
//     2,
//     new ListNode(3, new ListNode(4, new ListNode(5, new ListNode(6))))
//   )
// );
// console.log(getMiddleOrUpperMiddleNode(list2)); // 2
// console.log(getMiddleOrLowerMiddleNode(list2)); // 3
// console.log(getMiddleOrUpperMiddlePreNode(list2)); // 1
// console.log(getMiddleOrLowerMiddlePreNode(list2)); // 2
// console.log("----");

// const list3 = new ListNode(1);
// console.log(getMiddleOrUpperMiddleNode(list3)); // 1
// console.log(getMiddleOrLowerMiddleNode(list3)); // 1
// console.log(getMiddleOrUpperMiddlePreNode(list3)); // null
// console.log(getMiddleOrLowerMiddlePreNode(list3)); // null
// console.log("----");

// const list4 = new ListNode(1, new ListNode(2));
// console.log(getMiddleOrUpperMiddleNode(list4)); // 1
// console.log(getMiddleOrLowerMiddleNode(list4)); // 2
// console.log(getMiddleOrUpperMiddlePreNode(list4)); // null
// console.log(getMiddleOrLowerMiddlePreNode(list4)); // 1

// const list5 = null;
// console.log(getMiddleOrUpperMiddleNode(list5)); // null
// console.log(getMiddleOrLowerMiddleNode(list5)); // null
// console.log(getMiddleOrUpperMiddlePreNode(list5)); // null
// console.log(getMiddleOrLowerMiddlePreNode(list5)); // null

/**
 * 检测是否为回文链表
 */

function isPalindrome(head) {
  if (head == null || head.next == null) return true;

  let n1 = head;
  let n2 = head;

  while (n2.next !== null && n2.next.next !== null) {
    n1 = n1.next;
    n2 = n2.next.next;
  }

  n2 = n1.next;
  n1.next = null;
  let n3;
  while (n2 != null) {
    n3 = n2.next; //保存n2 next节点
    n2.next = n1; //替换n2.next节点为上一个节点
    n1 = n2; //上一个节点更新为当前节点，实现右移
    n2 = n3; //n2实现右移
  }
  n3 = n1; //逆序结果
  n2 = head; // head 已从中间位置断开

  let res = true;

  while (n1 !== null && n2 !== null) {
    if (n1.val !== n2.val) {
      res = false;
      break;
    }
    n1 = n1.next;
    n2 = n2.next;
  }

  // 把之前逆序的结果恢复
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
// const palindromeList = new ListNode(
//   1,
//   new ListNode(
//     2,
//     new ListNode(3, new ListNode(3, new ListNode(2, new ListNode(1))))
//   )
// );
// console.log(isPalindrome(palindromeList)); // true

// const nonPalindromeList = new ListNode(1, new ListNode(2, new ListNode(3)));
// console.log(isPalindrome(nonPalindromeList)); // false

// const singleNodeList = new ListNode(1);
// console.log(isPalindrome(singleNodeList)); // true

// const emptyList = null;
// console.log(isPalindrome(emptyList)); // true

// const twoNodePalindromeList = new ListNode(1, new ListNode(1));
// console.log(isPalindrome(twoNodePalindromeList)); // true

// const twoNodeNonPalindromeList = new ListNode(1, new ListNode(2));
// console.log(isPalindrome(twoNodeNonPalindromeList)); // false

/**
 * 将单向链表按照某值划分为左边小、中间相等、右边大的形式
 */

// 此方法使用的快排的思想进行整体排序（只需要分出小中大即可），然后输出
function SmallerEqualBiggerPartition(head, pivot) {
  if (head == null) return head;

  const partition = (arr, pivot) => {
    let l = -1;
    let r = arr.length;
    let index = 0;

    while (index < r) {
      if (arr[index].val < arr[n].val) {
        swap(arr, index, ++l);
      } else if (arr[index].val == arr[n].val) {
        index++;
      } else {
        swap(arr, index, --r);
      }
    }
  };

  const ary = [];
  let cur = head;
  while (cur) {
    ary.push(cur);
    cur = cur.next;
  }
  partition(arr, pivot);

  for (let i = 1; i < ary.length; i++) {
    ary[i - 1].next = ary[i];
  }
  ary[ary.length - 1].next = null;

  return ary[0];
}

function SmallerEqualBiggerPartition2(head, pivot) {
  if (head == null) return head;

  let sH = null;
  let sT = null;

  let eH = null;
  let eT = null;

  let mH = null;
  let mT = null;

  let cur = head;
  let next = null;

  while (cur !== null) {
    next = cur.next;
    cur.next = null;

    if (cur.val < pivot) {
      if (sH == null) {
        sH = cur;
        sT = cur;
      } else {
        sT.next = cur;
        sT = cur;
      }
    } else if (cur.val == pivot) {
      if (eH == null) {
        eH = cur;
        eT = cur;
      } else {
        eT.next = cur;
        eT = cur;
      }
    } else {
      if (mH == null) {
        mH = cur;
        mT = cur;
      } else {
        mT.next = cur;
        mT = cur;
      }
    }
    cur = next;
  }

  if (sT !== null) {
    sT.next = eH;

    eT = eT == null ? sT : eT;
  }

  if (eT !== null) {
    eT.next = mH;
  }

  return sH !== null ? sH : eH !== null ? eH : mH;
}

// example usage:

// const list = new ListNode(
//   7,
//   new ListNode(
//     9,
//     new ListNode(
//       1,
//       new ListNode(8, new ListNode(5, new ListNode(2, new ListNode(5))))
//     )
//   )
// );
// const pivot = 5;
// console.log(SmallerEqualBiggerPartition2(list, pivot)); // 1->2->5->5->7->9->8

// const list2 = new ListNode(
//   3,
//   new ListNode(5, new ListNode(8, new ListNode(5, new ListNode(10))))
// );
// const pivot2 = 5;
// console.log(SmallerEqualBiggerPartition2(list2, pivot2)); // 3->5->5->8->10

// const list3 = new ListNode(1, new ListNode(2, new ListNode(3)));
// const pivot3 = 0;
// console.log(SmallerEqualBiggerPartition2(list3, pivot3)); // 1->2->3

// const list4 = null;
// const pivot4 = 1;
// console.log(SmallerEqualBiggerPartition2(list4, pivot4)); // null

function ListNodeRandom(val, next, random) {
  this.val = val === undefined ? 0 : val;
  this.next = next === undefined ? null : next;
  this.random = random === undefined ? null : random;
}

/**
 * 复制含有随机指针节点的链表
 */

function copyRandomList(head) {
  if (head == null) return null;

  let cur = head;

  while (cur) {
    let next = cur.next;
    const newNode = new ListNodeRandom(cur.val, next, null);
    cur.next = newNode;
    cur = next;
  }

  cur = head;
  let res;
  while (cur) {
    const oldNode = cur;
    const newNode = cur.next;
    let next = newNode.next;

    if (res == null) {
      res = newNode;
    }

    if (oldNode.random) {
      newNode.random = oldNode.random.next;
    }

    if (newNode.next) {
      newNode.next = newNode.next.next;
    }
    cur = next;
  }

  return res;
}

// example usage:
const node1 = new ListNodeRandom(7);
const node2 = new ListNodeRandom(13);
const node3 = new ListNodeRandom(11);
const node4 = new ListNodeRandom(10);
const node5 = new ListNodeRandom(1);

node1.next = node2;
node1.random = null;

node2.next = node3;
node2.random = node1;

node3.next = node4;
node3.random = node5;

node4.next = node5;
node4.random = node3;

node5.next = null;
node5.random = node1;

const copiedListHead = copyRandomList(node1);
console.log(copiedListHead == node1); // false

console.log("----");
