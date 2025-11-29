//给定一个数组 arr,要找出其中连续子数组的最大和,并返回该最大和。
//输入:arr = [-2,1,-3,4,-1,2,1,-5,4]
//输出:6
//解释:连续子数组 [4,-1,2,1] 的和最大,为 6 。

function maxSubArray(nums) {
  if (nums == null || nums.length == 0) return 0;

  //   let curSum = 0;
  //   let maxSum = Number.MIN_SAFE_INTEGER;

  //   for (let i = 0; i < nums.length; i++) {
  //     if (curSum < 0) {
  //       curSum = nums[i];
  //     } else {
  //       curSum += nums[i];
  //     }
  //     maxSum = Math.max(curSum, maxSum);
  //   }
  //   return maxSum == Number.MIN_SAFE_INTEGER ? 0 : maxSum;

  /**
   * 从中间划分，递归查找左侧和右侧的最大子数组和，然后计算左侧最大数组和右侧最大数组的和，比较三者的最大值
   * @param {number[]} arr 传入的数组
   * @param {number} L 左边界
   * @param {number} R 右边界
   * @returns {number} 最大子数组和
   */
  const process = (arr, L, R) => {
    if (L === R) return arr[L];

    const mid = L + ((R - L) >> 1);

    const leftMax = process(arr, L, mid);
    const rightMax = process(arr, mid + 1, R);

    let leftSum = 0;
    let leftMaxSum = -Infinity;
    for (let i = mid; i >= L; i--) {
      leftSum += arr[i];
      leftMaxSum = Math.max(leftMaxSum, leftSum);
    }

    let rightSum = 0;
    let rightMaxSum = -Infinity;
    for (let i = mid + 1; i <= R; i++) {
      rightSum += arr[i];
      rightMaxSum = Math.max(rightMaxSum, rightSum);
    }

    return Math.max(leftMax, rightMax, leftMaxSum + rightMaxSum);
  };

  return process(nums, 0, nums.length - 1);
}

// example

console.log(maxSubArray([-2, 1, -3, 4, -1, 2, 1, -5, 4])); // 输出: 6
