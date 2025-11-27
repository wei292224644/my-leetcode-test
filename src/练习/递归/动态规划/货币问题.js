//arr是货币数组，其中的值都是正数，再给定一个正数aim代表要找的钱数，
//每个值都认为是一张货币
//即便是面值相同的货币也认为是不同的一张，
//返回组成aim的方法数
//例如：arr=[1,1,1],aim=2
//第一张和第二张组成一组
//第一张和第三张组成一组
//第二张和第三张组成一组
//一共就3种方法，所以返回3

//从左往右的尝试模型
export function coinWays(arr, aim) {
  if (arr == null || arr.length === 0 || aim < 0) {
    return 0;
  }

  //   const process = (arr, index, rest) => {
  //     if (index === arr.length) {
  //       return rest === 0 ? 1 : 0;
  //     }

  //     let ways = 0;
  //     // 不要当前index的货币
  //     ways += process(arr, index + 1, rest);
  //     // 要当前index的货币
  //     // 判断rest是否足够消费当前index的货币
  //     if (rest - arr[index] >= 0) {
  //       ways += process(arr, index + 1, rest - arr[index]);
  //     }
  //     return ways;
  //   };

  //   return process(arr, 0, aim);

  //动态规划
  const N = arr.length;
  const dp = Array.from({ length: N + 1 }, () => Array(aim + 1).fill(0));
  dp[N][0] = 1;

  for (let index = N - 1; index >= 0; index--) {
    for (let rest = 0; rest <= aim; rest++) {
      let ways = 0;
      // 不要当前index的货币
      ways += dp[index + 1][rest];
      // 要当前index的货币
      // 判断rest是否足够消费当前index的货币
      if (rest - arr[index] >= 0) {
        ways += dp[index + 1][rest - arr[index]];
      }
      dp[index][rest] = ways;
    }
  }

  return dp[0][aim];
}

// example

// const arr = [1, 1, 1];
// const aim = 2;
// console.log(coinWays(arr, aim)); //3

//arr是面值数组，其中的值都是正数且不重复，再给定一个正数aim代表要找的钱数，
//每个值都认为是一张货币，且认为张数无限
//返回组成aim的方法数
//例如：arr=[1,2],aim=4
//1+1+1+1
//1+1+2
//2+2
//一共就3种方法，所以返回3

//从左往右的尝试模型
export function coinWays2(arr, aim) {
  //   if (arr == null || arr.length === 0 || aim < 0) {
  //     return 0;
  //   }
  //   const process = (arr, index, rest) => {
  //     if (index == arr.length) {
  //       return rest === 0 ? 1 : 0;
  //     }
  //     let ways = 0;
  //     for (let zhangs = 0; zhangs <= rest / arr[index]; zhangs++) {
  //       ways += process(arr, index + 1, rest - zhangs * arr[index]);
  //     }
  //     return ways;
  //   };

  //   return process(arr, 0, aim);

  //动态规划
  const N = arr.length;
  const dp = Array.from({ length: arr.length + 1 }, () =>
    Array(aim + 1).fill(0)
  );
  dp[N][0] = 1;

  for (let index = N - 1; index >= 0; index--) {
    for (let rest = 0; rest <= aim; rest++) {
      //   let ways = 0;
      //   for (let zhangs = 0; zhangs <= rest / arr[index]; zhangs++) {
      //     ways += dp[index + 1][rest - zhangs * arr[index]];
      //   }
      //   dp[index][rest] = ways;

      //优化
      //因为当前值等于 dp[index+1][rest] + dp[index+1][rest- zhangs*arr[index]]
      //相当于是 正下方的值加上正下方arr[index]倍数左侧的值
      //而当前值的左侧arr[index]值又等于其正下方的值加上其正下方arr[index]倍数左侧的值
      //所以可以得出 当前值 =  正下方值 + 左侧arr[index]值

      let ways = 0;
      ways = dp[index + 1][rest];
      if (rest - arr[index] >= 0) {
        ways += dp[index][rest - arr[index]];
      }
      dp[index][rest] = ways;
    }
  }

  return dp[0][aim];
}

// example

// const arr = [1, 2];
// const aim = 4;
// console.log(coinWays2(arr, aim)); //3

//arr是货币数组，其中的值都是正数，再给定一个正数aim，
//每个值都认为是一张货币
//认为值相同的货币没有任何不同，
//返回组成aim的方法数
//例如：arr=[1,2,1,1,2,1,2],aim=4
//方法：1+1+1+1
//方法：1+1+2
//方法：2+2
//一共就3种方法，所以返回3

//从左往右的尝试模型
function coinWays3(arr, aim) {
  if (arr == null || arr.length === 0 || aim < 0) {
    return 0;
  }

  const coins = [];
  const counts = [];

  const map = new Map();
  for (let i = 0; i < arr.length; i++) {
    if (!map.has(arr[i])) {
      map.set(arr[i], 1);
    } else {
      map.set(arr[i], map.get(arr[i]) + 1);
    }
  }
  for (let [key, value] of map) {
    coins.push(key);
    counts.push(value);
  }

  //将货币整合成面值数组和对应张数数组
  //然后从左到右尝试所有可能性
  const process = (coins, counts, index, rest) => {
    if (index === coins.length) {
      return rest === 0 ? 1 : 0;
    }

    let ways = 0;

    for (
      let zhangs = 0;
      zhangs <= counts[index] && zhangs * coins[index] <= rest;
      zhangs++
    ) {
      ways += process(coins, counts, index + 1, rest - zhangs * coins[index]);
    }
    return ways;
  };

  return process(coins, counts, 0, aim);
}

//example

const arr = [1, 2, 1, 1, 2, 1, 2];
const aim = 4;
console.log(coinWays3(arr, aim)); //3
