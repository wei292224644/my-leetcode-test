/**
 * @param {number[]} nums
 * @return {void} Do not return anything, modify nums in-place instead.
 */
var sortColors = function (nums) {
  const swap = (i, j) => {
    const temp = nums[i];
    nums[i] = nums[j];
    nums[j] = temp;
  };

  //快速排序
  const partition = (l, r) => {
    if (l > r) return [-1, -1];
    if (l == r) return [l, r];

    let less = l - 1;
    let more = r;

    let index = l;

    while (index < more) {
      if (nums[index] < nums[r]) {
        swap(index++, ++less);
      } else if (nums[index] == nums[r]) {
        index++;
      } else {
        swap(--more, index);
      }
    }

    swap(r, more);

    return [less + 1, more];
  };

  const process = (l, r) => {
    if (l >= r) return;

    const [less, more] = partition(l, r);

    process(l, less - 1);
    process(more + 1, r);
  };

  process(0, nums.length - 1);

  return nums;
};

//example
console.log(sortColors([2, 0, 2, 1, 1, 0])); // [0,0,1,1,2,2]
