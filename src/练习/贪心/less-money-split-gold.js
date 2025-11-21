/**
 * 一块金条切成两半，是需要花费和金条长度一样的铜板的。
 * 比如长度为20的金条，不管切成长度多大的两半，都要花费20个铜板。
 *
 * 一群人想整分整块金条，怎么分最省铜板？
 *
 * 例如,给定数组{10,20,30}，代表一共三个人，整块金条长度为60，
 * 金条要分成10,20,30三个部分。 如果先把60切成10和50，花费60；
 * 再把50切成20和30，花费50；一共花费110铜板。
 *
 * 但是如果先把60切成30和30，花费60；
 * 再把30切成10和20，花费30；一共花费90铜板。
 * 请给出分割方案，求出最小花费。
 */

const { Heap } = require("./tools");

const lessMoneySplitGold = (arr) => {
  if (arr == null || arr.length < 2) return 0;
  const heap = new Heap((a, b) => a - b);
  heap.addAll(arr);

  let sum = 0;
  while (heap.size() > 1) {
    const a = heap.pop();
    const b = heap.pop();

    const v = a + b;
    heap.add(v);
    sum += v;
  }

  return sum;
};

//example

//暴力解法
const lessMoneySplitGold1 = (arr) => {
  if (arr == null || arr.length < 2) return 0;

  const copyAndMergeTwo = (ary, i, j) => {
    const res = [];
    let ansi = 0;
    for (let k = 0; k < ary.length; k++) {
      if (k !== i && k !== j) {
        res[ansi++] = ary[k];
      }
    }
    res[ansi] = ary[i] + ary[j];
    return res;
  };

  const process = (ary, pre) => {
    if (ary.length === 1) {
      return pre;
    }

    let ans = Number.MAX_SAFE_INTEGER;

    for (let i = 0; i < ary.length; i++) {
      for (let j = i + 1; j < ary.length; j++) {
        const next = copyAndMergeTwo(ary, i, j);
        ans = Math.min(ans, process(next, pre + ary[i] + ary[j]));
      }
    }
    return ans;
  };

  return process(arr, 0);
};

const generateMoneyArray = (moneyLength, maxValue) => {
  const arr = [];
  for (let i = 0; i < moneyLength; i++) {
    arr.push(Math.floor(Math.random() * maxValue) + 1);
  }
  return arr;
};

const moneyLength = 6;
const maxValue = 100;
const timeTimes = 10000;

for (let i = 0; i < timeTimes; i++) {
  const arr = generateMoneyArray(moneyLength, maxValue);
  const result = lessMoneySplitGold(arr);
  const result1 = lessMoneySplitGold1(arr);
  if (result !== result1) {
    console.log("Oops!");
  }
}

console.log("test completed");
