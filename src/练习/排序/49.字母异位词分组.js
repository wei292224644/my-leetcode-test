/**
 * @param {string[]} strs
 * @return {string[][]}
 */
// var groupAnagrams = function (strs) {
//   const map = new Map();

//   for (const str of strs) {
//     const chars = str.split("").sort();

//     const key = chars.join("");

//     if (!map.has(key)) {
//       map.set(key, []);
//     }
//     map.get(key).push(str);
//   }
//   return Array.from(map.values());
// };
function groupAnagrams(strs) {
  const map = new Map();

  for (let i = 0; i < strs.length; i++) {
    const count = new Array(26).fill(0);

    for (let char of strs[i]) {
      count[char.charCodeAt() - "a".charCodeAt()]++;
    }

    map.has(count) ? map.get(count).push(strs[i]) : map.set(count, [strs[i]]);
  }

  return Array.from(map.values());
}
//example
console.log(groupAnagrams(["eat", "tea", "tan", "ate", "nat", "bat"])); // [["eat","tea","ate"],["tan","nat"],["bat"]]
