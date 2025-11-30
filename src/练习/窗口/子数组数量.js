//给定一个整型数组 arr,和一个整数 num
//某个 arr 中的子数组 sub，如果想达标，必须满足：
//
// max(sub) - min(sub) <= num
//
// 返回 arr 中达标子数组的数量
//
// 例如：
//arr = [4,3,5,4,3,3,6,7],num = 5

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

function countSubarrays(arr, num) {
  if (arr == null || arr.length == 0 || num < 0) {
    return 0;
  }

  const maxDeque = new Deque();
  const minDeque = new Deque();

  let N = arr.length;
  let R = 0;
  let count = 0;

  for (let L = 0; L < N; L++) {
    while (R < N) {
      //检测最大双端队列中是否有小于当前值的元素，有则弹出
      while (!maxDeque.isEmpty() && arr[maxDeque.peekLast()] <= arr[R]) {
        maxDeque.popLast();
      }
      maxDeque.addLast(R);

      //检测最小双端队列中是否有大于当前值的元素，有则弹出
      while (!minDeque.isEmpty() && arr[minDeque.peekLast()] >= arr[R]) {
        minDeque.popLast();
      }
      minDeque.addLast(R);

      //检测当前窗口的最大值和最小值是否符合要求，如果满足则继续扩大右边界，如果不满足则停止扩大
      if (arr[maxDeque.peekFirst()] - arr[minDeque.peekFirst()] > num) {
        break;
      } else {
        R++;
      }
    }

    count += R - L;
    if (maxDeque.peekFirst() == L) {
      maxDeque.popFirst();
    }
    if (minDeque.peekFirst() == L) {
      minDeque.popFirst();
    }
  }
  return count;
}

//暴力解
function countSubarrays1(arr, num) {
  if (arr == null || arr.length == 0 || num < 0) {
    return 0;
  }
  let count = 0;

  for (let L = 0; L < arr.length; L++) {
    for (let R = L; R < arr.length; R++) {
      let max = -Infinity;
      let min = Infinity;
      for (let i = L; i <= R; i++) {
        max = Math.max(max, arr[i]);
        min = Math.min(min, arr[i]);
      }
      if (max - min <= num) {
        count++;
      }
    }
  }
  return count;
}

//example usage:
console.log(countSubarrays([4, 3, 5, 4, 3, 3, 6, 7], 2)); //36
console.log(countSubarrays1([4, 3, 5, 4, 3, 3, 6, 7], 2)); //36
