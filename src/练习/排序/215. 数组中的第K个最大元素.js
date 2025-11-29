/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
var findKthLargest = function (nums, k) {
  const swap = (arr, i, j) => {
    const temp = arr[i];
    arr[i] = arr[j];
    arr[j] = temp;
  };

  const partition = (arr, left, right) => {
    let less = left - 1;
    let more = right;

    let index = left;

    while (index < more) {
      if (arr[index] < arr[right]) {
        swap(arr, ++less, index++);
      } else if (arr[index] == arr[right]) {
        index++;
      } else {
        swap(arr, index, --more);
      }
    }
    swap(arr, more, right);
    return [less + 1, more];
  };

  const quickSelect = (arr, left, right) => {
    if (left >= right) {
      return arr[left];
    }

    swap(arr, right, left + Math.floor(Math.random() * (right - left + 1)));

    const [less, more] = partition(arr, left, right);

    quickSelect(arr, left, less - 1);
    quickSelect(arr, more + 1, right);
  };

  quickSelect(nums, 0, nums.length - 1);
  return nums[nums.length - k];
};

// example usage:
console.log(findKthLargest([3, 2, 1, 5, 6, 4], 2)); // 5
