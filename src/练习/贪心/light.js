/**
 * 给定一个字符串str,只由'X'和'.'两种字符构成
 * 'X'表示墙，不能放灯，也不需要点亮
 * '.'表示居民点，可以放灯，需要点亮
 * 如果灯放在i位置，可以点亮i-1,i,i+1三个位置
 * 返回点亮str中所有'.'位置的最小灯数
 */

const light = (str) => {
  let arr = str.split("");

  let lightCount = 0;
  let i = 0;

  while (i < arr.length) {
    if (arr[i] === "X") {
      i++;
    } else {
      lightCount++;
      if (i + 1 >= arr.length) {
        break;
      } else {
        if (arr[i + 1] === "X") {
          i += 2;
        } else {
          i += 3;
        }
      }
    }
  }
  return lightCount;
};

//example

//暴力解法
const light2 = (str) => {
  let arr = str.split("");
};

// const streetLength = 100;
// const timeTimes = 100000;
// const generateRandomStreet = (length) => {
//   let str = "";

//   for (let i = 0; i < length; i++) {
//     str += Math.random() < 0.5 ? "X" : ".";
//   }

//   return str;
// };

// for (let i = 0; i < timeTimes; i++) {
//   const str = generateRandomStreet(streetLength);
//   const res = light(str);
// }

const str1 = ".X..X...X.";
console.log(light(str1)); //4
