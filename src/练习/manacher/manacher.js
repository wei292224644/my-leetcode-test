//计算字符串的最长回文子串长度，时间复杂度O(n)
function manacher(str) {
  if (str == null || str.length === 0) {
    return 0;
  }

  //预处理字符串
  const manacherStr = (str) => {
    const res = [];
    res.push("#");
    for (let i = 0; i < str.length; i++) {
      res.push(str[i]);
      res.push("#");
    }
    return res.join("");
  };
  const s = manacherStr(str);
  const N = s.length;

  //记录每个位置的回文半径
  let pArr = new Array(N).fill(0);

  let C = -1; //回文中心
  let R = -1; //回文右边界再往右的一个位置
  let max = Number.MIN_SAFE_INTEGER;

  for (let i = 0; i < N; i++) {
    //i在R的范围内
    //利用对称性
    //i关于C的对称点为2*C-i
    //R - i表示i到R的距离
    //解释：
    //pArr[2*C - i]表示i关于C的对称点的回文半径
    //R - i表示i到R的距离 及pArr[i]至少能达到的回文半径
    //取二者的最小值
    pArr[i] = R > i ? Math.min(pArr[2 * C - i], R - i) : 1;

    //尝试扩展回文半径
    // i+pArr[i] < N 保证右边界不越界
    // i - pArr[i] > -1 保证左边界不越界
    while (i + pArr[i] < N && i - pArr[i] > -1) {
      //判断当前字符的左右字符是否相等
      if (s[i + pArr[i]] == s[i - pArr[i]]) {
        pArr[i]++;
      } else {
        break;
      }
    }

    //更新R和C
    if (i + pArr[i] > R) {
      R = i + pArr[i];
      C = i;
    }

    //更新max
    max = Math.max(max, pArr[i]);
  }

  //回文子串的长度等于回文半径-1
  //   return max == Number.MIN_SAFE_INTEGER ? 0 : max - 1;

  if (max == Number.MIN_SAFE_INTEGER) {
    return "";
  } else {
    //找到最长回文子串
    const centerIndex = pArr.indexOf(max);
    const start = (centerIndex - (max - 1)) >> 1;
    const end = (centerIndex + (max - 1)) >> 1;

    return str.substring(start, end);
  }
}

function manacherTest(str) {
  if (str == null || str.length === 0) {
    return 0;
  }

  const manacherStr = (str) => {
    let res = [];
    res.push("#");
    for (let i = 0; i < str.length; i++) {
      res.push(str[i]);
      res.push("#");
    }
    return res.join("");
  };

  const s = manacherStr(str);
  const N = s.length;

  const pArr = Array(N).fill(0);

  let C = -1;
  let R = -1;
  let max = Number.MIN_SAFE_INTEGER;

  for (let i = 0; i < N; i++) {
    pArr[i] = R > i ? Math.min(R - i, pArr[2 * C - i]) : 1;

    while (i + pArr[i] < N && i - pArr[i] > -1) {
      if (s[i + pArr[i]] == s[i - pArr[i]]) {
        pArr[i]++;
      } else {
        break;
      }
    }

    if (i + pArr[i] > R) {
      R = i + pArr[i];
      C = i;
    }

    max = Math.max(max, pArr[i]);
  }

  return max == Number.MIN_SAFE_INTEGER ? -1 : max - 1;
}

// example
console.log(manacherTest("abcdckstskcdcba")); // 15
