import { ListNode } from "./tools.js";

/**
 * @param {ListNode} head
 * @return {ListNode}
 */
var sortList = function (head) {
  if (!head || !head.next) return head;

  const arr = [];
  let curr = head;
  while (curr) {
    arr.push(curr);
    curr = curr.next;
  }

  /**
   *
   * @param {ListNode[]} nodes
   * @returns
   */
  const mergeSort = (nodes) => {
    const merge = (l, r, mid) => {
      const helper = [];
      let L = l;
      let R = mid + 1;

      while (L <= mid && R <= r) {
        if (nodes[L].val <= nodes[R].val) {
          helper.push(nodes[L++]);
        } else {
          helper.push(nodes[R++]);
        }
      }

      while (L <= mid) {
        helper.push(nodes[L++]);
      }

      while (R <= r) {
        helper.push(nodes[R++]);
      }
      for (let i = 0; i < helper.length; i++) {
        nodes[l + i] = helper[i];
        nodes[l + i].next = helper[i + 1] || null;
      }
    };

    const process = (l, r) => {
      if (l >= r) return;

      const mid = l + ((r - l) >> 1);
      process(l, mid);
      process(mid + 1, r);
      merge(l, r, mid);
    };

    return process(0, nodes.length - 1);
  };

  mergeSort(arr);
  return arr[0];
};

// example usage:
const head = new ListNode(4);
head.next = new ListNode(2);
head.next.next = new ListNode(1);
head.next.next.next = new ListNode(3);

console.log(sortList(head)); // [1,2,3,4]
