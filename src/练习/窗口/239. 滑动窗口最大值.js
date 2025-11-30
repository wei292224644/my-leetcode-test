//leetcode:https://leetcode.cn/problems/sliding-window-maximum/

// 双端队列实现
class Deque {
  constructor() {
    this.items = [];
  }
  size() {
    return this.items.length;
  }

  addLast(item) {
    this.items.push(item);
  }
  addFirst(item) {
    this.items.unshift(item);
  }

  popLast(item) {
    return this.items.pop();
  }

  popFirst() {
    return this.items.shift();
  }

  peekFirst() {
    return this.items[0];
  }
  peekLast() {
    return this.items[this.items.length - 1];
  }

  isEmpty() {
    return this.items.length == 0;
  }
}

/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number[]}
 */
var maxSlidingWindow = function (nums, k) {
  const deque = new Deque();

  const result = [];
  for (let R = 0; R < nums.length; R++) {
    while (!deque.isEmpty() && nums[R] > nums[deque.peekLast()]) {
      deque.popLast();
    }
    deque.addLast(R);

    if (deque.peekFirst() == R - k) {
      deque.popFirst();
    }

    if (R >= k - 1) {
      result.push(nums[deque.peekFirst()]);
    }
  }

  return result;
};

// example usage:
console.log(maxSlidingWindow([1, 3, -1, -3, 5, 3, 6, 7], 3)); // [3,3,5,5,6,7]
