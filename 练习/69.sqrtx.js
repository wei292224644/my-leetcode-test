/**
 * https://leetcode.cn/problems/sqrtx/description/
 * @param {number} x
 * @return {number}
 */
var mySqrt = function (x) {
  let l = 0;
  let r = x;
  let ans = -1;

  while (l <= r) {
    let mid = l + ((r - l) >> 1);

    if (mid * mid <= x) {
      ans = mid;
      l = mid + 1;
    } else {
      r = mid - 1;
    }
  }

  return ans;
};

// example
console.log(mySqrt(4)); // 2
console.log(mySqrt(8)); // 2
console.log(mySqrt(0)); // 0
console.log(mySqrt(1)); // 1
console.log(mySqrt(2147395599)); // 46339