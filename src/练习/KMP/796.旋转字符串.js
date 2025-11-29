/**
 * @param {string} s
 * @param {string} goal
 * @return {boolean}
 */
var rotateString = function (s, goal) {
  if (s == null || s.length == 0 || s.length !== goal.length) return false;

  if (s.length == 1) return s[0] == goal[0];
  if (s.length == 2) {
    return s[0] == goal[1] || s[0] == goal[0];
  }

  const str = s + s;

  let x = 0;
  let y = 0;
  const next = [];
  next[0] = -1;
  next[1] = 0;

  for (x = 2; x < goal.length; ) {
    if (goal[x - 1] == goal[y]) {
      next[x++] = ++y;
    } else if (y > 0) {
      y = next[y];
    } else {
      next[x++] = 0;
    }
  }
  x = 0;
  y = 0;

  while (x < str.length && y < goal.length) {
    if (str[x] == goal[y]) {
      x++;
      y++;
    } else if (next[y] == -1) {
      x++;
    } else {
      y = next[y];
    }
  }

  return y == goal.length;
};

// example

console.log(rotateString("abcde", "abced"));
