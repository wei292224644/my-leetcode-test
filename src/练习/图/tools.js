class Heap {
  constructor(comparetor) {
    this.items = [];
    this.heapSize = 0;
    this.heapIndexMap = new Map();
    this.comparetor = comparetor || ((a, b) => a - b);
  }

  _swap(ary, a, b) {
    const temp = ary[a];
    ary[a] = ary[b];
    ary[b] = temp;
    this.heapIndexMap.set(ary[a], b);
    this.heapIndexMap.set(ary[b], a);
  }

  add(element) {
    this.items[this.heapSize] = element;
    this.heapIndexMap.set(element, this.heapSize);
    this.heapInsert(this.heapSize++);
  }
  pop() {
    const first = this.items[0];
    this._swap(this.items, 0, --this.heapSize);
    this.heapIndexMap.delete(first);
    this.items.splice(this.heapSize, 1);
    this.heapify(0);
    return first;
  }

  remove(element) {
    const index = this.heapIndexMap.get(element);
    if (index === undefined) return;
    this.heapIndexMap.delete(element);

    this._swap(this.items, index, --this.heapSize);
    this.items.splice(this.heapSize, 1);
    this.resign(index);
  }

  update(element) {
    const index = this.heapIndexMap.get(element);
    if (index === undefined) return;
    this.resign(index);
  }

  resign(index) {
    this.heapInsert(index);
    this.heapify(index);
  }

  heapInsert(index) {
    let parent = (index - 1) >> 1;

    while (
      parent >= 0 &&
      this.comparetor(this.items[index], this.items[parent]) < 0
    ) {
      this._swap(this.items, index, parent);
      index = parent;
      parent = (index - 1) >> 1;
    }
  }

  isEmpty() {
    return this.heapSize == 0;
  }

  heapify(index) {
    let left = index * 2 + 1;
    let right = left + 1;

    while (left < this.heapSize) {
      let largest =
        right < this.heapSize &&
        this.comparetor(this.items[right], this.items[left]) < 0
          ? right
          : left;

      largest =
        this.comparetor(this.items[largest], this.items[index]) < 0
          ? largest
          : index;

      if (largest == index) break;

      this._swap(this.items, largest, index);
      index = largest;
      left = index * 2 + 1;
      right = left + 1;
    }
  }

  isEmpty() {
    return this.heapSize == 0;
  }
}

class Node_ {
  constructor(value) {
    this.value = value;
  }
}

export { Heap };
