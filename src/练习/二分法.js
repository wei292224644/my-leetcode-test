/**
 * 在有序数组内找到num
 */

const binarySearch = (arr, num) => {
  let left = 0;
  let length = arr.length;
  let right = length - 1;

  do {
    let center = Math.floor((right - left) / 2) + left;
    let value = arr[center];

    if (value == num) {
      return true;
    } else if (value < num) {
      left = center + 1;
    } else {
      right = center - 1;
    }
  } while (left <= right);

  return false;
};

/**
 * 在有序数组中找到>=num的最左的位置
 */

const binarySearchLeft = (arr, num) => {
  let left = 0;
  let length = arr.length;
  let right = length - 1;
  let ans = -1;

  do {
    let center = Math.floor((right - left) / 2) + left;
    let value = arr[center];

    if (value >= num) {
      ans = center;
      right = center - 1;
    } else {
      left = center + 1;
    }
  } while (left <= right);

  return ans;
};

/**
 * 在有序数组中找到<=num的最右的位置
 */
const binarySearchRight = (arr, num) => {
  let left = 0;
  let length = arr.length;
  let right = length - 1;

  let ans = -1;

  do {
    let center = Math.floor((right - left) / 2) + left;
    let value = arr[center];

    if (value <= num) {
      ans = center;
      left = center + 1;
    } else {
      right = center - 1;
    }
  } while (left <= right);

  return ans;
};

/**
 * 局部最小值问题
 */

const oneMinIndex = (arr) => {
  if (arr == null || arr.length === 0) {
    return -1;
  }

  if (arr.length == 1) {
    return 0;
  }
  const length = arr.length;
  let left = 0;
  let right = length - 1;

  if (arr[0] < arr[1]) {
    return 0;
  }

  if (arr[length - 1] < arr[length - 2]) {
    return length - 1;
  }
  let ans = -1;
  do {
    let center = Math.floor((right - left) / 2) + left;
    let value = arr[center];
    if (value < arr[center - 1] && value < arr[center + 1]) {
      ans = center;
      break;
    } else {
      if (value > arr[center - 1]) {
        right = center - 1;
      } else {
        left = center + 1;
      }
    }
  } while (left <= right);

  return ans;
};

const randomArrays = (maxLength, maxValue) => {
  let len = Math.floor(Math.random() * maxLength);
  let arr = [];
  if (len > 0) {
    arr[0] = Math.floor(Math.random() * maxValue);
    for (let i = 1; i < len; i++) {
      do {
        arr[i] = Math.floor(Math.random() * maxValue);
      } while (arr[i] == arr[i - 1]);
    }
  }
  return arr;
};

let arr = [1, 3, 5, 7, 9, 11, 13, 15, 17, 19];

// console.log(binarySearch(arr, 18)); // true
// console.log(binarySearch(arr, 4)); // false

// console.log(binarySearchLeft(arr, 8)); // 4
// console.log(binarySearchLeft(arr, 1)); // 0
// console.log(binarySearchLeft(arr, 20)); // -1

// console.log(binarySearchRight(arr, 10));
// console.log(binarySearchRight(arr, 14));
// console.log(binarySearchRight(arr, 100));

arr = randomArrays(200, 1000);
// arr = [3, 2, 3, 2, 3, 4, 5, 6, 7, 8, 9];
console.log(arr);
console.log(oneMinIndex(arr));
