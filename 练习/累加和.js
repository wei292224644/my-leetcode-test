const sum = (a, b) => a + b;

const H = [];

const arr = [1, 2, 5, 3, 1, -3, 4, 7, -2];

for (let i = 0; i < arr.length; i++) {
  if (i === 0) {
    H[i] = arr[i];
  } else {
    H[i] = sum(H[i - 1], arr[i]);
  }
}

//获取区间和
const getRangeSum = (L, R) => {
  if (L === 0) {
    return H[R];
  }

  return H[R] - H[L - 1];
};

console.log(getRangeSum(2, 5)); // 6
console.log(getRangeSum(0, 3)); // 11
console.log(getRangeSum(4, 8)); // 7
