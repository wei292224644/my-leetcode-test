//机器人走路
//N为路长度，start为起始位置，aim为目标位置，k为步数
//返回有多少种走法可以从start走到aim位置

function robotWalkTest(N, start, aim, k) {
  if (N < 2 || start < 1 || start > N || aim < 1 || aim > N || k < 1) {
    return 0;
  }

  /**
   *
   * @param {number} N 路长度
   * @param {number} aim 终点
   * @param {number} pos 当前位置
   * @param {number} rest 剩余步数
   */
  // const process = (N, aim, pos, rest) => {
  //   if (rest == 0) {
  //     return pos == aim ? 1 : 0;
  //   }

  //   if (pos == 1) {
  //     return process(N, aim, 2, rest - 1);
  //   }
  //   if (pos == N) {
  //     return process(N, aim, N - 1, rest - 1);
  //   }

  //   return (
  //     process(N, aim, pos + 1, rest - 1) + process(N, aim, pos - 1, rest - 1)
  //   );
  // };

  // return process(N, aim, start, k);

  const dp = Array.from({ length: N + 1 }, () => Array(k + 1).fill(0));
  dp[aim][0] = 1;

  for (let rest = 1; rest <= k; rest++) {
    dp[1][rest] = dp[2][rest - 1];
    for (let pos = 2; pos < N; pos++) {
      dp[pos][rest] = dp[pos + 1][rest - 1] + dp[pos - 1][rest - 1];
    }
    dp[N][rest] = dp[N - 1][rest - 1];
  }

  return dp[start][k];
}

/**
 *
 * @param {number} N  路长度
 * @param {number} start 起始位置
 * @param {number} aim  目标位置
 * @param {number} k 步数
 */
function robotWalk(N, start, aim, k) {
  // 边界条件检查
  // 路长度N必须大于等于2
  // 起始位置start和目标位置aim必须在1到N之间
  // 步数k必须大于等于1
  if (N < 2 || start < 1 || start > N || aim < 1 || aim > N || k < 1) {
    return 0;
  }

  const process = (cur, rest, aim, N) => {
    if (rest === 0) {
      return cur === aim ? 1 : 0;
    }

    if (cur == 1) {
      return process(2, rest - 1, aim, N);
    }
    if (cur == N) {
      return process(N - 1, rest - 1, aim, N);
    }
    return (
      process(cur - 1, rest - 1, aim, N) + process(cur + 1, rest - 1, aim, N)
    );
  };

  return process(start, k, aim, N);
}

function robotWalk2(N, start, aim, k) {
  // 边界条件检查
  // 路长度N必须大于等于2
  // 起始位置start和目标位置aim必须在1到N之间
  // 步数k必须大于等于1
  if (N < 2 || start < 1 || start > N || aim < 1 || aim > N || k < 1) {
    return 0;
  }
  // cur  当前位置
  // rest 剩余步长
  // aim  目标位置
  // N    路长度
  const process = (cur, rest, aim, N, dp) => {
    if (dp[cur][rest] !== -1) {
      return dp[cur][rest];
    }

    let ans = 0;
    if (rest == 0) {
      ans = cur == aim ? 1 : 0;
    } else if (cur == 1) {
      ans = process(2, rest - 1, aim, N, dp);
    } else if (cur == N) {
      ans = process(N - 1, rest - 1, aim, N, dp);
    } else {
      ans =
        process(cur - 1, rest - 1, aim, N, dp) +
        process(cur + 1, rest - 1, aim, N, dp);
    }
    dp[cur][rest] = ans;
    return ans;
  };

  //记忆化搜索
  //从顶向下的递归改为自底向上的动态规划

  const dp = Array.from({ length: N + 1 }, () => Array(k + 1).fill(-1));
  const ans = process(start, k, aim, N, dp);
  return ans;
}

/**
 *
 * @param {number} N  路长度
 * @param {number} start 起始位置
 * @param {number} aim  目标位置
 * @param {number} k 步数
 */
function robotWalkDP(N, start, aim, k) {
  // 边界条件检查
  // 路长度N必须大于等于2
  // 起始位置start和目标位置aim必须在1到N之间
  // 步数k必须大于等于1
  if (N < 2 || start < 1 || start > N || aim < 1 || aim > N || k < 1) {
    return 0;
  }

  // dp[i][j] 代表当前位置在 i，剩余步数为 j 的情况下，有多少种走法可以到达目标位置 aim
  const dp = Array.from({ length: N + 1 }, () => Array(k + 1).fill(0));
  dp[aim][0] = 1;

  for (let rest = 1; rest <= k; rest++) {
    dp[1][rest] = dp[2][rest - 1];
    for (let cur = 2; cur < N; cur++) {
      dp[cur][rest] = dp[cur - 1][rest - 1] + dp[cur + 1][rest - 1];
    }
    // dp[N][rest] = dp[N - 1][rest - 1];
  }

  return dp[start][k];
}

// example
const N = 5;
const start = 2;
const aim = 4;
const k = 6;
console.log(robotWalkTest(N, start, aim, k)); // 4
console.log(robotWalkDP(N, start, aim, k)); // 4
console.log("---");
