/**
 * @param {number} n
 * @return {number}
 */
var climbStairs = function (n) {
  let a = 1;
  let b = 1;
  let sum = 0;

  for (let i = 0; i < n - 1; i++) {
    sum = a + b;
    a = b;
    b = sum;
  }
  return b;
};

// example
console.log(climbStairs(1)); // 1
console.log(climbStairs(3)); // 3
console.log(climbStairs(4)); // 5
console.log(climbStairs(5)); // 8
console.log(climbStairs(6)); // 13
