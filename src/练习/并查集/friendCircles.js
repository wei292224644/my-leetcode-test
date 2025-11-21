const { UnionSet } = require("./tools");
/**
 * 547. 省份数量
 * @param {number[][]} isConnected
 * @return {number}
 */
var findCircleNum = (isConnected) => {
  const n = isConnected.length;

  const unionAry = new UnionAry(n);

  for (let i = 0; i < n; i++) {
    for (let j = i + 1; j < n; j++) {
      if (i == j) continue;

      if (isConnected[i][j]) {
        unionAry.union(i, j);
      }
    }
  }

  return unionAry.length();
};

class UnionAry {
  constructor(N) {
    this.parent = new Array(N);
    this.size = new Array(N);
    this.helper = new Array(N);
    this.sets = N;

    for (let i = 0; i < N; i++) {
      this.parent[i] = i;
      this.size[i] = 1;
    }
  }

  findHead(i) {
    let hi = 0;
    while (i !== this.parent[i]) {
      this.helper[hi++] = i;
      i = this.parent[i];
    }

    for (hi--; hi >= 0; hi--) {
      this.parent[this.helper[hi]] = i;
    }

    return i;
  }

  union(a, b) {
    const aHead = this.findHead(a);
    const bHead = this.findHead(b);

    if (aHead !== bHead) {
      const aSize = this.size[aHead];
      const bSize = this.size[bHead];

      const big = aSize >= bSize ? aHead : bHead;
      const small = big == aHead ? bHead : aHead;

      this.parent[small] = big;
      this.size[big] = aSize + bSize;
      this.sets--;
    }
  }

  length() {
    return this.sets;
  }
}

// example
console.log(
  findCircleNum([
    [1, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0],
    [1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 1, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0],
    [0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0],
    [0, 0, 0, 1, 0, 0, 1, 0, 1, 0, 0, 0, 0, 1, 0],
    [1, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 1, 0],
    [0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 1, 0, 0, 1],
    [0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 1, 1, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0],
    [0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 1, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1],
  ])
); // 3

// console.log(
//   findCircleNum([
//     [1, 0, 0],
//     [0, 1, 0],
//     [0, 0, 1],
//   ])
// ); // 3
