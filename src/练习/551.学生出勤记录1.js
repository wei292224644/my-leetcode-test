/**
 * @param {string} s
 * @return {boolean}
 */
var checkRecord = function (s) {
  if (s == null || s.length < 2) return true;
  const len = s.length;

  let index = 0;
  let lateCount = 0;
  let absent = 0;
  while (index < len) {
    if (s[index] == "A") {
      lateCount++;
    }
    if (s[index] == "L") {
      absent++;
    } else {
      absent = 0;
    }

    if (lateCount >= 2) {
      return false;
    }

    if (absent >= 3) {
      return false;
    }
    index++;
  }

  return true;
};

//example
console.log(checkRecord("PPALLP")); // true
console.log(checkRecord("PPALLL")); // false
