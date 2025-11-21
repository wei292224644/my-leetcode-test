class UnionNode {
  value;
  constructor(v) {
    this.value = v;
  }
}
class UnionSet {
  constructor(values) {
    this.nodes = new Map();
    this.parents = new Map();
    this.sizeMap = new Map();

    for (let value of values) {
      const node = new UnionNode(value);
      this.nodes.set(value, node);
      this.parents.set(node, node);
      this.sizeMap.set(node, 1);
    }
  }

  findHead(cur) {
    const paths = [];

    while (cur !== this.parents.get(cur)) {
      paths.push(cur);
      cur = this.parents.get(cur);
    }

    for (const path of paths) {
      this.parents.set(path, cur);
    }

    return cur;
  }

  isSameSet(a, b) {
    return this.findHead(this.nodes.get(a)) == this.findHead(this.nodes.get(b));
  }

  union(a, b) {
    const aNode = this.nodes.get(a);
    const bNode = this.nodes.get(b);

    if (!aNode || !bNode) throw new Error("找到a节点或者b节点！");

    const aHead = this.findHead(aNode);
    const bHead = this.findHead(bNode);

    if (aHead && bHead && aHead !== bHead) {
      const aHeadSize = this.sizeMap.get(aHead);
      const bHeadSize = this.sizeMap.get(bHead);

      const big = aHeadSize >= bHeadSize ? aHead : bHead;

      const small = big == aHead ? bHead : aHead;

      this.parents.set(small, big);
      this.sizeMap.delete(small);
      this.sizeMap.set(big, aHeadSize + bHeadSize);
    }
  }

  size() {
    return this.sizeMap.size;
  }
}

export { UnionSet };
