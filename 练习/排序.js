const swap = (arr, i, j) => {
  const temp = arr[i];
  arr[i] = arr[j];
  arr[j] = temp;
};

/**
 * 冒泡排序
 */
function bubbleSort(arr) {
  // const n = arr.length;

  // for (let i = 0; i < n - 1; i++) {
  //   for (let j = 0; j < n - 1; j++) {
  //     if (arr[j] > arr[j + 1]) {
  //       swap(arr, j, j + 1);
  //     }
  //   }
  // }

  // return arr;

  const n = arr.length;

  for (let i = 0; i < n - 1; i++) {
    for (let j = i; j < n - 1; j++) {
      if (arr[j] > arr[j + 1]) {
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
  // const n = arr.length;
  // for (let i = 0; i < n - 1; i++) {
  //   let minIndex = i;
  //   for (let j = i + 1; j < n; j++) {
  //     if (arr[j] < arr[minIndex]) {
  //       minIndex = j;
  //     }
  //   }
  //   // 交换 arr[i] 和 arr[minIndex]
  //   swap(arr, i, minIndex);
  // }
  // return arr;

  const n = arr.length;

  for (let i = 0; i < n - 1; i++) {
    let minIndex = i;
    for (let j = i + 1; j < n; j++) {
      if (arr[j] < arr[minIndex]) {
        minIndex = j;
      }
    }
    swap(arr, i, minIndex);
  }

  return arr;
}

/**
 * 插入排序
 */
function insertionSort(arr) {
  // const n = arr.length;

  // for (let i = 1; i < n; i++) {
  //   let j = i - 1;
  //   let key = arr[i];

  //   while (j >= 0 && arr[j] > key) {
  //     arr[j + 1] = arr[j];
  //     j--;
  //   }

  //   arr[j + 1] = key;
  // }

  // return arr;

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

//#region 归并排序

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
/**
 * 通过归并排序计算出小和（小和问题是指在一个数组中，每个元素左边比它小的元素之和的总和。）
 * @param {*} arr
 * @returns
 */
function mergeSortSmallSum(arr) {
  const merge = (arr, L, mid, R) => {
    const helper = [];

    let l = L;
    let r = mid + 1;

    let res = 0;
    let windowR = r;

    for (let i = 0; i < mid; i++) {
      while (windowR < R && arr[i] > arr[windowR] << 1) {
        windowR++;
      }
      res += windowR - mid - 1;
    }

    while (l <= mid && r <= R) {
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

/**
 * 归并排序计算出右侧数值是左侧数值两倍以上的对数
 */
function mergeSortBiggerThanRightTwice(arr) {
  function merge(arr, l, mid, r) {
    const helper = [];
    let L = l;
    let R = mid + 1;

    let windowR = R;

    let ans = 0;

    for (let i = L; i < mid; i++) {
      while (windowR < r && arr[i] > arr[windowR] << 1) {
        windowR++;
      }
      //减去左侧数列长度
      ans += windowR - mid - 1;
    }

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

    return ans;
  }

  function sort(arr) {
    if (arr == null || arr.length < 2) {
      return 0;
    }
    const process = (arr, l, r) => {
      if (l == r) {
        return 0;
      }

      const mid = l + ((r - l) >> 1);

      return (
        process(arr, l, mid) + process(arr, mid + 1, r) + merge(arr, l, mid, r)
      );
    };

    return process(arr, 0, arr.length - 1);
  }

  return sort(arr);
}

/**
 * 归并排序求数组中，值位于范围 [lower, upper] （包含 lower 和 upper）之内的 “区间和” 的个数 。
 * @param {*} arr
 * @param {*} lower
 * @param {*} upper
 * @returns
 */
function mergeSortCountOfRangeSum(arr, lower, upper) {
  function merge(arr, l, mid, r, lower, upper) {
    const helper = [];
    let L = l;
    let R = mid + 1;

    let ans = 0;
    let windowL = L;
    let windowR = L;

    console.log(`当前计算的区间为${l}-${mid}-${r}`);

    //遍历右侧数组
    for (let i = mid + 1; i <= r; i++) {
      const min = arr[i] - upper;
      const max = arr[i] - lower;

      while (windowR <= mid && arr[windowR] <= max) {
        windowR++;
      }

      while (windowL <= mid && arr[windowL] < min) {
        windowL++;
      }

      if (windowR - windowL > 0) {
        console.log(
          `最小值为${min}，最大值为${max}，当前所在索引为${i},区间为${windowL}-${windowR}`
        );
      }

      ans += windowR - windowL;
    }

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

    return ans;
  }

  function sort(arr, lower, upper) {
    const process = (arr, l, r, lower, upper) => {
      if (l == r) {
        if (arr[l] >= lower && arr[l] <= upper) {
          console.log(`当前情况是l==r,${l}`);
          return 1;
        }

        return 0;
      }

      const mid = l + ((r - l) >> 1);
      return (
        process(arr, l, mid, lower, upper) +
        process(arr, mid + 1, r, lower, upper) +
        merge(arr, l, mid, r, lower, upper)
      );
    };

    if (arr == null || arr.length < 2) {
      return 0;
    }

    const sumAry = [];
    sumAry[0] = arr[0];
    for (let i = 1; i < arr.length; i++) {
      sumAry[i] = arr[i] + sumAry[i - 1];
    }
    console.log("原始值为", arr);
    console.log("加和值为", sumAry);

    return process(sumAry, 0, arr.length - 1, lower, upper);
  }

  return sort(arr, lower, upper);
}

function mergeSortTest(arr) {
  const merge = (arr, l, mid, r) => {
    const helper = [];

    let L = l;
    let R = mid + 1;
    let ans = 0;
    let windowR = R;

    for (let i = l; i < mid; i++) {
      while (windowR < r && arr[i] > arr[windowR] << 1) {
        windowR++;
      }
      ans += windowR - mid - 1;
    }

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

    while (R <= r) {
      helper.push(arr[R]);
      R++;
    }

    for (let i = 0; i < helper.length; i++) {
      arr[l + i] = helper[i];
    }

    return ans;
  };
  //递归版本
  const sort = (arr) => {
    if (arr == null || arr.length < 2) {
      return;
    }

    const process = (arr, l, r) => {
      if (l == r) {
        return 0;
      }

      const mid = l + ((r - l) >> 1);

      return (
        process(arr, l, mid) + process(arr, mid + 1, r) + merge(arr, l, mid, r)
      );
    };

    return process(arr, 0, arr.length - 1);
  };

  return sort(arr);
}
//#endregion

//#region 快速排序

//双层划分，根据最后一个值当做划分区域，小于这个值的放左边，大于这个值的放右边
const partition = (arr) => {
  if (arr == null || arr.length < 2) return;

  const n = arr.length - 1;

  let l = -1;
  let r = n;
  let index = 0;

  while (index < r) {
    if (arr[index] <= arr[n]) {
      swap(arr, index, ++l);
    }
    index++;
  }
  swap(arr, ++l, n);
  return arr;
};

/**
 * 荷兰国旗问题(三层划分)，根据最后一个值当做划分区域，小于这个值的放左边，等于这个值的放中间，大于这个值的放右边
 * @param {*} arr
 */
const neterlandsFlag = (arr) => {
  if (arr == null || arr.length < 2) return [-1, -1];

  const n = arr.length - 1;

  let l = -1;
  let r = n;
  let index = 0;

  while (index < r) {
    if (arr[index] < arr[n]) {
      swap(arr, index, ++l);
      index++;
    } else if (arr[index] == arr[n]) {
      index++;
    } else {
      swap(arr, index, --r);
    }
  }
  swap(arr, r, n);
  return [l + 1, r];
};

const quickSort = (arr) => {
  // const sort = (arr, L, R) => {
  //   if (L > R) {
  //     return [-1, -1];
  //   }
  //   if (L == R) {
  //     return [L, R];
  //   }
  //   let less = L - 1;
  //   let more = R;
  //   let index = L;

  //   while (index < more) {
  //     if (arr[index] < arr[R]) {
  //       swap(arr, index, ++less);
  //       index++;
  //     } else if (arr[index] == arr[R]) {
  //       index++;
  //     } else {
  //       swap(arr, index, --more);
  //     }
  //   }

  //   swap(arr, more, R);

  //   return [less + 1, more];
  // };

  // const process = (arr, L, R) => {
  //   if (L >= R) {
  //     return;
  //   }

  //   //3.0 通过随机数来降低最坏情况的发生
  //   swap(arr, R, L + Math.floor(Math.random() * (R - L + 1)));
  //   const [flagL, flagR] = sort(arr, L, R);
  //   process(arr, L, flagL - 1);
  //   process(arr, flagR + 1, R);
  // };

  // if (arr == null || arr.length < 2) {
  //   return arr;
  // }

  // const n = arr.length - 1;
  // process(arr, 0, n);
  // return arr;

  const sort = (arr, l, r) => {
    if (l > r) {
      return [-1, -1];
    }
    if (l == r) {
      return [l, r];
    }

    let less = l - 1;
    let more = r;
    let index = l;

    while (less < more) {
      if (arr[index] < arr[r]) {
        swap(arr, index, ++less);
        index++;
      } else if (arr[index] == arr[r]) {
        index++;
      } else {
        swap(arr, index, --more);
      }
    }
    swap(arr, more, r);

    return [less + 1, more];
  };

  const process = (arr, l, r) => {
    if (l >= r) {
      return;
    }

    swap(arr, r, l + Math.floor(Math.random() * (r - l + 1)));

    const [flagL, flagR] = sort(arr, l, r);

    process(arr, l, flagL - 1);
    process(arr, flagR + 1, r);
  };

  if (arr == null || arr.length < 2) {
    return arr;
  }

  const n = arr.length - 1;
  process(arr, 0, n);
  return arr;
};

//#endregion

const ary = [5, 3, 2, 6, 2, 7, 9, 3];
//           5  8  16 22 24 31 35
console.log(quickSort(ary));
