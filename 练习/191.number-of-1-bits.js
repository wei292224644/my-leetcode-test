/**
 * @param {number} n
 * @return {number}
 */
var hammingWeight = function (n) {
  let count = 0;

  while (n > 0) {
    if (n & 1) {
      count++;
    }
    n >>>= 1;
  }

  return count;
};

// Example usage:
console.log(hammingWeight(11)); // 3
console.log(hammingWeight(128)); // 1
console.log(hammingWeight(4294967293)); // 31
console.log(hammingWeight(0)); // 0
console.log(hammingWeight(1)); // 1
