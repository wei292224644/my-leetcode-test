/**
 * @param {number[]} nums
 * @return {string}
 */
var largestNumber = function (nums) {
  nums.sort((a, b) => {
    return "" + b + a > "" + a + b ? 1 : -1;
  });

  if (nums[0] === 0) return "0";

  return nums.join("");
};
