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
    // const visited = new Set();
    // const stack = new Stack();

    // stack.push(head);
    // visited.add(head);

    // console.log(head.value);
    // while (!stack.isEmpty()) {
    //   const v = stack.pop();
    //   //先从栈中弹出节点，然后找到下一个没有被访问过的节点
    //   //找到后立刻把弹出的节点和下一个节点压入栈中，并标记下一个节点为已访问，然后打印下一个节点的值
    //   //退出当前循环，进行下一次循环
    //   findNext: for (var next of v.nexts) {
    //     if (!visited.has(next)) {
    //       stack.push(v);
    //       stack.push(next);
    //       visited.add(next);
    //       console.log(next.value);
    //       break findNext;
    //     }
    //   }
    // }

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
graph.addNode(2, "A", "C");
graph.addNode(3, "B", "C");
graph.addNode(4, "C", "D");
graph.addNode(5, "D", "A");
graph.addNode(5, "B", "F");
graph.addNode(5, "F", "D");

graph.bfs(graph.nodes.get("A"));
console.log("----");
graph.dfs(graph.nodes.get("A"));
