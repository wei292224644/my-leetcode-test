/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
var threeSumClosest = function (nums, target) {
  if (nums.length < 3) return null;

  nums = nums.sort((a, b) => a - b);

  //计算第一次的和
  let closestSum = nums[0] + nums[1] + nums[2];
  if (closestSum === target) return closestSum;

  for (let i = 0; i < nums.length - 2; i++) {
    let L = i + 1;
    let R = nums.length - 1;

    while (L < R) {
      //计算当前和
      const currentSum = nums[i] + nums[L] + nums[R];

      //如何当前和等于目标值，直接返回
      if (currentSum === target) {
        return currentSum; // Found the exact target sum
      }

      //如果当前和更接近目标值，更新最近的和
      if (Math.abs(currentSum - target) < Math.abs(closestSum - target)) {
        closestSum = currentSum;
      }

      //如果当前和小于目标值，左指针右移以增加和，反之减少
      if (currentSum < target) {
        L++;
      } else {
        R--;
      }
    }
  }

  return closestSum;
};

//example

console.log(threeSumClosest([-1, 2, 1, -4], 1)); // 2 // The sum that is closest to the target is 2. (-1 + 2 + 1 = 2)
console.log(threeSumClosest([0, 0, 0], 1)); // 0
