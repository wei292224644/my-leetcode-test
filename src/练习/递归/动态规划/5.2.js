//arr是面值数组，其中的值都是正数且没有重复。在给定一个正数aim。
//每个值都认为是一种面值，且认为张数是无限的。
//返回组成aim的最少货币数
//例如：arr=[5,2,3]，aim=20
//5+5+5+5=20，返回4
//例如：arr=[117,10]，aim=30
//10+10+10=30，返回3

function minCoins(arr, aim) {
  if (arr == null || arr.length == 0 || aim < 0) {
    return -1;
  }

  /**
   *
   * @param {number[]} arr
   * @param {number} rest 当前剩余金额
   * @param {number} index 当前使用的货币索引
   * @returns {number} 返回当前货币索引下最少使用的货币数量
   */
  const process = (arr, rest, index) => {
    if (index == arr.length) {
      return rest == 0 ? 0 : Number.MAX_VALUE;
    }

    let ways = Number.MAX_VALUE;

    for (let zhang = 0; zhang * arr[index] <= rest; zhang++) {
      ways = Math.min(
        ways,
        zhang + process(arr, rest - zhang * arr[index], index + 1)
      );
    }

    return ways;
  };

  const ans = process(arr, aim, 0);

  return ans == Number.MAX_VALUE ? 0 : ans;
}

function minCoinsDp(arr, aim) {
  if (arr == null || arr.length == 0 || aim < 0) {
    return -1;
  }

  const N = arr.length;
  const M = aim;

  const dp = Array.from({ length: N + 1 }, () =>
    Array(M + 1).fill(Number.MAX_VALUE)
  );

  dp[N][0] = 0;

  for (let index = N - 1; index >= 0; index--) {
    for (let rest = 0; rest <= M; rest++) {
      //   let ways = Number.MAX_VALUE;
      //   for (let zhang = 0; zhang * arr[index] <= rest; zhang++) {
      //     if (rest - zhang * arr[index] >= 0) {
      //       ways = Math.min(
      //         ways,
      //         zhang + dp[index + 1][rest - zhang * arr[index]]
      //       );
      //     }
      //   }
      //   dp[index][rest] = ways;

      //优化部分 - 斜率优化
      // 这里优化的思路是：dp[index][rest]的值等于 正下方的值(dp[index+1][rest]) 和
      // 左边的值(dp[index][rest - arr[index]] + 1) 之间的较小值
      // 因为左边的值相当于多使用了一张当前面值的货币
      // 为什么是左边的值呢？因为我们在计算dp[index][rest - arr[index]]时
      // 实际上已经考虑过使用当前面值的货币了，所以这里加1表示再使用一张当前面值的货币
      dp[index][rest] = dp[index + 1][rest];
      if (rest - arr[index] >= 0) {
        dp[index][rest] = Math.min(
          dp[index][rest],
          1 + dp[index][rest - arr[index]]
        );
      }
    }
  }

  return dp[0][aim] == Number.MAX_VALUE ? 0 : dp[0][aim];
}

const randomArray = (len, max) => {
  const set = new Set();
  while (set.size < len) {
    set.add(Math.floor(Math.random() * max) + 1);
  }
  return Array.from(set);
};

const arrLength = 5;
const arrMax = 30;
const aimMax = 300;
const timeTimes = 1000;

for (let i = 0; i < timeTimes; i++) {
  const arr = randomArray(arrLength, arrMax);
  const aim = Math.floor(Math.random() * aimMax);

  const ans1 = minCoins(arr, aim);
  const ans2 = minCoinsDp(arr, aim);

  if (ans1 !== ans2) {
    console.log("Oops!");
    console.log(arr, aim);
    console.log(ans1, ans2);
    break;
  }
}
console.log("finish!");
