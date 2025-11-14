/**
 * @param {number} n
 * @return {boolean}
 */
var isPowerOfTwo = function (n) {
  return n > 0 && (n & (n - 1)) === 0;
};

// Example usage:
console.log(isPowerOfTwo(8192)); // true
console.log(isPowerOfTwo(16)); // true
console.log(isPowerOfTwo(3)); // false
console.log(isPowerOfTwo(4)); // true
console.log(isPowerOfTwo(5)); // false
