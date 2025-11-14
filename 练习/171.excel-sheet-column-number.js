/**
 * @param {string} columnTitle
 * @return {number}
 */
var titleToNumber = function (columnTitle) {
  const hexChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const len = hexChars.length;
  const titleLength = columnTitle.length;

  let res = 0;
  for (let i = titleLength - 1; i >= 0; i--) {
    const char = columnTitle[i];
    const v = hexChars.indexOf(char) + 1;
    res += Math.pow(len, titleLength - i - 1) * v;
  }

  return res;
};

// Example usage:
console.log(titleToNumber("A")); // 1
console.log(titleToNumber("Z")); // 26
console.log(titleToNumber("AB")); // 28
console.log(titleToNumber("ZY")); // 701
console.log(titleToNumber("AZ")); // 52
console.log(titleToNumber("FXSHRXW")); // 2147483647
