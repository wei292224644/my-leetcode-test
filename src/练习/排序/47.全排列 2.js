/**
 * @param {number[]} nums
 * @return {number[][]}
 */
var permuteUnique = function (nums) {
  const res = [];

  nums.sort((a, b) => a - b);

  const process = (res, nums, visited, path) => {
    if (path.length === nums.length) {
      res.push([...path]);
      return;
    }
    for (let i = 0; i < nums.length; i++) {
      if (visited[i]) continue;
      if (i > 0 && nums[i] === nums[i - 1] && !visited[i - 1]) continue;

      visited[i] = true;
      path.push(nums[i]);
      process(res, nums, visited, path);
      path.pop();
      visited[i] = false;
    }
  };

  process(res, nums, Array(nums.length).fill(false), []);
  return res;
};

//example
console.log(permuteUnique([3, 3, 0, 3]));
// console.log(permuteUnique([1, 2, 3])); // [[1,2,3],[1,3,2],[2,1,3],[2,3,1],[3,1,2],[3,2,1]]
