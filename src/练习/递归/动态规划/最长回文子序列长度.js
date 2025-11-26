//给定一个字符串str, 返回这个字符串的最长回文子序列的长度。
//字符串的回文序列是指: 该序列正着读和反着读是一样的。
//例如: str = "a12b3c43def2ghi1kpm", 其中最长回文子序列为 "123c321"或者"1234321", 长度为7。

//str的逆序字符串str2, 求str和str2的最长公共子序列长度即为最长回文子序列长度
//这个是样本模型代码
/**
 *
 * @param {string} s
 * @returns
 */
function longestPalindromeSubseq(s) {
  if (s == null || s.length === 0) {
    return 0;
  }
  const str1 = s;
  const str2 = s.split("").reverse().join("");

  const m = str1.length;
  const n = str2.length;

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
      if (str1[i] === str2[j]) {
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
  //   const process = (str1, str2, i, j) => {
  //     if (i == str1.length || j == str2.length) return 0;

  //     let res = 0;

  //     if (str1[i] === str2[j]) {
  //       res = 1 + process(str1, str2, i + 1, j + 1);
  //     } else {
  //       const p1 = process(str1, str2, i + 1, j);
  //       const p2 = process(str1, str2, i, j + 1);
  //       res = Math.max(p1, p2);
  //     }
  //     return res;
  //   };

  //   return process(str1, str2, 0, 0);
}

//另外一种思路：
function longestPalindromeSubseq2(s) {
  if (s == null || s.length === 0) {
    return 0;
  }

  const process = (s, L, R) => {
    //相当于奇数字符串到达了中心点
    if (L == R) return 1;

    //相当于来到了偶数字符串中心点
    if (L === R - 1) {
      return s[L] == s[R] ? 2 : 1;
    }
    // 不以L 不以R结尾
    const p1 = process(s, L + 1, R - 1);
    // 不以R结尾
    const p2 = process(s, L, R - 1);
    // 不以L结尾
    const p3 = process(s, L + 1, R);

    // 以L和R结尾,前提是s[L]==s[R]
    const p4 = s[L] === s[R] ? 2 + process(s, L + 1, R - 1) : 0;

    return Math.max(p1, p2, p3, p4);
  };

  return process(s, 0, s.length - 1);
}

function longestPalindromeSubseq2DP(s) {
  if (s == null || s.length === 0) {
    return 0;
  }

  const n = s.length;

  const dp = Array.from({ length: n }, () => new Array(n).fill(0));

  dp[n - 1][n - 1] = 1;
  for (let i = 0; i < n - 1; i++) {
    dp[i][i] = 1;
    dp[i][i + 1] = s[i] === s[i + 1] ? 2 : 1;
  }

  for (let L = n - 3; L >= 0; L--) {
    for (let R = L + 2; R < n; R++) {
      //   // 不以L 不以R结尾
      //   const p1 = process(s, L + 1, R - 1);
      //   // 不以R结尾
      //   const p2 = process(s, L, R - 1);
      //   // 不以L结尾
      //   const p3 = process(s, L + 1, R);

      //   // 以L和R结尾,前提是s[L]==s[R]
      //   const p4 = s[L] === s[R] ? 2 + process(s, L + 1, R - 1) : 0;

      //   return Math.max(p1, p2, p3, p4);

      //   const p1 = dp[L + 1][R - 1];
      //   const p2 = dp[L][R - 1];
      //   const p3 = dp[L + 1][R];
      //   const p4 = s[L] === s[R] ? 2 + dp[L + 1][R - 1] : 0;

      dp[L][R] = Math.max(dp[L][R - 1], dp[L + 1][R]);
      if (s[L] === s[R]) {
        dp[L][R] = Math.max(dp[L][R], 2 + dp[L + 1][R - 1]);
      }

      //   dp[L][R] = Math.max(p1, p2, p3, p4);
    }
  }

  return dp[0][n - 1];
}

// example
// console.log(longestPalindromeSubseq("bbbab")); //4 ("bbbb")
// console.log(longestPalindromeSubseq("cbbd")); //2 ("bb")
console.log(longestPalindromeSubseq2DP("bbbab")); //4 ("bbbb")
