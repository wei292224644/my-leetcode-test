//给定一个正数数组arr,
//请把arr中所有的数分成两个集合，尽量让两个集合的累加和接近
//返回最接近的情况下，较小集合的累加和
export function splitSumClosed(arr) {
  if (arr == null || arr.length === 0) {
    return 0;
  }

  const process = (arr, index, sum1, sum2) => {
    if (index == arr.length) {
      return Math.min(sum1, sum2);
    }
    const p1 = process(arr, index + 1, sum1 + arr[index], sum2);
    const p2 = process(arr, index + 1, sum1, sum2 + arr[index]);
    return Math.max(p1, p2);
  };

  return process(arr, 0, 0, 0);
}

export function splitSumClosedDp(arr) {
  if (arr == null || arr.length === 0) {
    return 0;
  }
  //   let maxSum = 0;
  //   const N = arr.length;
  //   for (let i = 0; i < arr.length; i++) {
  //     maxSum += arr[i];
  //   }
  //   maxSum = Math.floor(maxSum / 2) + 1;

  //   const dp = Array.from({ length: maxSum }, () =>
  //     Array.from({ length: maxSum }, () => Array(N + 1).fill(0))
  //   );
  //   for (let index = N - 1; index >= 0; index--) {
  //     for (let sum1 = 0; sum1 <= maxSum; sum1++) {
  //       for (let sum2 = 0; sum2 <= maxSum; sum2++) {
  //         const p1 =
  //           sum1 + arr[index] <= maxSum
  //             ? dp[sum1 + arr[index]][sum2][index + 1]
  //             : 0;
  //         const p2 =
  //           sum2 + arr[index] <= maxSum
  //             ? dp[sum1][sum2 + arr[index]][index + 1]
  //             : 0;
  //         dp[sum1][sum2][index] = Math.max(p1, p2);
  //       }
  //     }
  //   }
  //   return dp[0][0][0];

  //   const process = (arr, index, sum1, sum2) => {
  //     if (index == arr.length) {
  //       return Math.min(sum1, sum2);
  //     }
  //     const p1 = process(arr, index + 1, sum1 + arr[index], sum2);
  //     const p2 = process(arr, index + 1, sum1, sum2 + arr[index]);
  //     return Math.max(p1, p2);
  //   };

  //   return process(arr, 0, 0, 0);

  //首先计算出来累加和应该是多少
  const total = arr.reduce((acc, val) => acc + val, 0);
  //一半累加和
  const half = total >> 1;

  //   /**
  //    *
  //    * @param {number} index 当前来到arr的index位置
  //    * @param {number} rest 当前还剩余的累加和不能超过rest
  //    * @returns {number} 返回在index位置上，所能获得的最大累加和
  //    */
  //   const process = (arr, index, rest) => {
  //     if (index == arr.length) {
  //       return 0;
  //     }

  //     //不要当前index位置的数
  //     const p1 = process(arr, index + 1, rest);

  //     //要当前index位置的数
  //     let p2 = 0;
  //     if (arr[index] <= rest) {
  //       p2 = process(arr, index + 1, rest - arr[index]) + arr[index];
  //     }
  //     return Math.max(p1, p2);
  //   };

  //   return process(arr, 0, half);

  const N = arr.length;
  const dp = Array.from({ length: N + 1 }, () => Array(half + 1).fill(0));

  for (let index = N - 1; index >= 0; index--) {
    for (let rest = 0; rest <= half; rest++) {
      const p1 = dp[index + 1][rest];

      let p2 = 0;
      if (arr[index] <= rest) {
        p2 = dp[index + 1][rest - arr[index]] + arr[index];
      }
      dp[index][rest] = Math.max(p1, p2);
    }
  }

  return dp[0][half];
}

// example
const arr = [5, 1, 4, 2, 2];
console.log(splitSumClosedDp(arr)); //7
