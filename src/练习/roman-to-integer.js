/**
 * @param {string} s
 * @return {number}
 */
var romanToInt = function (s) {
  const map = new Map();
  map.set("I", 1);
  map.set("V", 5);
  map.set("X", 10);
  map.set("L", 50);
  map.set("C", 100);
  map.set("D", 500);
  map.set("M", 1000);
  let ans = 0;

  for (let i = 0; i < s.length; i++) {
    const value = map.get(s[i]);

    const nextValue = i + 1 < s.length ? map.get(s[i + 1]) : 0;

    if (value < nextValue) {
      ans -= value;
    } else {
      ans += value;
    }
  }

  return ans;
};

// example
console.log(romanToInt("III")); // 3
console.log(romanToInt("IV")); // 4
console.log(romanToInt("IX")); // 9
console.log(romanToInt("LVIII")); // 58
console.log(romanToInt("MCMXCIV")); // 1994
