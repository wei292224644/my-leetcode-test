//给定一个数组arr,arr[i]代表第i号咖啡机冲一杯咖啡需要的时间
//给定一个整数N,代表N个人需要喝咖啡，每台开飞机只能轮转使用
//只有一台洗咖啡机，洗一杯咖啡需要的时间为a，洗咖啡机是串行工作的
//每个咖啡杯子也可以自然风干，风干需要的时间为b，风干是并行工作的
//假设所有人拿到咖啡之后立刻喝干净，
//返回从开始到所有人咖啡杯子洗干净或者自然风干完成的最少时间
//例子：
//arr=[1,2,3]
//N=3
//a=3
//b=2
//第0个人1分钟拿到咖啡，第1个人2分钟拿到咖啡，第2个人2分钟拿到咖啡
//第0个人1分钟开始洗杯子，4分钟洗完
//第1个人2分钟开始风干，4分钟风干完
//第2个人2分钟选择自然风干，4分钟风干完
//所以最终结果是4分钟

class Heap {
  constructor(comparator) {
    this.items = [];
    this.heapSize = 0;
    this.comparator = comparator || ((a, b) => a - b);
  }

  _swap(arr, i, j) {
    const temp = arr[i];
    arr[i] = arr[j];
    arr[j] = temp;
  }

  push(value) {
    this.items[this.heapSize] = value;
    this.heapInsert(this.heapSize++);
  }
  pop() {
    const first = this.items[0];
    this._swap(this.items, 0, --this.heapSize);
    this.heapify(0);
    return first;
  }

  heapInsert(index) {
    const parent = (index - 1) >> 1;

    while (
      index > 0 &&
      this.comparator(this.items[index], this.items[parent]) < 0
    ) {
      this._swap(this.items, parent, index);
      index = parent;
    }
  }

  heapify(index) {
    let left = index * 2 + 1;
    while (left < this.heapSize) {
      let largest =
        left + 1 < this.heapSize &&
        this.comparator(this.items[left + 1], this.items[left]) < 0
          ? left + 1
          : left;

      largest =
        this.comparator(this.items[largest], this.items[index]) < 0
          ? largest
          : index;

      if (largest === index) break;
      this._swap(this.items, largest, index);
      index = largest;
      left = index * 2 + 1;
    }
  }

  isEmpty() {
    return this.heapSize === 0;
  }
}

/**
 *
 * @param {number[]} arr 咖啡机数组
 * @param {number} N 需要喝咖啡的人数
 * @param {number} a 洗咖啡机洗一杯咖啡的时间
 * @param {number} b 自然风干一杯咖啡的时间
 * @returns {number} 最少时间
 */

class CoffeeMachine {
  constructor(time) {
    this.currentUseTime = 0;
    this.time = time;
  }
}
function minTime(arr, N, a, b) {
  //通过小根堆模拟咖啡机的使用，
  //返回每个人拿到咖啡的时间
  const heap = new Heap(
    (a, b) => a.currentUseTime + a.time - (b.currentUseTime + b.time)
  );
  for (let i = 0; i < arr.length; i++) {
    heap.push(new CoffeeMachine(arr[i]));
  }

  const drinkTimes = [];

  for (let i = 0; i < N; i++) {
    const machine = heap.pop();
    machine.currentUseTime += machine.time;
    drinkTimes.push(machine.currentUseTime);
    heap.push(machine);
  }

  //递归函数，返回所有杯子洗干净或者风干的最少时间

  /**
   *
   * @param {number[]} drinkTimes 每个人拿到咖啡的时间数组
   * @param {number} a 洗咖啡机洗一杯咖啡的时间
   * @param {number} b 自然风干一杯咖啡的时间
   * @param {number} index 当前考察到第index个杯子
   * @param {number} washLine 洗咖啡机的空闲时间点
   * @returns {number} 返回所有杯子洗干净或者风干的最少时间
   */
  //   const process = (drinkTimes, a, b, index, washLine) => {
  //     if (index === drinkTimes.length) {
  //       return 0;
  //     }

  //     //选择洗杯子
  //     const washTime = Math.max(drinkTimes[index], washLine) + a;
  //     const otherTime = process(drinkTimes, a, b, index + 1, washTime);
  //     const p1 = Math.max(washTime, otherTime);

  //     //选择风干杯子
  //     const dryTime = drinkTimes[index] + b;
  //     const otherDryTime = process(drinkTimes, a, b, index + 1, washLine);
  //     const p2 = Math.max(dryTime, otherDryTime);

  //     return Math.min(p1, p2);
  //   };

  //   return process(drinkTimes, a, b, 0, 0);

  //动态规划
  const DN = drinkTimes.length;
  let maxWashLine = 0;
  for (let i = 0; i < DN; i++) {
    // 计算出洗咖啡机的最大空闲时间点，查看是喝完咖啡的最大时间点，还是洗咖啡机串行工作后的最大时间点
    maxWashLine = Math.max(drinkTimes[i], maxWashLine) + a;
  }

  const dp = Array.from({ length: DN + 1 }, () =>
    new Array(maxWashLine + 1).fill(0)
  );

  for (let index = DN - 1; index >= 0; index--) {
    for (let washLine = 0; washLine <= maxWashLine; washLine++) {
      const washTime = Math.max(drinkTimes[index], washLine) + a;
      //说明当前洗涤时间超过了最大洗涤时间
      if (washTime > maxWashLine) {
        continue;
      }
      const otherTime = dp[index + 1][washTime];
      const p1 = Math.max(washTime, otherTime);

      //选择风干杯子
      const dryTime = drinkTimes[index] + b;
      const otherDryTime = dp[index + 1][washLine];
      const p2 = Math.max(dryTime, otherDryTime);

      dp[index][washLine] = Math.min(p1, p2);
    }
  }

  return dp[0][0];
}

class Machine {
  constructor(t, w) {
    this.timePoint = t;
    this.workTime = w;
  }
}

const minTime2 = (arr, n, a, b) => {
  // PriorityQueue<Machine> heap = new PriorityQueue<Machine>(new MachineComparator());
  const heap = new Heap(
    (m1, m2) => m1.timePoint + m1.workTime - (m2.timePoint + m2.workTime)
  );
  for (let i = 0; i < arr.length; i++) {
    heap.push(new Machine(0, arr[i]));
  }
  const drinks = new Array(n).fill(0);
  for (let i = 0; i < n; i++) {
    const cur = heap.pop();
    cur.timePoint += cur.workTime;
    drinks[i] = cur.timePoint;
    heap.push(cur);
  }
  return bestTimeDp(drinks, a, b);
};

const bestTimeDp = (drinks, wash, air) => {
  const N = drinks.length;
  let maxFree = 0;
  for (let i = 0; i < drinks.length; i++) {
    maxFree = Math.max(maxFree, drinks[i]) + wash;
  }
  const dp = new Array(N + 1).fill(0).map(() => new Array(maxFree + 1).fill(0));
  for (let index = N - 1; index >= 0; index--) {
    for (let free = 0; free <= maxFree; free++) {
      const selfClean1 = Math.max(drinks[index], free) + wash;
      if (selfClean1 > maxFree) {
        break; // 因为后面的也都不用填了
      }
      // index号杯子 决定洗
      const restClean1 = dp[index + 1][selfClean1];
      const p1 = Math.max(selfClean1, restClean1);
      // index号杯子 决定挥发
      const selfClean2 = drinks[index] + air;
      const restClean2 = dp[index + 1][free];
      const p2 = Math.max(selfClean2, restClean2);
      dp[index][free] = Math.min(p1, p2);
    }
  }
  return dp[0][0];
};

//example

console.log(minTime([1, 2, 3], 3, 3, 2)); // 4
console.log(minTime2([1, 2, 3], 3, 3, 2)); // 4
