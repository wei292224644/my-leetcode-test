/**
 * @param {number} n
 * @return {number}
 */
var reverseBits = function (n) {
  let res = 0;
  for (let i = 0; i < 32; i++) {
    res |= (n & 1) << (31 - i);
    n >>= 1;
  }

  return res;
};

// example
console.log(reverseBits(43261596)); // 964176192
console.log(reverseBits(2147483644)); //1073741822
