/**
 * @param {number[][]} buildings
 * @return {number[][]}
 */

class MyHeap {
  constructor(comparator) {
    this.items = [];
    this.heapSize = 0;
    this.comparator = comparator || ((a, b) => a - b);
  }

  _swap(arr, i, j) {
    const temp = arr[i];
    arr[i] = arr[j];
    arr[j] = temp;
  }

  pop() {
    const first = this.items[0];
    this._swap(this.items, 0, --this.heapSize);
    this.heapify(0);
    return first;
  }

  addAll(elements) {
    for (let i = 0; i < elements.length; i++) {
      const element = elements[i];

      const a = [element[0], element[2]];
      const b = [element[1], element[2]];
      this.items.push(a);
      this.items.push(b);
    }
    this.heapSize = this.items.length;
    for (let i = this.heapSize; i >= 0; i--) {
      this.heapify(i);
    }
  }

  heapInsert(index) {
    let parent = (index - 1) >> 1;
    while (
      parent >= 0 &&
      this.comparator(this.items[index], this.items[parent]) < 0
    ) {
      this._swap(this.items, index, parent);
      index = parent;
      parent = (index - 1) >> 1;
    }
  }

  heapify(index) {
    let left = index * 2 + 1;

    while (left < this.heapSize) {
      let largest =
        left + 1 < this.heapSize &&
        this.comparator(this.items[left + 1], this.items[left]) < 0
          ? left + 1
          : left;

      largest =
        this.comparator(this.items[largest], this.items[index]) < 0
          ? largest
          : index;

      if (largest == index) break;

      this._swap(this.items, index, largest);
      index = largest;
      left = index * 2 + 1;
    }
  }

  isEmpty() {
    return this.heapSize === 0;
  }
}

var getSkyline = function (buildings) {
  const minHeap = new MyHeap((a, b) => b[1] - a[1] || a[0] - b[0]);

  minHeap.addAll(buildings);

  let res = [];
  let prev;

  while (!minHeap.isEmpty()) {
    const point = minHeap.pop();
    console.log(point);
  }

  return res;
};

// example usage:

console.log(
  getSkyline([
    [2, 9, 10],
    [3, 7, 15],
    [5, 12, 12],
    [15, 20, 10],
    [19, 24, 8],
  ])
); // [[2,10],[3,15],[7,12],[12,0],[15,10],[20,8],[24,0]]
