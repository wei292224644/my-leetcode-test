//kmp 算法
//给定 str1 和 str2 两个字符串，返回 str2 在 str1 中出现的第一个位置，如果没有出现，返回 -1
//要求：时间复杂度 O(N+M) ，N 为 str1 的长度，M 为 str2 的长度
function kmpSearch(str1, str2) {
  if (
    str1 == null ||
    str2 == null ||
    str2.length < 1 ||
    str1.length < str2.length
  ) {
    return -1;
  }

  const l1 = str1.length;
  const l2 = str2.length;

  let x = 0;
  let y = 0;

  /**
   * 获取字符串的 next 数组
   * 例如 str = "ababc" , next = [-1,0,0,1,2]
   *            01234
   *
   解释：
   next[0] = -1 , 固定写法
   next[1] = 0 , 也是固定写法，"b" 没有前缀和后缀
   next[2] = 0 , "a" 和 "b" 比较没有相同的前后缀
                  0      1
   next[3] = 1 , "a" 和 "a" 相同， "ab"和 "ba" 不同，所以最长相同前后缀长度为 1
                  0      2         01    12
   next[4] = 2 , "a" 和 "b" 不同， "ab"和 "ab" 相同，"aba" 和 "bab" 不同，所以最长相同前后缀长度为 2
                  0      3         01    23        012      123

   规律：
   1. next 数组的长度和字符串的长度是一样的
   2. next[0] = -1 , next[1] = 0
   3. 从 i = 2 开始，next[i] 的值代表 str[0..i-1] 这个子串的最长前缀和后缀的相同长度
   4. 如果 str[i-1] == str[next[i-1]] , 则 next[i] = next[i-1] + 1
   5. 如果 str[i-1] != str[next[i-1]] , 则需要继续回溯，直到找到相等的字符或者回溯到 -1 为止
   6. 如果回溯到 -1 还没有找到相等的字符，则 next[i] = 0
   * @param {string} str 字符串
   * @returns {number[]} next数组
   */
  const getNextArray = (str) => {
    const len = str.length;

    if (len == 1) {
      return [-1];
    }

    const next = new Array(len);
    next[0] = -1;
    next[1] = 0;

    let i = 2;
    let cn = 0;
    while (i < len) {
      if (str[cn] == str[i - 1]) {
        // 匹配成功
        next[i++] = ++cn;
      } else if (cn > 0) {
        // 匹配失败，回溯
        cn = next[cn];
      } else {
        // 没有匹配到，且无法回溯
        next[i++] = 0;
      }
    }
    return next;
  };

  const next = getNextArray(str2);

  //开始匹配
  //解释：
  //1. 如果 str1[x] == str2[y] , 则 x++ , y++
  //2. 如果 str1[x] != str2[y] , 且 next[y] == -1 , 则 x++
  //3. 如果 str1[x] != str2[y] , 且 next[y] != -1 , 则 y = next[y]
  //4. 如果 y 到达 str2 的末尾，说明匹配成功，返回 x - y
  //5. 如果 x 到达 str1 的末尾，说明匹配失败，返回 -1
  //例如: str1 = "aacaab", str2 = "aab",str2 的 next 数组为 [-1,0,1]
  // x=0,y=0 -> a==a -> x=1,y=1
  // x=1,y=1 -> a==a -> x=2,y=2

  // x=2,y=2 -> c!=b -> next[2]=1 !=-1 -> y=1
  // x=2,y=1 -> c!=a -> next[1]=0 !=-1 -> y=0
  // x=2,y=0 -> c!=a -> next[0]=-1 ==-1 -> x=3

  // x=3,y=0 -> a==a -> x=4,y=1
  // x=4,y=1 -> a==a -> x=5,y=2
  // x=5,y=2 -> b==b -> x=6,y=3
  // y 到达 str2 末尾，匹配成功，返回 x - y = 6 - 3 = 3
  while (x < l1 && y < l2) {
    if (str1[x] == str2[y]) {
      //匹配到相同的字符
      x++;
      y++;
    }
    //匹配到不同的字符
    else if (next[y] == -1) {
      //跳转到next[0]的位置了，说明没有匹配成功
      x++;
    } else {
      //跳转到 next[y]的位置，继续匹配
      y = next[y];
    }
  }

  return y == l2 ? x - y : -1;
}

function kmpSearchTest(str1, str2) {
  if (
    str1 == null ||
    str2 == null ||
    str2.length < 1 ||
    str1.length < str2.length
  ) {
    return -1;
  }

  const getNextArray = (str) => {
    if (str.length == 1) {
      return [-1];
    }
    const len = str.length;

    const next = new Array(len);
    next[0] = -1;
    next[1] = 0;

    let i = 2;
    let cn = 0;

    while (i < len) {
      if (str[i - 1] == str[cn]) {
        next[i++] = ++cn;
      } else if (cn > 0) {
        cn = next[cn];
      } else {
        next[i++] = 0;
      }
    }

    return next;
  };

  const l1 = str1.length;
  const l2 = str2.length;

  let x = 0;
  let y = 0;

  const next = getNextArray(str2);

  while (x < l1 && y < l2) {
    if (str[x] == str[y]) {
      x++;
      y++;
    } else if (next[y] == -1) {
      x++;
    } else {
      y = next[y];
    }
  }
}

// example

console.log(kmpSearch("ababcababcabc", "abc")); // 2
