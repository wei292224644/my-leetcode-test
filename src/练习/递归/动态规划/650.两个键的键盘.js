//leetcode:https://leetcode.cn/problems/2-keys-keyboard/

// TODO
/**
 * @param {number} n
 * @return {number}
 */
var minSteps = function (n) {
  if (n === 1) return 0;

  /**
   *
   * @param {number} num 当前需要的字符数
   * @returns {number} 返回最小操作数
   */
  const process = (num) => {
    if (num === 0) return 0;
    let min = num; //最坏情况，全按A
    //尝试所有可能的分割点
    for (let i = 1; i <= Math.floor(num / 2); i++) {
      if (num % i === 0) {
        //i是num的因子
        //先得到i个A，再复制粘贴num/i -1次
        const steps = process(i) + num / i;
        min = Math.min(min, steps);
      }
    }

    return min;
  };

  return process(n);
};

//测试用例
console.log(minSteps(3)); //3
console.log(minSteps(1)); //0
console.log(minSteps(5)); //5
console.log(minSteps(9)); //6
