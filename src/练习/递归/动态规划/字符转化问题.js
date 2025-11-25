//26英文字母转换成对应的数字序列，例如A->1，B->2，...，Z->26，
//那么字符串"AB"可以转换成数字序列"12"（A->1，B->2）或者"1 2"（AB->12），
//给定一个数字字符串str，返回有多少种不同的转换结果？
function numberOfWays(str) {
  if (!str || str.length === 0) return 0;

  const process = (str, index) => {
    if (index === str.length) {
      return 1; //说明返回一种可能性
    }

    //如果字符i位置为0，说明决策是错误的。
    if (str[index] == 0) {
      return 0;
    }
    let ways = process(str, index + 1); //单字符转换

    //双字符转换
    if (
      index + 1 < str.length &&
      (str[index] === "1" ||
        (str[index] === "2" && str[index + 1] >= "0" && str[index + 1] <= "6"))
    ) {
      ways += process(str, index + 2);
    }
    return ways;
  };

  return process(str, 0);
}

function numberOfWaysDP(str) {
  if (!str || str.length === 0) return 0;
  const N = str.length;
  const dp = Array(N + 1).fill(0);

  const process = (str, index) => {
    if (dp[index] !== 0) {
      return dp[index];
    }
    if (index === str.length) {
      return 1; //说明返回一种可能性
    }

    //如果字符i位置为0，说明决策是错误的。
    if (str[index] == 0) {
      return 0;
    }
    let ways = process(str, index + 1); //单字符转换

    //双字符转换
    if (
      index + 1 < str.length &&
      (str[index] === "1" ||
        (str[index] === "2" && str[index + 1] >= "0" && str[index + 1] <= "6"))
    ) {
      ways += process(str, index + 2);
    }
    dp[index] = ways;
    return ways;
  };

  return process(str, 0, dp);
}

function numberOfWaysDP2(str) {
  if (!str || str.length === 0) return 0;
  const N = str.length;
  const dp = Array(N + 1).fill(0);
  dp[N] = 1; //base case

  for (let index = N - 1; index >= 0; index--) {
    if (str[index] === "0") {
      dp[index] = 0;
      continue;
    }
    // let ways = process(str, index + 1); //单字符转换

    // //双字符转换
    // if (
    //   index + 1 < str.length &&
    //   (str[index] === "1" ||
    //     (str[index] === "2" && str[index + 1] >= "0" && str[index + 1] <= "6"))
    // ) {
    //   ways += process(str, index + 2);
    // }
    // dp[index] = ways;

    let ways = dp[index + 1]; //单字符转换

    //双字符转换
    if (
      index + 1 < str.length &&
      (str[index] === "1" ||
        (str[index] === "2" && str[index + 1] >= "0" && str[index + 1] <= "6"))
    ) {
      ways += dp[index + 2];
    }
    dp[index] = ways;
  }

  return dp[0];
}

//example
console.log(numberOfWays("1111")); //3
console.log(numberOfWaysDP("1111")); //3
console.log(numberOfWaysDP2("1111")); //3
