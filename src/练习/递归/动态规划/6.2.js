//给定一个正数数组arr,请把arr中所有的数分成两个集合
//如果arr长度为偶数，两个集合的长度必须相等
//如果arr长度为奇数，两个集合的长度只能相差1
//请让两个集合的累加和接近
//返回最接近的情况下，较小集合的累加和
export function splitSumClosed(arr) {
  if (arr == null || arr.length === 0) {
    return 0;
  }
  const totalSum = arr.reduce((acc, val) => acc + val, 0);
  const halfSum = Math.floor(totalSum / 2);

  const process = (arr, index, rest, count) => {
    if (index == arr.length) {
      return count == 0 ? 0 : -1;
    }
    //不要当前数
    const p1 = process(arr, index + 1, rest, count);
    let p2 = -1;
    //要当前数
    if (rest >= arr[index]) {
      const next = process(arr, index + 1, rest - arr[index], count - 1);

      if (next != -1) {
        p2 = arr[index] + next;
      }
    }
    return Math.max(p1, p2);
  };

  if ((arr.length & 1) == 0) {
    return process(arr, 0, halfSum, Math.floor(arr.length / 2));
  } else {
    return Math.max(
      process(arr, 0, halfSum, Math.floor(arr.length / 2)),
      process(arr, 0, halfSum, Math.floor(arr.length / 2) + 1)
    );
  }
}

function splitSumClosedDp(arr) {
  if (arr == null || arr.length === 0) {
    return 0;
  }
  const totalSum = arr.reduce((acc, val) => acc + val, 0);
  const halfSum = Math.floor(totalSum / 2);

  const N = arr.length;
  const M = Math.floor(N / 2);

  const dp = Array.from({ length: N + 1 }, () =>
    Array.from({ length: halfSum + 1 }, () => Array(M + 2).fill(-1))
  );

  for (let rest = 0; rest <= halfSum; rest++) {
    dp[N][rest][0] = 0;
  }

  for (let index = N - 1; index >= 0; index--) {
    for (let rest = 0; rest <= halfSum; rest++) {
      for (let count = 0; count <= M; count++) {
        //不要当前数
        // const p1 = process(arr, index + 1, rest, count);
        // let p2 = -1;
        // //要当前数
        // if (rest >= arr[index]) {
        //   const next = process(arr, index + 1, rest - arr[index], count - 1);

        //   if (next != -1) {
        //     p2 = arr[index] + next;
        //   }
        // }
        // return Math.max(p1, p2);

        const p1 = dp[index + 1][rest][count];
        let p2 = -1;
        if (rest >= arr[index] && count - 1 >= 0) {
          const next = dp[index + 1][rest - arr[index]][count - 1];
          if (next != -1) {
            p2 = arr[index] + next;
          }
        }
        dp[index][rest][count] = Math.max(p1, p2);
      }
    }
  }

  if (M & (1 === 0)) {
    return dp[0][halfSum][M];
  }
  return Math.max(dp[0][halfSum][M], dp[0][halfSum][M + 1]);
}

// example
const arr = [3, 1, 4, 2, 2, 2, 3, 4, 5, 2, 1];
console.log(splitSumClosed(arr)); // 14
console.log(splitSumClosedDp(arr)); // 14
