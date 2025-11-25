//斐波那契数列
/**
 * 动态规划解法：时间复杂度O(n)，空间复杂度O(1)
 * 思路：
 * 1）从下到上计算每一个斐波那契数列的值，直到计算出第n个斐波那契数列的值
 * 2）每次计算只需要用到前两个斐波那契数列的值，因此只需要用两个变量来保存中间结果
 */
const fib = (n) => {
  if (n < 1) return 0;
  if (n === 1 || n === 2) return 1;

  let pre = 1; // F(1)
  let cur = 1; // F(2)
  let next = 0;

  for (let i = 3; i <= n; i++) {
    next = pre + cur; // F(n) = F(n-1) + F(n-2)
    pre = cur; // 更新 F(n-2)
    cur = next; // 更新 F(n-1)
  }
  return next;
};

//example
console.log(fib(5)); //5
console.log(fib(10)); //55
console.log(fib(20)); //6765
