/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[][]}
 */
var fourSum = function (nums, target) {
  if (nums.length < 4) return [];

  nums = nums.sort((a, b) => a - b);

  const res = [];

  for (let i = 0; i < nums.length; i++) {
    if (i > 0 && nums[i] == nums[i - 1]) continue;

    for (let j = i + 1; j < nums.length; j++) {
      if (j > i + 1 && nums[j] == nums[j - 1]) continue;

      let L = j + 1;
      let R = nums.length - 1;

      while (L < R) {
        if (nums[i] + nums[L] + nums[R] + nums[j] == target) {
          res.push([nums[i], nums[j], nums[L], nums[R]]);
          while (L < R && nums[L] == nums[L + 1]) L++;
          while (L < R && nums[R] == nums[R - 1]) R--;
          L++;
          R--;
        } else if (nums[i] + nums[L] + nums[R] + nums[j] > target) {
          R--;
        } else {
          L++;
        }
      }
    }
  }
  return res;
};

//example
// console.log(fourSum([1, 0, -1, 0, -2, 2], 0)); // [[-2,-1,1,2],[-2,0,0,2],[-1,0,0,1]]
console.log(fourSum([2, 2, 2, 2, 2], 8)); // [[2,2,2,2]]
