//给定 5 个参数 n、m、k、row、col 。醉汉 Bob 在一个 n x m 的网格的单元格 (row, col) 开始。
// Bob 一共要走 k 步。每一步，他都会以等概率选择向上、下、左、右四个方向之一走一格（不能走出网格）。
//任何时候只要 Bob 走出了网格，他就会醉倒在网格外面。
// 请返回 Bob 走 k 步后仍然在网格内的概率。
//
// 示例 1：
//
// 输入：n = 3, m = 3, k = 2, row = 0, col = 0
//输出：0.25
//解释：
//有 16 种可能的走法，其中有 4 种可以使 Bob 仍然留在网格内。

/**
 *
 * @param {number} n 棋盘行数
 * @param {number} m 棋盘列数
 * @param {number} row Bob起始行
 * @param {number} col Bob起始列
 * @param {number} k 要走的步数
 */
export function drunkProbability(n, m, row, col, k) {
  const totalWays = Math.pow(4, k);

  //   /**
  //    * @param {number} n 棋盘行数
  //    * @param {number} m 棋盘列数
  //    * @param {number} x 当前行
  //    * @param {number} y 当前列
  //    * @param {number} rest 剩余步数
  //    * @returns {number} 返回在剩余步数内不出格子的走法数
  //    */
  //   const process = (n, m, x, y, rest) => {
  //     if (x < 0 || x >= n || y < 0 || y >= m) {
  //       return 0;
  //     }
  //     if (rest == 0) {
  //       return 1;
  //     }

  //     let ways = 0;
  //     ways += process(n, m, x - 1, y, rest - 1);
  //     ways += process(n, m, x + 1, y, rest - 1);
  //     ways += process(n, m, x, y - 1, rest - 1);
  //     ways += process(n, m, x, y + 1, rest - 1);
  //     return ways;
  //   };

  //   return process(n, m, row, col, k) / totalWays;

  //动态规划
  const dp = Array.from({ length: n }, () =>
    Array.from({ length: m }, () => Array(k + 1).fill(0))
  );

  for (let x = 0; x < n; x++) {
    for (let y = 0; y < m; y++) {
      dp[x][y][0] = 1;
    }
  }

  const pick = (dp, rest, x, y) => {
    if (x < 0 || x >= n || y < 0 || y >= m) {
      return 0;
    }
    return dp[x][y][rest];
  };

  for (let rest = 1; rest <= k; rest++) {
    for (let x = 0; x < n; x++) {
      for (let y = 0; y < m; y++) {
        let ways = 0;

        ways += pick(dp, rest - 1, x - 1, y);
        ways += pick(dp, rest - 1, x + 1, y);
        ways += pick(dp, rest - 1, x, y - 1);
        ways += pick(dp, rest - 1, x, y + 1);
        dp[x][y][rest] = ways;
      }
    }
  }

  return dp[row][col][k] / totalWays;
}

//example

const n = 3,
  m = 3,
  k = 2,
  row = 0,
  col = 0;
console.log(drunkProbability(n, m, row, col, k)); //0.25
