import { Node_ } from "./graph";

class Heap {
  constructor(comparator) {
    this.items = [];
    this.heapSize = 0;
    this.indexMap = new Map();
    this.comparator = comparator || ((a, b) => a - b);
  }

  _swap(i, j) {
    const temp = this.items[i];
    this.items[i] = this.items[j];
    this.items[j] = temp;

    this.indexMap.set(this.items[i], i);
    this.indexMap.set(this.items[j], j);
  }

  push(item) {
    this.items.push(item);
    this.indexMap.set(item, this.heapSize);
    this._heapInsert(this.heapSize++);
  }

  pop() {
    const first = this.items[0];
    this.indexMap.delete(first);
    this._swap(0, --this.heapSize);
    this.items.pop();
    this._heapify(0);
    return first;
  }

  update(item) {
    const index = this.indexMap.get(item);
    if (index === undefined) return;

    this._heapInsert(index);
    this._heapify(index);
  }

  isEmpty() {
    return this.heapSize === 0;
  }

  _heapInsert(index) {
    let parent = (index - 1) >> 1;

    while (
      parent >= 0 &&
      this.comparator(this.items[index], this.items[parent]) < 0
    ) {
      this._swap(index, parent);
      index = parent;
      parent = (index - 1) >> 1;
    }
  }

  _heapify(index) {
    let left = (index << 1) + 1;

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

      if (largest === index) break;

      this._swap(index, largest);
      index = largest;
      left = (index << 1) + 1;
    }
  }
}

/**
 * Dijkstra算法
 * @description 计算从起点到所有其他节点的最短路径
 * @param {Node_} from 起点节点
 * @returns {Map<Node_, number>} 返回一个映射，键为节点，值为从起点到该节点的最小距离
 * @example
 * @param {Node_} from
 */
const dijkstra = (from) => {
  //返回最小距离节点
  const heap = new Heap();
  heap.push(from);

  while (!heap.isEmpty()) {
    const node = heap.pop();

    for (const edge of node.edges) {
      const toNode = edge.to;
      const newDistance = node.distance + edge.weight;

      if(newDistance< toNode.distance){
        
      }
    }
  }

  return distanceMap;
};
