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

    process(arr, l, mid);
    process(arr, mid + 1, r);
    merge(arr, l, mid, r);
  };

  process(nums1, 0, nums1.length - 1);

  const mid = (nums1.length - 1) >> 1;

  if (nums1.length % 2 == 0) {
    return (nums1[mid] + nums1[mid + 1]) / 2;
  }
  return nums1[mid];
};

// example usage:
console.log(findMedianSortedArrays([1, 3], [2])); // Output: 2.0
console.log(findMedianSortedArrays([1, 2], [3, 4])); // Output: 2.5
console.log(findMedianSortedArrays([0, 0], [0, 0])); // Output: 0.0
console.log(findMedianSortedArrays([], [1])); // Output: 1.0
console.log(findMedianSortedArrays([2], [])); // Output: 2.0
