/**
 * @param {string} s
 * @param {string} t
 * @return {boolean}
 */
var isIsomorphic = function (s, t) {
  if (s.length !== t.length) return false;

  const a = new Map();
  const b = new Map();

  for (let i = 0; i < s.length; i++) {
    const sv = s[i];
    const tv = t[i];

    if (!a.has(sv)) {
      a.set(sv, tv);
    } else if (a.get(sv) !== tv) {
      return false;
    }

    if (!b.has(tv)) {
      b.set(tv, sv);
    } else if (b.get(tv) !== sv) {
      return false;
    }
  }

  return true;
};

// Example usage:
// console.log(isIsomorphic("egg", "add")); // true
// console.log(isIsomorphic("foo", "bar")); // false
// console.log(isIsomorphic("paper", "title")); // true
// console.log(isIsomorphic("ab", "aa")); // false
// console.log(isIsomorphic("a", "a")); // true
// console.log(
//   isIsomorphic("abcdefghijklmnopqrstuvwxyz", "abcdefghijklmnopqrstuvwxyz")
// ); // true
// console.log(
//   isIsomorphic("abcdefghijklmnopqrstuvwxyz", "zyxwvutsrqponmlkjihgfedcba")
// ); // true

console.log(isIsomorphic("babc", "baba")); // false
