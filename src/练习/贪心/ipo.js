/**
 * 输入正数数组costs和正数数组profits，以及正数k，w
 * 表示初始资金，costs[i]和profits[i]分别表示i号项目的花费和利润
 * k表示你只能串行的最多做k个项目
 * 每次你必须在当前资金w之内选择一个你能做的项目去做
 * 做完之后，立刻获得收益，可以支持你去做下一个项目
 * 输出你最后获得的最大钱数
 */

const { Heap } = require("./tools");

class Work {
  constructor(cost, profit) {
    this.cost = cost;
    this.profit = profit;
  }
}

const IPO = (k, w, profits, costs) => {
  //按照初始金额排，放在小根堆中
  const minHeap = new Heap((a, b) => a.cost - b.cost);
  //满足工作金额的工作，按照收益排，放在大跟堆中
  const maxHeap = new Heap((a, b) => b.profit - a.profit);

  let res = w;
  for (let i = 0; i < profits.length; i++) {
    const work = new Work(costs[i], profits[i]);
    minHeap.add(work);
  }

  while (k > 0) {
    while (!minHeap.isEmpty() && minHeap.peek().cost <= res) {
      maxHeap.add(minHeap.pop());
    }

    if (maxHeap.isEmpty()) break;

    const work = maxHeap.pop();

    res += work.profit;

    k--;
  }

  return res;
};

//example

const maxCost = 10;
const maxProfit = 15;
const maxWork = 20;
const k = 5;
let w = 7;

const timeTimes = 100000;

//暴力解法
const IPO2 = (k, w, profits, costs) => {
  const n = profits.length;

  //根据当前w资金，选择收益最大的项目
  while (k > 0) {
    let maxProfit = -1;
    let index = -1;

    for (let i = 0; i < n; i++) {
      if (costs[i] <= w) {
        if (profits[i] > maxProfit) {
          maxProfit = profits[i];
          index = i;
        }
      }
    }

    if (index === -1) break;
    w += maxProfit;
    profits[index] = -1; //表示已经做过该项目
    k--;
  }

  return w;
};

const generateRandomProfitsAndCosts = (len, maxProfit, maxCost) => {
  const profits = [];
  const costs = [];

  for (let i = 0; i < len; i++) {
    profits.push(Math.floor(Math.random() * (maxProfit + 1)));
    costs.push(Math.floor(Math.random() * (maxCost + 1)));
  }

  return [profits, costs];
};

for (let i = 0; i < timeTimes; i++) {
  const [profits, costs] = generateRandomProfitsAndCosts(
    maxWork,
    maxProfit,
    maxCost
  );
  const res = IPO(k, w, profits, costs);
  const res2 = IPO2(k, w, profits, costs);

  if (res !== res2) {
    console.log("Oops!");
    console.log(profits);
    console.log(costs);
    console.log(res);
    console.log(res2);
    break;
  }
}

console.log("finish!");

//leetcode 502
//https://leetcode.cn/problems/ipo/
