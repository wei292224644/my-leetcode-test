const merge = (arr, left, mid, right) => {
  const helper = [];

  let l = left;
  let r = mid + 1;

  while (l <= mid && r <= right) {
    if (arr[l] <= arr[r]) {
      helper.push(arr[l++]);
    } else {
      helper.push(arr[r++]);
    }
  }

  while (l <= mid) {
    helper.push(arr[l++]);
  }

  while (r <= mid) {
    helper.push(arr[r++]);
  }

  for (let i = 0; i < helper.length; i++) {
    arr[left + i] = helper[i];
  }
};

/**
 * 归并排序非递归版本
 */
const mergeSortTraversalIterative = (arr) => {
  const n = arr.length;

  let mergeSize = 1;

  while (mergeSize < n) {
    let left = 0;
    while (left < n) {
      const mid = left + mergeSize - 1;

      if (mid >= n) break;

      const right = Math.min(mid + mergeSize, n - 1);
      merge(arr, left, mid, right);
      left = right + 1;
    }

    if (mergeSize > n / 2) {
      break;
    }
    mergeSize <<= 1;
  }
};

const mergeSort = (arr) => {
  if (arr.length <= 1) {
    return arr;
  }

  const process = (arr, left, right) => {
    if (left >= right) {
      return;
    }

    const mid = left + ((right - left) >> 1);
    process(arr, left, mid);
    process(arr, mid + 1, right);
    merge(arr, left, mid, right);
  };

  process(arr, 0, arr.length - 1);
  return arr;
};

// Example usage:
const array = [38, 27, 43, 3, 9, 82, 10];
mergeSortTraversalIterative(array);
console.log("Sorted array:", array);

const array1 = [38, 27, 43, 3, 9, 82, 10];
mergeSort(array1);
console.log("Sorted array:", array1);
