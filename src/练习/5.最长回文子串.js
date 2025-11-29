/**
 * @param {string} s
 * @return {string}
 */
var longestPalindrome = function (s) {
  if (s.length < 2) return "";

  const mamacherStr = (str) => {
    const res = [];

    res.push("#");

    for (let i = 0; i < str.length; i++) {
      res.push(str[i]);
      res.push("#");
    }
    return res.join("");
  };

  const str = mamacherStr(s);
  const N = str.length;

  let C = -1;
  let R = -1;
  const pArr = new Array(N).fill(0);
  let max = Number.MIN_SAFE_INTEGER;
  for (let i = 0; i < N; i++) {
    pArr[i] = R > i ? Math.min(pArr[2 * C - i], R - i) : 1;

    while (i + pArr[i] < N && i - pArr[i] > -1) {
      if (str[i + pArr[i]] == str[i - pArr[i]]) {
        pArr[i]++;
      } else {
        break;
      }
    }

    if (i + pArr[i] > R) {
      R = i + pArr[i];
      C = i;
    }
    max = Math.max(max, pArr[i]);
  }
  if (max == Number.MIN_SAFE_INTEGER) return "";

  const centerIndex = pArr.indexOf(max);

  const start = (centerIndex - (max - 1)) >> 1;
  const end = (centerIndex + (max - 1)) >> 1;
  return s.substring(start, end);
};

// example
console.log(longestPalindrome("abbcccba")); // "bab" 或 "aba"
// console.log(longestPalindrome("cbbd")); // "bb"
