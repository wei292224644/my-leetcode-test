// 给定一个货物列表和一个价格列表，然后给定一个背包容量，返回能装下的最大价值

//所有的货，重量和价值，都在weights和values数组中，bag是背包容量
//没有负数
//weights[i]表示第i件货的重量，values[i]表示第i件货的价值
//只能装下不超过bag的重量，返回能装下的最大价值
function maxValue(weights, values, bag) {
  if (
    weights == null ||
    values == null ||
    weights.length !== values.length ||
    bag < 0
  ) {
    return 0;
  }

  /**
   *
   * @param {number[]} weights 货物重量
   * @param {number[]} values 货物价值
   * @param {number} index 当前考察到第index件货
   * @param {number} rest 背包剩余容量
   * @returns {number} 返回最高价格
   */

  const process = (weights, values, index, rest) => {
    if (rest < 0) {
      return -1;
    }
    if (index == weights.length) {
      return 0;
    }

    //没有要当前的货物
    const p1 = process(weights, values, index + 1, rest);

    //要当前货物
    let p2 = 0;
    const next = process(weights, values, index + 1, rest - weights[index]);
    if (next !== -1) {
      p2 = values[index] + next;
    }
    return Math.max(p1, p2);
  };
  return process(weights, values, 0, bag);
}

function maxValue2(weights, values, bag) {
  if (
    weights == null ||
    values == null ||
    weights.length !== values.length ||
    bag < 0
  ) {
    return 0;
  }

  const process = (weights, values, index, rest, dp) => {
    if (dp[index][rest] !== -1) {
      return dp[index][rest];
    }

    if (index == weights.length) {
      return 0;
    }

    //没有要当前的货物
    const p1 = process(weights, values, index + 1, rest, dp);

    //要当前货物
    let p2 = 0;
    if (rest - weights[index] >= 0) {
      p2 =
        values[index] +
        process(weights, values, index + 1, rest - weights[index], dp);
    }
    const ans = Math.max(p1, p2);
    dp[index][rest] = ans;
    return ans;
  };

  const W = weights.length;

  const dp = Array.from({ length: W + 1 }, () => Array(bag + 1).fill(-1));
  for (let i = 0; i <= bag; i++) {
    dp[W][i] = 0;
  }

  return process(weights, values, 0, bag, dp);
}

function maxValue3(weights, values, bag) {
  if (
    weights == null ||
    values == null ||
    weights.length !== values.length ||
    bag < 0
  ) {
    return 0;
  }

  const W = weights.length;
  const dp = Array.from({ length: W + 1 }, () => Array(bag + 1).fill(-1));
  for (let i = 0; i <= bag; i++) {
    dp[W][i] = 0;
  }

  for (let rest = 0; rest <= bag; rest++) {
    for (let index = W - 1; index >= 0; index--) {
      //   //没有要当前的货物
      //   const p1 = process(weights, values, index + 1, rest, dp);

      //   //要当前货物
      //   let p2 = 0;
      //   if (rest - weights[index] >= 0) {
      //     p2 =
      //       values[index] +
      //       process(weights, values, index + 1, rest - weights[index], dp);
      //   }
      //   const ans = Math.max(p1, p2);
      //   dp[index][rest] = ans;
      //   return ans;

      const p1 = dp[index + 1][rest];

      let p2 = 0;

      if (rest - weights[index] >= 0) {
        p2 = values[index] + dp[index + 1][rest - weights[index]];
      }
      dp[index][rest] = Math.max(p1, p2);
    }
  }
  return dp[0][bag];
}

console.log(maxValue([3, 2, 4, 7], [5, 6, 3, 19], 11)); // 25
console.log(maxValue2([3, 2, 4, 7], [5, 6, 3, 19], 11)); // 25
console.log(maxValue3([3, 2, 4, 7], [5, 6, 3, 19], 11)); // 25
