//想象一个象棋的棋盘
//然后整个棋盘放入第一象限，棋盘的最左下角是(0,0)点
//那么整个棋盘就是横坐标9条线，纵坐标10条线
//给你三个参数x,y,k
//返回 ”马“ 从(0,0)出发，经过k步后，落在(x,y)位置的方法数

function horseJumpTest(x, y, k) {
  const n = 9;
  const m = 10;

  if (x < 0 || x > n - 1 || y < 0 || y > m - 1 || k < 0) {
    return 0;
  }

  // const process = (px, py, rest, x, y) => {
  //   //越界了
  //   if (x < 0 || x > n || y < 0 || y > m || k < 0) {
  //     return 0;
  //   }

  //   // base case
  //   if (rest == 0) {
  //     return px == x && py == y ? 1 : 0;
  //   }

  //   let ways = process(px, py, rest - 1, x + 2, y + 1);
  //   ways += process(px, py, rest - 1, x + 2, y - 1);

  //   ways += process(px, py, rest - 1, x - 2, y + 1);
  //   ways += process(px, py, rest - 1, x - 2, y - 1);

  //   ways += process(px, py, rest - 1, x + 1, y + 2);
  //   ways += process(px, py, rest - 1, x + 1, y - 2);

  //   ways += process(px, py, rest - 1, x - 1, y + 2);
  //   ways += process(px, py, rest - 1, x - 1, y - 2);

  //   return ways;
  // };

  // return process(x, y, k, 0, 0);

  const pick = (arr, rest, x, y) => {
    if (x < 0 || x > n - 1 || y < 0 || y > m - 1) {
      return 0;
    }

    return arr[x][y][rest];
  };

  const dp = Array.from({ length: n }, () =>
    Array.from({ length: m }, () => Array(k + 1).fill(0))
  );
  //base case
  dp[x][y][0] = 1;

  for (let rest = 1; rest <= k; rest++) {
    for (let x = 0; x < n; x++) {
      for (let y = 0; y < m; y++) {
        let ways = pick(dp, rest - 1, x + 2, y + 1);
        ways += pick(dp, rest - 1, x + 2, y - 1);
        ways += pick(dp, rest - 1, x - 2, y + 1);
        ways += pick(dp, rest - 1, x - 2, y - 1);
        ways += pick(dp, rest - 1, x + 1, y + 2);
        ways += pick(dp, rest - 1, x + 1, y - 2);
        ways += pick(dp, rest - 1, x - 1, y + 2);
        ways += pick(dp, rest - 1, x - 1, y - 2);
        dp[x][y][rest] = ways;
      }
    }
  }

  return dp[0][0][k];
}

function horseJump(x, y, k) {
  if (x < 0 || x > 8 || y < 0 || y > 9 || k < 0) {
    return 0;
  }

  /**
   *
   * @param {number} x x坐标
   * @param {number} y y坐标
   * @param {number} rest 剩余步数
   * @param {number} a 当前横坐标
   * @param {number} b 当前纵坐标
   * @returns {number} 方法数
   */
  const process = (x, y, rest, a, b) => {
    //越界了，直接返回0
    if (a < 0 || a > 8 || b < 0 || b > 9) {
      return 0;
    }
    if (rest == 0) {
      return a === x && b === y ? 1 : 0;
    }

    let ways = 0;
    ways += process(x, y, rest - 1, a + 2, b + 1);
    ways += process(x, y, rest - 1, a + 2, b - 1);
    ways += process(x, y, rest - 1, a - 2, b + 1);
    ways += process(x, y, rest - 1, a - 2, b - 1);
    ways += process(x, y, rest - 1, a + 1, b + 2);
    ways += process(x, y, rest - 1, a + 1, b - 2);
    ways += process(x, y, rest - 1, a - 1, b + 2);
    ways += process(x, y, rest - 1, a - 1, b - 2);
    return ways;
  };

  return process(x, y, k, 0, 0);
}

function horseJump2(x, y, k) {
  if (x < 0 || x > 8 || y < 0 || y > 9 || k < 0) {
    return 0;
  }

  const dp = Array.from({ length: 9 }, () =>
    Array.from({ length: 10 }, () => Array(k + 1).fill(0))
  );
  dp[x][y][0] = 1;

  const pick = (dp, rest, a, b) => {
    if (a < 0 || a > 8 || b < 0 || b > 9) {
      return 0;
    }
    return dp[a][b][rest];
  };

  for (let rest = 1; rest <= k; rest++) {
    for (let a = 0; a <= 8; a++) {
      for (let b = 0; b <= 9; b++) {
        let ways = 0;
        ways += pick(dp, rest - 1, a + 2, b + 1);
        ways += pick(dp, rest - 1, a + 2, b - 1);
        ways += pick(dp, rest - 1, a - 2, b + 1);
        ways += pick(dp, rest - 1, a - 2, b - 1);
        ways += pick(dp, rest - 1, a + 1, b + 2);
        ways += pick(dp, rest - 1, a + 1, b - 2);
        ways += pick(dp, rest - 1, a - 1, b + 2);
        ways += pick(dp, rest - 1, a - 1, b - 2);
        dp[a][b][rest] = ways;
      }
    }
  }
  return dp[0][0][k];
}

// example
// console.log(horseJump(7, 7, 10)); // 515813
console.log(horseJump2(7, 7, 10)); // 515813
console.log(horseJumpTest(7, 7, 10)); // 515813
