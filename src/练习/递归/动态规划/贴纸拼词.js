//给定一个字符串str,给定一个字符串类型的数组arr,出现的字符都是小写英文arr每一个字符串，代表一张贴纸，你可以把单个字符剪开使用，目的是拼出str来，返回最少需要多少张贴纸，如果贴纸不能拼出str，返回-1
//例子：
//str="babac"
//arr=["ba","c","abcd"]
//答案是2，使用两张贴纸"ba","abcd"，把abcd剪开，拼出babac来，舍弃字符"d"
//leetcode上类似题目：691. 贴纸拼词
const AUnicode = "a".charCodeAt(0); // 97

function minStickersTest(stickers, str) {
  if (!stickers || stickers.length === 0 || !str || str.length === 0) {
    return -1;
  }

  const N = stickers.length;
  //把stickers 转换为词频序列
  const stickersCount = new Array(N);

  for (let i = 0; i < stickersCount.length; i++) {
    stickersCount[i] = new Array(26).fill(0);

    for (const char of stickers[i]) {
      stickersCount[i][char.charCodeAt(0) - AUnicode]++;
    }
  }

  const memo = new Map();

  //递归，返回当前rest最少需要多少贴纸
  const process = (stickers, rest) => {
    if (memo.has(rest)) return memo.get(rest);

    //base case
    if (rest.length == 0) return 0;

    const restCount = new Array(26).fill(0);
    for (let i = 0; i < rest.length; i++) {
      restCount[rest[i].charCodeAt(0) - AUnicode]++;
    }

    let min = Infinity;

    for (let i = 0; i < stickers.length; i++) {
      const sticker = stickers[i];

      //找到第一个可以使用的贴纸
      if (sticker[rest[0].charCodeAt(0) - AUnicode] > 0) {
        let str = "";

        for (let i = 0; i < 26; i++) {
          if (restCount[i] > 0) {
            const nums = restCount[i] - sticker[i];

            for (let j = 0; j < nums; j++) {
              str += String.fromCharCode(AUnicode + i);
            }
          }
        }

        min = Math.min(min, process(stickers, str));
      }
    }
    const ans = min + (min == Infinity ? 0 : 1);
    memo.set(rest, ans);
    return ans;
  };

  const ans = process(stickersCount, str);
  return ans === Infinity ? -1 : ans;
}

function minStickers(stickers, str) {
  if (!stickers || stickers.length === 0 || !str || str.length === 0) {
    return -1;
  }

  //剪掉贴纸上能拼出的字符，返回剩余字符组成的字符串
  const cut = (sticker, target) => {
    const s = sticker.split("");
    const t = target.split("");

    const count = new Array(26).fill(0);
    for (let i = 0; i < s.length; i++) {
      count[s[i].charCodeAt(0) - 97]++;
    }

    for (let i = 0; i < t.length; i++) {
      const charCode = t[i].charCodeAt(0) - 97;
      if (count[charCode] > 0) {
        count[charCode]--;
        t[i] = null; //表示该字符被剪掉了
      }
    }
    return t.filter((char) => char !== null).join("");
  };

  /**
   * @param {string[]} stickers 字符串类型数组
   * @param {string} target 当前字符串剩余的字符
   * @returns {number} 返回最小贴纸数量
   */
  const process = (stickers, target) => {
    if (target.length === 0) {
      return 0;
    }
    let min = Infinity;
    for (let i = 0; i < stickers.length; i++) {
      const sticker = stickers[i];
      //剪开贴纸，得到剩余字符
      const rest = cut(sticker, target);
      //说明当前贴纸有用
      if (rest.length !== target.length) {
        const next = process(stickers, rest);
        min = Math.min(min, next);
      }
    }
    return min + (min === Infinity ? 0 : 1);
  };
  const ans = process(stickers, str);
  return ans === Infinity ? -1 : ans;
}

/**
 *
 * @param {string} stickers
 * @param {string} str
 * @returns {number}
 */
function minStickers2(stickers, str) {
  if (!stickers || stickers.length === 0 || !str || str.length === 0) {
    return -1;
  }

  const n = stickers.length;
  const stickerCounts = new Array(n);
  for (let i = 0; i < n; i++) {
    stickerCounts[i] = new Array(26).fill(0);
    for (const char of stickers[i]) {
      stickerCounts[i][char.charCodeAt(0) - AUnicode]++;
    }
  }

  const process = (stickerGroup, target) => {
    if (target.length === 0) {
      return 0;
    }
    const targetCount = new Array(26).fill(0);
    for (const char of target) {
      targetCount[char.charCodeAt(0) - AUnicode]++;
    }

    let min = Infinity;
    for (let i = 0; i < stickerGroup.length; i++) {
      const sticker = stickerGroup[i];

      if (sticker[target[0].charCodeAt(0) - AUnicode] > 0) {
        let str = "";

        for (let i = 0; i < 26; i++) {
          if (targetCount[i] > 0) {
            const nums = targetCount[i] - sticker[i];

            for (let j = 0; j < nums; j++) {
              str += String.fromCharCode(AUnicode + i);
            }
          }
        }

        min = Math.min(min, process(stickerGroup, str));
      }
    }
    return min + (min === Infinity ? 0 : 1);
  };

  const ans = process(stickerCounts, str);
  return ans === Infinity ? -1 : ans;
}

function minStickers3(stickers, str) {
  if (!stickers || stickers.length === 0 || !str || str.length === 0) {
    return -1;
  }

  const n = stickers.length;
  const stickerCounts = new Array(n);
  for (let i = 0; i < n; i++) {
    stickerCounts[i] = new Array(26).fill(0);
    for (const char of stickers[i]) {
      stickerCounts[i][char.charCodeAt(0) - AUnicode]++;
    }
  }

  const memo = new Map();

  const process = (stickerGroup, target) => {
    if (target.length === 0) {
      return 0;
    }
    if (memo.has(target)) {
      return memo.get(target);
    }

    const targetCount = new Array(26).fill(0);
    for (const char of target) {
      targetCount[char.charCodeAt(0) - AUnicode]++;
    }

    let min = Infinity;
    for (let i = 0; i < stickerGroup.length; i++) {
      const sticker = stickerGroup[i];

      if (sticker[target[0].charCodeAt(0) - AUnicode] > 0) {
        let str = "";

        for (let i = 0; i < 26; i++) {
          if (targetCount[i] > 0) {
            const nums = targetCount[i] - sticker[i];

            for (let j = 0; j < nums; j++) {
              str += String.fromCharCode(AUnicode + i);
            }
          }
        }

        min = Math.min(min, process(stickerGroup, str));
      }
    }
    const ans = min + (min === Infinity ? 0 : 1);
    memo.set(target, ans);
    return ans;
  };

  const ans = process(stickerCounts, str);
  return ans === Infinity ? -1 : ans;
}

//example
console.log(minStickers(["ba", "c", "abcd"], "babac")); //2
console.log(minStickers2(["ba", "c", "abcd"], "babac")); //2
console.log(minStickersTest(["ba", "c", "abcd"], "babac")); //2
