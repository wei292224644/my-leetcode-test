/**
 * @param {number[]} digits
 * @return {number[]}
 */
var plusOne = function (digits) {
  const n = digits.length;

  let needPlusOne = false;
  for (let i = n - 1; i >= 0; i--) {
    let lastValue = digits[i];
    if (i == n - 1) {
      lastValue++;
    }

    if (needPlusOne) {
      lastValue++;
      needPlusOne = false;
    }

    needPlusOne = lastValue / 10 >= 1;
    digits[i] = lastValue % 10;
  }

  if (needPlusOne) {
    digits.splice(0, 0, 1);
  }

  return digits;
};

// example
console.log(plusOne([1, 2, 3])); // [1,2,4]
console.log(plusOne([4, 3, 2, 1])); // [4,3,2,2]
console.log(plusOne([9])); // [1,0]
console.log(plusOne([9, 9, 9])); // [1,0,0,0]
