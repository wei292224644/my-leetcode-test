/**
 * @param {number} numRows
 * @return {number[][]}
 */
var generate = function (numRows) {
  const trangles = [];

  const process = (num) => {
    if (num == 1) {
      return [1];
    }
    if (num == 2) {
      return [1, 1];
    }

    const results = [];

    const mid = num >> 1;

    return results;
  };

  return trangles;
};

// Example usage:
console.log(generate(5)); // Output: [[1],[1,1],[1,2,1],[1,3,3,1],[1,4,6,4,1]]
console.log(generate(1)); // Output: [[1]]
console.log(generate(6)); // Output: [[1],[1,1],[1,2,1],[1,3,3,1],[1,4,6,4,1],[1,5,10,10,5,1]]
// Example usage:                                 1+1    1+2        1+2+3      1+2+3+4  1+2+3+4+5
//                                     1    2      3      4          5         6
//                                     0    0      1      2          2         3