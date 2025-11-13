/**
 * @param {string} a
 * @param {string} b
 * @return {string}
 */
var addBinary = function (a, b) {
  let aLength = a.length;
  let bLength = b.length;
  let n = aLength > bLength ? aLength : bLength;

  let res = "";
  let needPlusOne = false;
  let index = 0;
  while (index < n) {
    const av = a[aLength - 1 - index] == "1" ? 1 : 0;
    const bv = b[bLength - 1 - index] == "1" ? 1 : 0;

    let v = av + bv + (needPlusOne ? 1 : 0);

    res = (v % 2) + res;
    needPlusOne = v > 1;

    index++;
  }

  if (needPlusOne) {
    res = "1" + res;
  }

  return res;
};

//example
console.log(addBinary("11", "1")); // "100"
console.log(addBinary("1010", "1011")); // "10101"
console.log(addBinary("1111", "1111")); // "11110"
