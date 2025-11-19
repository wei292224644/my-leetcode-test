const swap = (arr, i, j) => {
  const temp = arr[i];
  arr[i] = arr[j];
  arr[j] = temp;
};

const insertionSort = (arr) => {
  const n = arr.length;

  for (let i = 1; i < n; i++) {
    let key = arr[i];
    let j = i - 1;

    while (j >= 0 && arr[j] > key) {
      arr[j + 1] = arr[j];

      j--;
    }

    arr[j + 1] = key;
  }

  return arr;
};

// Example usage:
const array = [12, 11, 13, 5, 6];
insertionSort(array);
console.log("Sorted array:", array);
