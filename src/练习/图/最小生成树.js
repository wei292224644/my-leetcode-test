const { Graph } = require("./graph");
const { Heap } = require("./tools");

class UnionNode {
  constructor(value) {
    this.value = value;
  }
}

class UnionFind {
  constructor() {
    this.nodes = new Map();
    this.parents = new Map();
    this.sizes = new Map();
  }

  makeSets(values) {
    this.nodes.clear();
    this.parents.clear();
    this.sizes.clear();

    for (const value of values) {
      const node = new UnionNode(value);
      this.nodes.set(value, node);
      this.parents.set(node, node);
      this.sizes.set(node, 1);
    }
  }

  findHead(node) {
    const paths = [];
    while (node !== this.parents.get(node)) {
      paths.push(node);
      node = this.parents.get(node);
    }

    for (const path of paths) {
      this.parents.set(path, node);
    }

    return node;
  }

  union(a, b) {
    const aNode = this.nodes.get(a);
    const bNode = this.nodes.get(b);
    if (!aNode || !bNode) throw new Error("找不到节点a或节点b");

    const aHead = this.findHead(aNode);
    const bHead = this.findHead(bNode);

    if (aHead !== bHead) {
      const aSize = this.sizes.get(aHead);
      const bSize = this.sizes.get(bHead);
      if (aSize >= bSize) {
        this.sizes.set(aHead, aSize + bSize);
        this.parents.set(bHead, aHead);
      } else {
        this.sizes.set(bHead, aSize + bSize);
        this.parents.set(aHead, bHead);
      }
    }
  }

  isSameSet(a, b) {
    const aNode = this.nodes.get(a);
    const bNode = this.nodes.get(b);
    if (!aNode || !bNode) throw new Error("找不到节点a或节点b");
    return this.findHead(aNode) === this.findHead(bNode);
  }
}

/**
 * Kruskal 算法
 * 1）总是从权值最小的边开始考虑，依次考察每一条边是否加入当前的生成树会形成环
 * 2）当前的边要么进入最小生成树的集合，要么丢弃
 * 3）如果当前的边进入最小生成树的集合中不会形成环，则要加入这条边，否则丢弃
 * 4）考察完所有的边之后，最小生成树的集合也得到了
 * @param {Graph} graph
 */
const kruskalMST = (graph) => {
  const unionFind = new UnionFind();
  unionFind.makeSets(graph.nodes.values());

  //   let edges = Array.from(graph.edges);
  //   edges = edges.sort((a, b) => a.weight - b.weight);

  const minHeap = new Heap((a, b) => a.weight - b.weight);
  for (const edge of graph.edges) {
    minHeap.add(edge);
  }

  const result = [];

  //   for (const edge of edges) {
  //     if (!unionFind.isSameSet(edge.from, edge.to)) {
  //       result.push(edge);
  //       unionFind.union(edge.from, edge.to);
  //     }
  //   }

  while (!minHeap.isEmpty()) {
    const edge = minHeap.pop();
    if (!unionFind.isSameSet(edge.from, edge.to)) {
      result.push(edge);
      unionFind.union(edge.from, edge.to);
    }
  }

  return result;
};

/**
 * Prim 算法
 * 1）从任意节点开始，将该节点加入最小生成树集合
 * 2）某个点加入到选取的点中后，解锁该点所有相连的边进入到小根堆中
 * 3）在解锁的边中选择最小的一条边，看看这条边会不会形成环
 * 4）如果会，则丢弃这条边，继续从小根堆中选择下一条边，重复3）
 * 5）如果不会，则将这条边加入到最小生成树集合中，并将该边的另一个点加入到选取的点中，重复2）
 * 6）直到小根堆为空，最小生成树集合也得到了
 * @param {Graph} graph
 */
const primMST = (graph) => {
  const priorityQueue = new Heap((a, b) => a.weight - b.weight);
  const nodeSet = new Set();
  const result = [];

  for (const node of graph.nodes.values()) {
    if (!nodeSet.has(node)) {
      nodeSet.add(node);

      for (const edge of node.edges) {
        priorityQueue.add(edge);
      }

      while (!priorityQueue.isEmpty()) {
        const edge = priorityQueue.pop();
        const toNode = edge.to;
        if (!nodeSet.has(toNode)) {
          nodeSet.add(toNode);
          result.push(edge);
          for (const nextEdge of toNode.edges) {
            priorityQueue.add(nextEdge);
          }
        }
      }
    }
    break;
  }

  return result;
};

// example

const graph = new Graph();
graph.addNode(1, "A", "B");
graph.addNode(4, "A", "C");
graph.addNode(3, "B", "C");
graph.addNode(2, "B", "D");
graph.addNode(5, "C", "D");
graph.addNode(6, "C", "E");
graph.addNode(7, "D", "E");

const mst = kruskalMST(graph);
for (const edge of mst) {
  console.log(`${edge.from.value} -> ${edge.to.value} : ${edge.weight}`);
}

// A -> B : 1
// B -> D : 2
// B -> C : 3
// C -> E : 6
const primMst = primMST(graph);
for (const edge of primMst) {
  console.log(`${edge.from.value} -> ${edge.to.value} : ${edge.weight}`);
}
// A -> B : 1
// B -> D : 2
// B -> C : 3
// C -> E : 6
