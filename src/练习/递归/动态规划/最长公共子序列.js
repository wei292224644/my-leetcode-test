//给定两个str1,str2,求str1和str2的最长公共子序列长度
//例如：
//str1="abcde",str2="ace"  返回3  "ace"
//str1="abc",str2="def"    返回0  ""

function longestCommonSubsequence(text1, text2) {
  if (!text1 || !text2 || text1.length === 0 || text2.length === 0) {
    return 0;
  }

  const process = (text1, text2, i, j) => {
    if (i == text1.length || j == text2.length) return 0;

    let res = 0;

    if (text1[i] === text2[j]) {
      res = 1 + process(text1, text2, i + 1, j + 1);
    } else {
      const p1 = process(text1, text2, i + 1, j);
      const p2 = process(text1, text2, i, j + 1);
      res = Math.max(p1, p2);
    }
    return res;
  };

  return process(text1, text2, 0, 0);
}

function longestCommonSubsequence2(text1, text2) {
  if (!text1 || !text2 || text1.length === 0 || text2.length === 0) {
    return 0;
  }

  const process = (text1, text2, i, j, dp) => {
    if (dp[i][j] !== -1) return dp[i][j];
    if (i == text1.length || j == text2.length) return 0;

    let res = 0;
    //当前字符相等时，res加1，并且i,j都向后移动一位
    if (text1[i] === text2[j]) {
      res = 1 + process(text1, text2, i + 1, j + 1, dp);
    } else {
      //尝试i向后移动一位，j不动
      const p1 = process(text1, text2, i + 1, j, dp);
      //尝试j向后移动一位，i不动
      const p2 = process(text1, text2, i, j + 1, dp);
      //当前字符不相等时，res取p1和p2的最大值
      res = Math.max(p1, p2);
    }
    dp[i][j] = res;
    return res;
  };

  const m = text1.length;
  const n = text2.length;

  const dp = Array.from({ length: m + 1 }, () => new Array(n + 1).fill(-1));

  for (let j = 0; j <= n; j++) {
    dp[m][j] = 0;
  }
  for (let i = 0; i <= m; i++) {
    dp[i][n] = 0;
  }

  return process(text1, text2, 0, 0, dp);
}

function longestCommonSubsequence3(text1, text2) {
  if (!text1 || !text2 || text1.length === 0 || text2.length === 0) {
    return 0;
  }

  const m = text1.length;
  const n = text2.length;

  const dp = Array.from({ length: m + 1 }, () => new Array(n + 1).fill(-1));

  for (let j = 0; j <= n; j++) {
    dp[m][j] = 0;
  }
  for (let i = 0; i <= m; i++) {
    dp[i][n] = 0;
  }

  for (let i = m - 1; i >= 0; i--) {
    for (let j = n - 1; j >= 0; j--) {
      let res = 0;

      if (text1[i] === text2[j]) {
        res = 1 + dp[i + 1][j + 1];
      } else {
        const p1 = dp[i + 1][j];
        const p2 = dp[i][j + 1];
        res = Math.max(p1, p2);
      }
      dp[i][j] = res;
    }
  }

  return dp[0][0];
}

//example
// console.log(longestCommonSubsequence("pmjghexybyrgzczy", "hafcdqbgncrcbihkd")); //4
console.log(longestCommonSubsequence2("pmjghexybyrgzczy", "hafcdqbgncrcbihkd")); //4
console.log(longestCommonSubsequence3("pmjghexybyrgzczy", "hafcdqbgncrcbihkd")); //4
// console.log(longestCommonSubsequence("abc", "def")); //0
