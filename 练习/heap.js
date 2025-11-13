/**
 * 最小堆实现
 */
class MinHeap {
  constructor(compose) {
    this.heap = [];
    this.heapSize = 0;

    this.compose = compose || ((a, b) => b - a);
  }

  _swap(a, b) {
    const temp = this.heap[a];
    this.heap[a] = this.heap[b];
    this.heap[b] = temp;
  }

  add(value) {
    this.heap[this.heapSize] = value;

    this.heapInsert(this.heapSize++);
  }

  addAll(values) {
    this.heap.push(...values);
    this.heapSize += values.length;

    for (let i = this.heapSize; i >= 0; i--) {
      this.heapify(i);
    }
  }

  length() {
    return this.heapSize;
  }

  pop() {
    const first = this.heap[0];

    this._swap(0, --this.heapSize);
    this.heapify(0);
    return first;
  }
  isEmpty() {
    return this.heapSize == 0;
  }
  peek() {
    return this.heap[0];
  }

  heapify(index) {
    let left = index * 2 + 1;

    while (left < this.heapSize) {
      let largest =
        left + 1 < this.heapSize &&
        this.compose(this.heap[left + 1], this.heap[left]) > 0
          ? left + 1
          : left;

      largest =
        this.compose(this.heap[largest], this.heap[index]) > 0
          ? largest
          : index;

      if (largest == index) {
        break;
      }

      this._swap(largest, index);
      index = largest;
      left = index * 2 + 1;
    }
  }

  heapInsert(index) {
    let parent = (index - 1) >> 1;

    while (this.compose(this.heap[index], this.heap[parent]) > 0) {
      this._swap(index, parent);
      index = parent;
      parent = (index - 1) >> 1;
    }
  }

  getAll() {
    return this.heap.slice(0, this.heapSize);
  }
}

class MaxHeap {
  constructor() {
    this.heap = [];
    this.heapSize = 0;
  }

  _swap(a, b) {
    const temp = this.heap[a];
    this.heap[a] = this.heap[b];
    this.heap[b] = temp;
  }

  add(value) {
    this.heap[this.heapSize] = value;
    this.heapInsert(this.heapSize++);
  }

  addAll(values) {
    this.heap.push(...values);
    this.heapSize += values.length - 1;

    for (let i = this.heapSize; i >= 0; i--) {
      this.heapify(i);
    }
  }

  isEmpty() {
    return this.heapSize > 0;
  }

  peek() {
    return this.heap[0];
  }

  pop() {
    const first = this.peek();

    this._swap(0, --this.heapSize);
    this.heapify(0);

    return first;
  }

  heapify(index) {
    let left = index * 2 + 1;

    while (left < this.heapSize) {
      let largest =
        left + 1 < this.heapSize && this.heap[left + 1] > this.heap[left]
          ? left + 1
          : left;

      largest = this.heap[largest] > this.heap[index] ? largest : index;

      if (largest == index) break;

      this._swap(index, largest);
      index = largest;
      left = index * 2 + 1;
    }
  }

  heapInsert(index) {
    let parent = (index - 1) >> 1;
    while (this.heap[index] > this.heap[parent]) {
      this._swap(index, parent);
      index = parent;
      parent = (index - 1) >> 1;
    }
  }
}

const heapSort = (arr) => {
  if (arr == null || arr.length < 2) {
    return;
  }
  const heap = new MinHeap();
  //O(N*logN)
  // for (let i = 0; i < arr.length; i++) {
  //   heap.add(arr[i]);
  // }

  // O(N)
  heap.addAll(arr);

  console.log(heap.heap);

  let heapSize = heap.heapSize;

  let index = 0;
  while (heapSize > 0) {
    arr[index] = heap.pop();
    index++;
    heapSize--;
  }

  return arr;
};

const arr = [2, 3, 1, 4, 6, 2, 9, 2];
console.log(heapSort(arr));

/**
 * 给定很多线段，每个线段都是两个数组[start,end]
 * 表示线段开始位置和结束位置，左右都是闭合区间
 * 规定：
 * 1) 线段的开始和结束位置一定都是整数值
 * 2) 线段重合区域的长度必须>=1
 * 返回线段最多重合区域中，包含了几条线段
 */

const func1 = (arr) => {
  let min = Number.MAX_SAFE_INTEGER;
  let max = Number.MIN_SAFE_INTEGER;

  for (let i = 0; i < arr.length; i++) {
    min = Math.min(arr[i][0], min);
    max = Math.max(arr[i][1], max);
  }

  let ans = 0;

  for (let i = min + 0.5; i < max; i++) {
    let cur = 0;

    for (let j = 0; j < arr.length; j++) {
      if (arr[j][0] < i && arr[j][1] > i) {
        cur++;
      }
    }
    ans = Math.max(ans, cur);
  }

  return ans;
};

const func2 = (arr) => {
  const heap = new MinHeap((a, b) => b[0] - a[0]);

  heap.addAll(arr);

  //sort
  let heapSize = heap.heapSize;
  let index = 0;
  while (heapSize > 0) {
    arr[index] = heap.pop();
    index++;
    heapSize--;
  }

  console.log(arr);
  let ans = 0;
  const endHeap = new MinHeap();
  for (let i = 0; i < arr.length; i++) {
    const [start, end] = arr[i];

    while (endHeap.peek() <= start) {
      endHeap.pop();
    }
    endHeap.add(end);

    ans = Math.max(ans, endHeap.length());
  }
  return ans;
};

const arr1 = [
  [1, 7],
  [2, 6],
  [3, 5],
  [4, 8],
  [5, 9],
  [10, 15],
  [5, 6],
  [5, 7],
  [3, 4],
  [16, 17],
  [3, 16],
];
console.log(func1(arr1));
console.log(func2(arr1));
