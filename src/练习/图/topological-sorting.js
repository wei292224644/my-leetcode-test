//

class DirectedGraphNode {
  constructor(label) {
    this.label = label;
    this.neighbors = [];
  }
}

class Record {
  /**
   *
   * @param {DirectedGraphNode} node
   * @param {number} nodes 当前节点所到之处所有节点的数量
   */
  constructor(node, nodes) {
    this.node = node;
    this.nodes = nodes;
  }

  /**
   *
   * @param {DirectedGraphNode[]} graph
   */
  topSort(graph) {
    const order = new Map();

    for (const node of graph) {
      this.f(node, order);
    }
    const records = Array.from(order.values());
    records.sort((a, b) => b.nodes - a.nodes);
    const ans = [];
    for (const record of records) {
      ans.push(record.node);
    }
    return ans;
  }
  //当前来到node，去计算node的所到之处所有的点次
  f(node, order) {
    if (order.has(node)) {
      return order.get(node);
    }
    let nodes = 0;
    for (const next of node.neighbors) {
      nodes += this.f(next, order).nodes;
    }
    nodes++;
    const ans = new Record(node, nodes);
    order.set(node, ans);
    return ans;
  }
}

class RecordDeep {
  constructor(node, deep) {
    this.node = node;
    this.deep = deep;
  }

  topSort(graph) {
    const order = new Map();

    for (const node of graph) {
      this.f(node, order);
    }
    const records = Array.from(order.values());
    records.sort((a, b) => b.deep - a.deep);
    const ans = [];
    for (const record of records) {
      ans.push(record.node);
    }
    return ans;
  }

  f(node, order) {
    if (order.has(node)) {
      return order.get(node);
    }
    let deep = 0;
    for (const next of node.neighbors) {
      deep = Math.max(deep, this.f(next, order).deep);
    }
    deep++;
    const ans = new RecordDeep(node, deep);
    order.set(node, ans);
    return ans;
  }
}

//example
const nodeA = new DirectedGraphNode("A");
const nodeB = new DirectedGraphNode("B");
const nodeC = new DirectedGraphNode("C");
const nodeD = new DirectedGraphNode("D");
const nodeE = new DirectedGraphNode("E");
const nodeF = new DirectedGraphNode("F");

nodeA.neighbors.push(nodeC);
nodeA.neighbors.push(nodeB);
nodeB.neighbors.push(nodeD);
nodeC.neighbors.push(nodeD);
nodeD.neighbors.push(nodeE);
nodeE.neighbors.push(nodeF);

const graph = [nodeA, nodeB, nodeC, nodeD, nodeE, nodeF];

// const record = new Record();
// const result = record.topSort(graph);
// console.log(result.map((node) => node.label)); // [ 'A', 'B', 'C', 'D', 'E', 'F' ]
// console.log("----");

const recordDeep = new RecordDeep();
const resultDeep = recordDeep.topSort(graph);
console.log(resultDeep.map((node) => node.label)); // [ 'A', 'B', 'C', 'D', 'E', 'F' ]
