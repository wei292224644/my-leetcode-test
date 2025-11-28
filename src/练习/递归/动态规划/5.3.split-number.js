//给定一个数字，然后将这个数字拆分，问拆分的方案数有多少种？
//前提是拆分出来的每一部分数字都不能为0，并且左侧的数字必须小于等于右侧的数字
//例如：
//数字4，可以拆分为4，1+1+1+1，1+1+2，1+3，2+2
//其中3+1不符合要求，因为左侧的3大于右侧的1
//所以符合要求的方案数为4种

export function splitNumberWays(n) {
  if (n < 1) {
    return 0;
  }

  /**
   *
   * @param {number} n 当且要拆分的数字
   * @param {number} min 当前拆分的数字不能小于min
   * @param {number} sum 当前已经拆分的数字和
   * @returns {number} 返回拆分方案数
   */
  const process = (n, min, sum) => {
    if (sum == n) {
      return 1;
    }

    let ways = 0;
    for (let i = min; i <= n - sum; i++) {
      ways += process(n, i, sum + i);
    }

    return ways;
  };

  return process(n, 1, 0);
}

export function splitNumberWaysDp(n) {
  if (n < 1) {
    return 0;
  }
  if (n == 1) {
    return 1;
  }

  const dp = Array.from({ length: n + 1 }, () => Array(n + 1).fill(0));
  dp[n][0] = 1;
  for (let min = 1; min <= n; min++) {
    dp[min][n] = 1;
  }

  for (let min = n - 1; min >= 1; min--) {
    for (let sum = n - 1; sum >= 0; sum--) {
      //   let ways = 0;
      //   for (let first = min; first <= n - sum; first++) {
      //     ways += dp[first][sum + first];
      //   }
      //优化

      // dp[min][sum] =  dp[min][sum+min] + dp[min+1][sum+min+1] + dp[min+1][sum+min+2] + ...
      // dp[min+1][sum] = dp[min+1][sum+min+1] + dp[min+1][sum+min+2] + ...
      //所以 dp[min][sum] = dp[min+1][sum] + dp[min][sum+min]
      dp[min][sum] = dp[min + 1][sum];
      if (sum + min <= n) {
        dp[min][sum] += dp[min][sum + min];
      }
    }
  }

  const res = dp[1][0];
  return res;
}

export function splitNumberWays2(n) {
  if (n < 1) {
    return 0;
  }
  if (n == 1) {
    return 1;
  }
  /**
   *
   * @param {number} pre 当前要拆分的数字
   * @param {number} rest 当前还剩余的数字
   * @returns {number} 返回拆分方案数
   */
  const process = (pre, rest) => {
    if (rest == 0) {
      return 1;
    }
    if (pre > rest) {
      return 0;
    }

    let ways = 0;
    for (let first = pre; first <= rest; first++) {
      ways += process(first, rest - first);
    }
    return ways;
  };

  return process(1, n);
}

//example
//1+1+1+1 1+1+2 1+3 2+2
console.log(splitNumberWaysDp(4)); //5
//1+1+1+1+1 1+1+1+2 1+1+3 1+2+2 1+4 2+3 5
console.log(splitNumberWaysDp(5)); //7
console.log(splitNumberWaysDp(6)); //11
console.log(splitNumberWaysDp(7)); //15
console.log(splitNumberWaysDp(8)); //22
console.log(splitNumberWaysDp(9)); //30
console.log(splitNumberWaysDp(10)); //42
