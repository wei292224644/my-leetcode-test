/**
 * @param {number} columnNumber
 * @return {string}
 */
var convertToTitle = function (columnNumber) {
  if (columnNumber == 0) return "0";
  const hexChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const len = hexChars.length;
  let hex = "";

  while (columnNumber > 0) {
    let remainder = columnNumber % len;
    if (remainder === 0) remainder = len;
    hex = hexChars[remainder - 1] + hex;
    columnNumber = Math.floor((columnNumber - remainder) / len);
  }

  return hex;
};

// Example usage:
console.log(convertToTitle(1)); // "A"
console.log(convertToTitle(26)); // "Z"
console.log(convertToTitle(28)); // "AB"
console.log(convertToTitle(701)); // "ZY"
console.log(convertToTitle(52)); // "AZ"
console.log(convertToTitle(2147483647)); // "FXSHRXW"
