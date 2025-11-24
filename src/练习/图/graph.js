class Queue {
  constructor() {
    this.items = [];
  }

  push(value) {
    this.items.push(value);
  }

  pop() {
    return this.items.shift();
  }

  isEmpty() {
    return this.items.length == 0;
  }

  size() {
    return this.items.length;
  }
}

class Stack {
  constructor() {
    this.items = [];
  }

  push(value) {
    this.items.push(value);
  }

  pop() {
    return this.items.pop();
  }

  isEmpty() {
    return this.items.length == 0;
  }

  size() {
    return this.items.length;
  }
}

class Graph {
  constructor() {
    this.nodes = new Map();
    this.edges = new Set();
  }

  addNode(weight, from, to) {
    let fromNode;
    let toNode;

    if (this.nodes.has(from)) {
      fromNode = this.nodes.get(from);
    } else {
      fromNode = new Node_(from);
      this.nodes.set(from, fromNode);
    }

    if (this.nodes.has(to)) {
      toNode = this.nodes.get(to);
    } else {
      toNode = new Node_(to);
      this.nodes.set(to, toNode);
    }

    const edge = new Edge_(weight, fromNode, toNode);

    fromNode.out++;
    toNode.in++;

    fromNode.nexts.push(toNode);
    fromNode.edges.push(edge);

    this.edges.add(edge);
  }

  /**
   *
   * @param {Node_} head
   */
  bfs(head) {
    const visited = new Set();
    const queue = new Queue();

    queue.push(head);
    visited.add(head);

    while (!queue.isEmpty()) {
      const v = queue.pop();
      console.log(v.value);

      for (var next of v.nexts) {
        if (visited.has(next)) {
          continue;
        }
        queue.push(next);
        visited.add(next);
      }
    }
  }
  dfs(head) {
    const visited = new Set();
    const stack = new Stack();

    stack.push(head);
    visited.add(head);

    //处理时机
    console.log(head.value);

    while (!stack.isEmpty()) {
      const v = stack.pop();

      findNext: for (let next of v.nexts) {
        if (!visited.has(next)) {
          stack.push(v);
          stack.push(next);

          visited.add(next);
          //处理时机
          console.log(next.value);
          break findNext;
        }
      }
    }
  }

  // 拓扑排序
  // inMap是一张入度的表
  // zeroInQueue 是将所有入度为0的Node加入到其中
  sortTopology() {
    const inMap = new Map();
    const zeroInQueue = new Queue();

    for (const [, node] of this.nodes) {
      inMap.set(node, node.in);
      if (node.in == 0) {
        zeroInQueue.push(node);
      }
    }

    const result = [];

    while (!zeroInQueue.isEmpty()) {
      const node = zeroInQueue.pop();
      result.push(node);
      for (const next of node.nexts) {
        inMap.set(next, inMap.get(next) - 1);
        if (inMap.get(next) == 0) {
          zeroInQueue.push(next);
        }
      }
    }
    return result;
  }
}

class Node_ {
  constructor(value) {
    this.value = value;
    // 入度数量
    this.in = 0;
    // 出度数量
    this.out = 0;

    // 邻居点
    this.nexts = [];
    // 边
    this.edges = [];
  }
}

class Edge_ {
  /**
   *
   * @param {number} weight
   * @param {Node_} from
   * @param {Node_} to
   */
  constructor(weight, from, to) {
    this.weight = weight;
    this.from = from;
    this.to = to;
  }
}

//example
const graph = new Graph();
graph.addNode(1, "A", "B");
graph.addNode(1, "A", "C");
graph.addNode(1, "B", "D");
graph.addNode(1, "C", "D");
graph.addNode(1, "D", "E");

graph.bfs(graph.nodes.get("A"));
console.log("----");
graph.dfs(graph.nodes.get("A"));
console.log("----");
console.log(graph.sortTopology());
console.log("----");
