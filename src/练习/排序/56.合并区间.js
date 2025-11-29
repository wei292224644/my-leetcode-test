/**
 * @param {number[][]} intervals
 * @return {number[][]}
 */
var merge = function (intervals) {
  if (intervals.length === 0) return [];

  intervals.sort((a, b) => a[0] - b[0]);

  const res = [];

  let next = 0;

  while (intervals.length) {
    const cur = intervals.shift();

    if (next == 0 || res[next - 1][1] < cur[0]) {
      res.push(cur);
      next++;
    } else {
      res[next - 1][1] = Math.max(res[next - 1][1], cur[1]);
    }
  }

  return res;
};

//example
console.log(
  merge([
    [1, 3],
    [2, 6],
    [8, 10],
    [15, 18],
  ])
); // [[1,6],[8,10],[15,18]]
console.log(
  merge([
    [1, 4],
    [4, 5],
  ])
); // [[1,5]]
