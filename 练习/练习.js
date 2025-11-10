/**
 * 找出数组中只出现技术次的两个数
 * @param {*} arr
 * @returns
 */
const func = (arr) => {
  let eor = 0;

  //由于其他数都出现了偶数次，所以最终异或结果就是那两个只出现奇数次的数的异或结果
  //eor = a ^ b
  for (let i = 0; i < arr.length; i++) {
    eor ^= arr[i];
  }

  //找出eor最右侧的1
  let rightOne = eor & -eor;

  let onlyOne = 0;
  for (let i = 0; i < arr.length; i++) {
    //根据最右侧的1将数组分成两部分，其中一部分包含其中一个只出现奇数次的数，因为其他数都是偶数次出现，所以最终获取的结果便是a或者b
    if ((arr[i] & rightOne) !== 0) {
      onlyOne ^= arr[i];
    }
  }
  return [onlyOne, eor ^ onlyOne];
};

const arr = [3, 5, 6, 3, 5, 7, 7, 9, 8, 8];

console.log(func(arr));

/**
 * 一个数组中有一个数出现k次，其他数都出现了m次，m>1且k<m，找到出现k次的数
 * 空间复杂度O(1) 时间复杂度O(N)
 * @param {*} arr
 * @param {*} k
 * @param {*} m
 * @returns
 */
const func2 = (arr, k, m) => {
  //统计每一位上1出现的次数
  const bitCounts = new Array(32).fill(0);
  for (let i = 0; i < arr.length; i++) {
    const num = arr[i];

    for (let j = 0; j < 32; j++) {
      //当前位上是1时，计数加1
      if (((num >> j) & 1) !== 0) {
        bitCounts[j]++;
      }
    }
  }
  let res = 0;
  for (let i = 0; i < 32; i++) {
    //对每一位上的计数取模
    bitCounts[i] %= m;

    //如果结果位上是k，则说明出现k次的数在该位上是1
    if (bitCounts[i] === k) {
      res |= 1 << i;
    } else if (bitCounts[i] !== 0) {
      //如果结果位上不是0或者k，说明输入不合法
      return -1;
    }
  }

  if (res == 0) {
    let count = 0;
    for (let i = 0; i < arr.length; i++) {
      if (arr[i] == 0) {
        count++;
      }
    }
    if (count != k) {
      return -1;
    }
  }
  return res;
};

const randomNumber = (range) => {
  return (
    Math.floor(Math.random() * range + 1) -
    Math.floor(Math.random() * range + 1)
  );
};

const generateArray = (maxKinds, range, k, m) => {
  const kindNumber = randomNumber(range);

  const times =
    Math.random() < 0.5 ? k : Math.floor(Math.random() * (m - 1) + 1);

  let numKinds = Math.floor(Math.random() * maxKinds) + 2;
  const arr = [];

  for (let i = 0; i < times; i++) {
    arr.push(kindNumber);
  }

  const set = new Set();
  set.add(kindNumber);
  numKinds--;
  while (numKinds !== 0) {
    let value;
    do {
      value = randomNumber(range);
    } while (set.has(value));

    set.add(value);
    numKinds--;
    for (let i = 0; i < m; i++) {
      arr.push(value);
    }
  }

  for (let i = 0; i < arr.length; i++) {
    const value = arr[i];
    const randomIndex = Math.floor(Math.random() * arr.length);
    arr[i] = arr[randomIndex];
    arr[randomIndex] = value;
  }
  return arr;
};

const rightFunc2 = (arr, k, m) => {
  const map = new Map();
  for (let i = 0; i < arr.length; i++) {
    map.set(arr[i], (map.get(arr[i]) || 0) + 1);
  }
  for (const [key, value] of map.entries()) {
    if (value === k) {
      return key;
    }
  }
  return -1;
};

const testFunc2 = () => {
  const maxKinds = 5;
  const range = 20;
  const max = 9;
  const testTimes = 1000;
  console.log("测试开始");

  for (let i = 0; i < testTimes; i++) {
    const a = Math.floor(Math.random() * max) + 1;
    const b = Math.floor(Math.random() * max) + 1;

    const k = Math.min(a, b);
    let m = Math.max(a, b);
    if (k === m) {
      m += 1;
    }
    const ary = generateArray(maxKinds, range, k, m);
    const ans = func2(ary, k, m);
    const res = rightFunc2(ary, k, m);
    if (ans !== res) {
      console.log("错误");
      console.log(ary);
      console.log(`k=${k},m=${m}`);
      console.log(ans);
      console.log(res);
    }
  }
  console.log("测试结束");
};

testFunc2();
