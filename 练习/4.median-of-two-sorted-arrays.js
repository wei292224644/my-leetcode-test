/**
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @return {number}
 */
var findMedianSortedArrays = function (nums1, nums2) {
  nums1.push(...nums2);

  const merge = (arr, l, mid, r) => {
    const helper = [];

    let L = l;
    let R = mid + 1;

    let ans = 0;

    //TODO

    while (L <= mid && R <= r) {
      if (arr[L] < arr[R]) {
        helper.push(arr[L]);
        L++;
      } else {
        helper.push(arr[R]);
        R++;
      }
    }

    while (L <= mid) {
      helper.push(arr[L]);
      L++;
    }

    while (R <= mid) {
      helper.push(arr[R]);
      R++;
    }

    for (let i = 0; i < helper.length; i++) {
      arr[l + i] = helper[i];
    }
  };

  const process = (arr, l, r) => {
    if (l == r) {
      return 0;
    }

    const mid = l + ((r - l) >> 1);

    return (
      (process(arr, l, mid) +
        process(arr, mid + 1, r) +
        merge(arr, l, mid, r)) /
      2
    );
  };

  return process(nums1, 0, nums1.length - 1);
};
