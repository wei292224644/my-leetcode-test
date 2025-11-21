const { UnionSet } = require("./tools");
/**
 * 岛屿的数量，给你一个由 '1'（陆地）和 '0'（水）组成的二维网格，请你计算网格中岛屿的数量。岛屿总是被水包围，并且每座岛屿只能由水平方向和竖直方向上相邻的陆地连接形成。

 * 示例 1:
 * 输入：grid = [
 *   ["1","1","1","1","0"],
 *   ["1","1","0","1","0"],
 *   ["1","1","0","0","0"],
 *   ["0","0","0","0","0"]
 * ]
 * 输出：1
 * 示例 2：
 * 输入：grid = [
 *   ["1","1","0","0","0"],
 *   ["1","1","0","0","0"],
 *   ["0","0","1","0","0"],
 *   ["0","0","0","1","1"]
 * ]
 * 输出：3
 */

//通过遍历每一个位置，遇到1就让岛屿数量加1，然后通过递归把与该位置相连的1都变成#，表示已经访问过了
//时间复杂度O(M*N)，空间复杂度O(M*N)
var numIslands = function (grid) {
  if (grid == null) return 0;

  const process = (grid, i, j) => {
    if (!grid[i] || !grid[i][j] || grid[i][j] !== "1") return;

    grid[i][j] = "#";

    process(grid, i - 1, j);
    process(grid, i + 1, j);
    process(grid, i, j - 1);
    process(grid, i, j + 1);
  };

  let res = 0;
  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[i].length; j++) {
      if (grid[i][j] == "1") {
        res++;
        process(grid, i, j);
      }
    }
  }

  return res;
};

//通过并查集来实现，首先把所有的1都创建一个Dot对象插入到并查集中，然后遍历二维数组，如果当前位置是1，则和上方以及左方的位置进行合并操作，最后并查集的集合数量就是岛屿的数量
const numIslands1 = function (grid) {
  if (grid == null) return 0;

  class Dot {}
  const unionSet = new UnionSet();

  const col = grid.length;
  const row = grid[0].length;
  const dots = new Array(row);

  for (let i = 0; i < col; i++) {
    dots[i] = new Array(col);
    for (let j = 0; j < row; j++) {
      if (grid[i][j] == "1") {
        dots[i][j] = new Dot();
        unionSet.add(dots[i][j]);
      }
    }
  }

  for (let i = 1; i < col; i++) {
    if (grid[i][0] == "1" && grid[i - 1][0] == "1") {
      unionSet.union(dots[i][0], dots[i - 1][0]);
    }
  }

  for (let j = 1; j < row; j++) {
    if (grid[0][j] == "1" && grid[0][j - 1] == "1") {
      unionSet.union(dots[0][j], dots[0][j - 1]);
    }
  }

  for (let i = 1; i < col; i++) {
    for (let j = 1; j < row; j++) {
      if (grid[i][j] == "1") {
        if (grid[i - 1][j] == "1") {
          unionSet.union(dots[i][j], dots[i - 1][j]);
        }

        if (grid[i][j - 1] == "1") {
          unionSet.union(dots[i][j], dots[i][j - 1]);
        }
      }
    }
  }

  return unionSet.size();
};

class UnionFind {
  constructor(col, row) {
    this.row = row;
    this.col = col;

    const len = col * row;
    this.sizes = new Array(len);
    this.parents = new Array(len);
    this.helper = new Array(len);
    this.sets = 0;

    for (let i = 0; i < col; i++) {
      for (let j = 0; j < row; j++) {
        const index = this._index(i, j);
        this.parents[index] = index;
        this.sizes[index] = 1;
        this.sets++;
      }
    }
  }

  _index(i, j) {
    return i * this.row + j;
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

  union(aI, aJ, bI, bJ) {
    const aHead = this.findHead(aI, aJ);
    const bHead = this.findHead(bI, bJ);

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

const numIslands2 = function (grid) {
  if (grid == null) return 0;

  const col = grid.length;
  const row = grid[0].length;

  const unionFind = new UnionFind(col, row);
  let waterCount = grid[0][0] == "0" ? 1 : 0;

  for (let i = 1; i < col; i++) {
    if (grid[i][0] == "1") {
      if (grid[i - 1][0] == "1") {
        unionFind.union(i, 0, i - 1, 0);
      }
    } else {
      waterCount++;
    }
  }
  for (let j = 1; j < row; j++) {
    if (grid[0][j] == "1") {
      if (grid[0][j - 1] == "1") {
        unionFind.union(0, j, 0, j - 1);
      }
    } else {
      waterCount++;
    }
  }

  for (let i = 1; i < col; i++) {
    for (let j = 1; j < row; j++) {
      if (grid[i][j] == "1") {
        if (grid[i - 1][j] == "1") {
          unionFind.union(i, j, i - 1, j);
        }
        if (grid[i][j - 1] == "1") {
          unionFind.union(i, j, i, j - 1);
        }
      } else {
        waterCount++;
      }
    }
  }

  return unionFind.size() - waterCount;
};

class UnionFind2 {
  constructor(grid) {
    this.col = grid.length;
    this.row = grid[0].length;

    const len = this.col * this.row;
    this.sizes = new Array(len);
    this.parents = new Array(len);
    this.helper = new Array(len);
    this.sets = 0;

    for (let i = 0; i < this.col; i++) {
      for (let j = 0; j < this.row; j++) {
        if (grid[i][j] == "0") continue;
        const index = this._index(i, j);
        this.parents[index] = index;
        this.sizes[index] = 1;
        this.sets++;
      }
    }
  }

  _index(i, j) {
    return i * this.row + j;
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

  union(aI, aJ, bI, bJ) {
    const aHead = this.findHead(aI, aJ);
    const bHead = this.findHead(bI, bJ);

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

const numIslands3 = function (grid) {
  if (grid == null) return 0;

  const col = grid.length;
  const row = grid[0].length;

  const unionFind = new UnionFind2(grid);

  for (let i = 1; i < col; i++) {
    if (grid[i][0] == "1") {
      if (grid[i - 1][0] == "1") {
        unionFind.union(i, 0, i - 1, 0);
      }
    }
  }
  for (let j = 1; j < row; j++) {
    if (grid[0][j] == "1") {
      if (grid[0][j - 1] == "1") {
        unionFind.union(0, j, 0, j - 1);
      }
    }
  }

  for (let i = 1; i < col; i++) {
    for (let j = 1; j < row; j++) {
      if (grid[i][j] == "1") {
        if (grid[i - 1][j] == "1") {
          unionFind.union(i, j, i - 1, j);
        }
        if (grid[i][j - 1] == "1") {
          unionFind.union(i, j, i, j - 1);
        }
      }
    }
  }

  return unionFind.size();
};

//example
function generateRandomGrid(rows, cols) {
  const grid = [];
  rows = Math.floor(Math.random() * rows) + 1;
  cols = Math.floor(Math.random() * cols) + 1;
  for (let i = 0; i < rows; i++) {
    const row = [];
    for (let j = 0; j < cols; j++) {
      row.push(Math.random() < 0.5 ? "0" : "1");
    }
    grid.push(row);
  }
  return grid;
}

const maxCol = 100;
const maxRow = 100;
const timeTimes = 10000;

console.log("测试开始");
let f1Times = 0;
let f2Times = 0;
let f3Times = 0;
let f4Times = 0;

const startTime = performance.now();

for (let i = 0; i < timeTimes; i++) {
  const grid = generateRandomGrid(maxRow, maxCol);

  const g1 = JSON.parse(JSON.stringify(grid));
  let time = performance.now();
  const res = numIslands(g1);
  f1Times += performance.now() - time;
  time = performance.now();
  const res1 = numIslands1(grid);
  f2Times += performance.now() - time;
  time = performance.now();
  const res2 = numIslands2(grid);
  f3Times += performance.now() - time;
  time = performance.now();
  const res3 = numIslands3(grid);
  f4Times += performance.now() - time;
  if (res !== res1 || res !== res2 || res !== res3) {
    console.log("出错了");
    console.log(grid);
    console.log(res, res1, res2, res3);
    break;
  }
}
const endTime = performance.now();
console.log(
  `执行${timeTimes}次，二维数组大小不超过${maxRow}*${maxCol}，总耗时：${
    endTime - startTime
  }毫秒`
);
console.log(`方法一耗时：${f1Times}毫秒`);
console.log(`方法二耗时：${f2Times}毫秒`);
console.log(`方法三耗时：${f3Times}毫秒`);
console.log(`方法四耗时：${f4Times}毫秒`);
console.log("测试结束");
