const swap = (arr, i, j) => {
  const temp = arr[i];
  arr[i] = arr[j];
  arr[j] = temp;
};

/**
 * 冒泡排序
 */
function bubbleSort(arr) {
  const n = arr.length - 1;
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n - i; j++) {
      if (arr[j] > arr[j + 1]) {
        // 交换 arr[j] 和 arr[j + 1]
        swap(arr, j, j + 1);
      }
    }
  }
  return arr;
}

/**
 * 选择排序
 */
function selectionSort(arr) {
  const n = arr.length;
  for (let i = 0; i < n - 1; i++) {
    let minIndex = i;
    for (let j = i + 1; j < n; j++) {
      if (arr[j] < arr[minIndex]) {
        minIndex = j;
      }
    }
    // 交换 arr[i] 和 arr[minIndex]
    swap(arr, i, minIndex);
  }
  return arr;
}

/**
 * 插入排序
 */
function insertionSort(arr) {
  const n = arr.length;

  for (let i = 1; i < n; i++) {
    let j = i - 1;
    let key = arr[i];

    while (j >= 0 && arr[j] > key) {
      arr[j + 1] = arr[j];
      j--;
    }

    arr[j + 1] = key;
  }

  return arr;
}

/**
 * 归并排序
 */
function mergeSort(arr) {
  if (arr.length <= 1) {
    return arr;
  }

  const merge = (arr, left, mid, right) => {
    const helper = [];
    let l = left;

    let r = mid + 1;

    while (l <= mid && r <= right) {
      if (arr[l] <= arr[r]) {
        helper.push(arr[l]);
        l++;
      } else {
        helper.push(arr[r]);
        r++;
      }
    }

    while (l <= mid) {
      helper.push(arr[l]);
      l++;
    }

    while (r <= R) {
      helper.push(arr[r]);
      r++;
    }

    for (let i = 0; i < helper.length; i++) {
      arr[left + i] = helper[i];
    }
  };

  /**
   * 递归版本
   * @param {*} arr
   */
  const func = (arr) => {
    const process = (arr, l, r) => {
      if (l == r) {
        return;
      }
      // left + Math.floor((right-1) /2)
      const mid = l + ((r - 1) >> 1);

      process(arr, l, mid);
      process(arr.mid, r);
      merge(arr, l, mid, r);
    };

    if (arr == null || arr.length < 2) {
      return null;
    }

    process(arr, 0, arr.length - 1);
  };

  /**
   * (非递归版)
   * @param {*} arr
   */
  const func2 = (arr) => {
    const n = arr.length;

    const mergeSize = 1;

    while (mergeSize < n) {
      let left = 0;

      while (left < n) {
        const mid = left + mergeSize - 1;
        if (mid >= n) {
          break;
        }
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

  return func2(arr);
}

function mergeSortSmallSum(arr) {
  const merge = (arr, L, mid, R) => {
    const helper = [];

    let l = L;
    let r = mid + 1;
    let res = 0;
    while (l <= mid && r <= R) {
      res += arr[l] < arr[r] ? arr[l] * (R - r + 1) : 0;
      if (arr[l] < arr[r]) {
        helper.push(arr[l]);
        l++;
      } else {
        helper.push(arr[r]);
        r++;
      }
    }

    while (l <= mid) {
      helper.push(arr[l]);
      l++;
    }

    while (r <= mid) {
      helper.push(arr[r]);
      r++;
    }

    for (let i = 0; i < helper.length; i++) {
      const value = helper[i];

      arr[L + i] = value;
    }
    return res;
  };

  const process = (arr, L, R) => {
    if (L == R) {
      return 0;
    }
    const mid = L + ((R - L) >> 1);
    return (
      process(arr, L, mid) + process(arr, mid + 1, R) + merge(arr, L, mid, R)
    );
  };

  if (arr == null || arr.length < 2) {
    return 0;
  }

  return process(arr, 0, arr.length - 1);
}

const ary = [5, 3, 8, 6, 2, 7, 4];
console.log(mergeSortSmallSum(ary));
