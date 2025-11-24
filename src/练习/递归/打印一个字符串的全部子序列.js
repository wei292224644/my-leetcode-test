//打印一个字符串的全部子序列
// 子序列是指从一个字符串中删除零个或多个字符后，剩下的字符按原有顺序排列形成的新字符串。
function printSubsequences(str) {
  if (str == null || str.length === 0) {
    return "";
  }
  const res = [];
  // str 为传入的字符串
  // res 为输出的结果集
  // index 为当前来到字符串中的位置
  // path 为之前做出的选择所形成的子序列
  const process = (str, res, index, path) => {
    if (index == str.length) {
      res.push(path);
      return;
    }
    //不选择当前位置字符
    process(str, res, index + 1, path);
    //选择当前位置字符
    process(str, res, index + 1, path + str[index]);
  };

  process(str, res, 0, "");
  return res;
}

//去重版本
function printSubsequencesNoRepeat(str) {
  if (str == null || str.length === 0) {
    return "";
  }
  const res = new Set();
  // str 为传入的字符串
  // res 为输出的结果集
  // index 为当前来到字符串中的位置
  // path 为之前做出的选择所形成的子序列
  const process = (str, res, index, path) => {
    if (index == str.length) {
      res.add(path);
      return;
    }
    //不选择当前位置字符
    process(str, res, index + 1, path);
    //选择当前位置字符
    process(str, res, index + 1, path + str[index]);
  };

  process(str, res, 0, "");
  return res;
}
//example

console.log(Array.from(printSubsequencesNoRepeat("aacc"))); // "" "c" "b" "bc" "a" "ac" "ab" "abc"
