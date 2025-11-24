//打印一个字符串的全部排序

function printAllPermutations(str) {
  const results = [];

  /**
   *
   * @param {string} str 传入的字符串
   * @param {string[]} res 存储结果的数组
   * @param {number} index 当前处理的索引
   * @param {string} path 当前路径
   * @returns
   */
  const process = (str, res, path) => {
    if (path.length === str.length) {
      res.push(path);
      return;
    }

    for (let i = 0; i < str.length; i++) {
      //如果当前路径已经包含该字符，则跳过
      if (path.includes(str[i])) continue;
      process(str, res, path + str[i]);
    }
  };

  process(str, results, "");

  return results;
}

function printAllPermutations2(str) {
  const results = [];

  const chars = str.split("");

  const swap = (chars, i, j) => {
    const temp = chars[i];
    chars[i] = chars[j];
    chars[j] = temp;
  };
  /**
   *
   * @param {string[]} chars 传入的字符数组
   * @param {number} index 当前处理的索引
   * @param {string[]} ans 存储结果的数组
   * @returns
   */
  const process = (chars, index, ans) => {
    if (index == chars.length) {
      ans.push(chars.join(""));
      return;
    }

    //尝试每一种可能的交换
    for (let i = index; i < chars.length; i++) {
      //交换index位置和i位置的字符
      swap(chars, index, i);
      //继续处理下一个位置
      process(chars, index + 1, ans);
      //还原交换
      swap(chars, index, i);
    }
  };

  process(chars, 0, results);

  return results;
}

function printAllPermutations2NoRepeat(str) {
  const results = [];

  const chars = str.split("");

  const swap = (chars, i, j) => {
    const temp = chars[i];
    chars[i] = chars[j];
    chars[j] = temp;
  };

  const process = (chars, index, ans) => {
    if (index == chars.length) {
      ans.push(chars.join(""));
      return;
    }
    const visited = new Set();
    //尝试每一种可能的交换
    for (let i = index; i < chars.length; i++) {
      if (visited.has(chars[i])) continue;
      visited.add(chars[i]);
      swap(chars, index, i);
      process(chars, index + 1, ans);
      swap(chars, index, i);
    }
  };

  process(chars, 0, results);
  return results;
}

//测试
console.log(printAllPermutations2("abcac"));
console.log(printAllPermutations2NoRepeat("abcac"));
//abc acb bac bca cab cba
