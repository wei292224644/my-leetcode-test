const swap = (arr, i, j) => {
  const temp = arr[i];
  arr[i] = arr[j];
  arr[j] = temp;
};

const partition = (arr, l, r) => {
  if (l > r) {
    return [-1, -1];
  }
  if (l === r) {
    return [l, r];
  }

  let less = l - 1;
  let more = r;

  let index = l;

  while (index < more) {
    if (arr[index] < arr[r]) {
      swap(arr, index++, ++less);
    } else if (arr[index] == arr[r]) {
      index++;
    } else {
      swap(arr, --more, index);
    }
  }
  swap(arr, r, more);

  return [less + 1, more];
};

const quickSort = (arr) => {
  if (arr == null || arr.length < 2) {
    return;
  }

  const process = (arr, l, r) => {
    if (l >= r) {
      return;
    }

    swap(arr, r, l + Math.floor(Math.random() * (r - l + 1))); //随机选取一个数作为划分值
    const [less, more] = partition(arr, l, r);
    process(arr, l, less - 1);
    process(arr, more + 1, r);
  };

  const n = arr.length;
  process(arr, 0, n - 1);
  return arr;
};

// Example usage:
const array = [34, 7, 23, 32, 5, 62];
console.log("Original array:", array);
quickSort(array);
console.log("Sorted array:", array);
