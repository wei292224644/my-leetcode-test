/**
 * 305. 岛屿数量 II
 * m 行 n 列的二维网格 grid ，初始时所有单元格的值均为 0 （代表水域）。给你一个数组 positions ，其中 positions[i] = [ri, ci] 表示将 grid[ri][ci] 的值从 0 变为 1 （代表陆地）。返回一个数组 ans ，其中 ans[i] 是在执行完 positions[i] 操作后岛屿的数量。
 * 示例 1：
 * 输入：m = 3, n = 3, positions = [[0,0],[0,1],[1,2],[2,1]]
 * 输出：[1,1,2,3]
 * 解释：最开始，二维网格 grid 如下所示（'0' 代表水域）：
 * 0 0 0
 * 0 0 0
 * 0 0 0
 * 操作 positions[0] = [0,0] 后，二维网格变为：
 * 1 0 0
 * 0 0 0
 * 0 0 0
 * 岛屿数量为 1
 * 操作 positions[1] = [0,1] 后，二维网格变为：
 * 1 1 0
 * 0 0 0
 * 0 0 0
 * 岛屿数量为 1
 * 操作 positions[2] = [1,2] 后，二维网格变为：
 * 1 1 0
 * 0 0 1
 * 0 0 0
 * 岛屿数量为 2
 * 操作 positions[3] = [2,1] 后，二维网格变为：
 * 1 1 0
 * 0 0 1
 * 0 1 0
 * 岛屿数量为 3
 */

class UnionFind {
  constructor(row, col) {
    this.row = row;
    this.col = col;
    const len = col * row;
    this.sizes = new Array(len);
    this.parents = new Array(len);
    this.helper = new Array(len);
    this.sets = 0;
  }

  add(i, j) {
    const index = this._index(i, j);
    this.parents[index] = index;
    this.sizes[index] = 1;
    this.sets++;
  }

  _index(i, j) {
    return i * this.col + j;
  }

  findHead(i, j) {
    let index = this._index(i, j);
    let hi = 0;
    while (index !== this.parents[index]) {
      this.helper[hi++] = index;
      index = this.parents[index];
    }

    for (hi--; hi >= 0; hi--) {
      this.parents[this.helper[hi]] = index;
    }
    return index;
  }

  union(aR, aC, bR, bC) {
    const aHead = this.findHead(aR, aC);
    const bHead = this.findHead(bR, bC);

    if (aHead !== bHead) {
      if (this.sizes[aHead] >= this.sizes[bHead]) {
        this.parents[bHead] = aHead;
        this.sizes[aHead] += this.sizes[bHead];
      } else {
        this.parents[aHead] = bHead;
        this.sizes[bHead] += this.sizes[aHead];
      }

      this.sets--;
    }
  }

  size() {
    return this.sets;
  }
}

var numIslands2 = function (m, n, positions) {
  if (m == 0 || n == 0 || positions == null || positions.length === 0) return 0;

  const unionFind = new UnionFind(m, n);
  const res = [];

  const dirs = [
    [0, -1],
    [0, 1],
    [-1, 0],
    [1, 0],
  ];

  for (let i = 0; i < positions.length; i++) {
    const [x, y] = positions[i];
    unionFind.add(x, y);

    for (const dir of dirs) {
      if (
        x + dir[0] >= 0 &&
        y + dir[1] >= 0 &&
        x + dir[0] < m &&
        y + dir[1] < n &&
        unionFind.findHead(x + dir[0], y + dir[1]) >= 0
      ) {
        unionFind.union(x, y, x + dir[0], y + dir[1]);
      }
    }
    res.push(unionFind.size());
  }
  return res;
};

var numIslands22 = function (m, n, positions) {
  if (m == 0 || n == 0 || positions == null || positions.length === 0) return 0;

  const res = [];
  let results = [];

  const numIslands = (grid) => {
    if (grid == null) return 0;

    grid = JSON.parse(JSON.stringify(grid));

    const process = (grid, i, j) => {
      if (!grid[i] || !grid[j] || grid[i][j] != "1") return;

      grid[i][j] = "2";

      process(grid, i - 1, j);
      process(grid, i + 1, j);
      process(grid, i, j - 1);
      process(grid, i, j + 1);
    };

    let count = 0;

    for (let i = 0; i < grid.length; i++) {
      for (let j = 0; j < grid[0].length; j++) {
        if (grid[i][j] == "1") {
          count++;
          process(grid, i, j);
        }
      }
    }

    return count;
  };

  for (let i = 0; i < m; i++) {
    res[i] = [];
    for (let j = 0; j < n; j++) {
      res[i][j] = "0";
    }
  }
  for (let i = 0; i < positions.length; i++) {
    const [x, y] = positions[i];
    res[x][y] = "1";

    const count = numIslands(res);
    results.push(count);
  }
  return results;
};

//example
function generateRandomPositions(rows, cols) {
  const positions = [];
  const totalPositions = rows * cols;
  const numPositions = Math.floor(Math.random() * totalPositions) + 1; // 至少一个位置

  const positionSet = new Set();

  while (positionSet.size < numPositions) {
    const r = Math.floor(Math.random() * rows);
    const c = Math.floor(Math.random() * cols);
    const posKey = `${r},${c}`;
    if (!positionSet.has(posKey)) {
      positionSet.add(posKey);
      positions.push([r, c]);
    }
  }
  return positions;
}

const m = 100;
const n = 100;
const positions = generateRandomPositions(m, n);
console.log("随机生成的位置：", positions);

console.log(numIslands2(m, n, positions));
console.log(numIslands22(m, n, positions));
