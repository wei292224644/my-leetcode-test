/**
 * @param {number[]} nums
 * @return {number[][]}
 */
var threeSum = function (nums) {
  // if (nums.length < 3) return [];
  // const res = [];
  // nums = nums.sort((a, b) => a - b);

  // for (let i = 0; i < nums.length; i++) {
  //   if (nums[i] > 0) return res;

  //   if (i > 0 && nums[i] === nums[i - 1]) continue;

  //   let L = i + 1;
  //   let R = nums.length - 1;

  //   while (L < R) {
  //     if (nums[i] + nums[L] + nums[R] == 0) {
  //       res.push([nums[i], nums[L], nums[R]]);
  //       while (L < R && nums[L] == nums[L + 1]) L++;
  //       while (L < R && nums[R] === nums[R - 1]) R--;
  //       L++;
  //       R--;
  //     } else if (nums[i] + nums[L] + nums[R] > 0) {
  //       R--;
  //     } else {
  //       L++;
  //     }
  //   }
  // }

  // return res;

  if (nums.length < 3) return [];

  nums = nums.sort((a, b) => a - b);

  const res = [];

  for (let i = 0; i < nums.length; i++) {
    if (nums[i] > 0) return res;

    if (nums[i] == nums[i - 1]) continue;

    let L = i + 1;
    let R = nums.length - 1;

    while (L < R) {
      if (nums[i] + nums[L] + nums[R] == 0) {
        res.push([nums[i], nums[L], nums[R]]);

        while (L < R && nums[L] == nums[L + 1]) L++;
        while (L < R && nums[R] == nums[R - 1]) R--;
        L++;
        R--;
      } else if (nums[i] + nums[L] + nums[R] > 0) {
        R--;
      } else {
        L++;
      }
    }
  }

  return res;
};

// Example usage:
console.log(threeSum([-1, 0, 1, 2, -1, -4])); // [[-1,-1,2],[-1,0,1]]
console.log(threeSum([])); // []
console.log(threeSum([0])); // []
console.log(threeSum([0, 0, 0])); // [[0,0,0]]
console.log(threeSum([3, 0, -4, -1, -2, 1, 2])); // [[-4,1,3],[-2,-1,3],[-2,0,2],[-1,0,1]]
console.log(threeSum([-1, 0, 1]));
console.log(threeSum([0, 0, 0, 0]));
