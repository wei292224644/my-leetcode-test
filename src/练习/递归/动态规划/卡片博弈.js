//现在有一组数字，有先手玩家和后手玩家，两人轮流选择从数组的左侧或者右侧抽排，谁最后得分高谁获胜。
//请实现一个函数，输入一个数组，返回最大分数。
function firstWillWin(arr) {
  if (!arr || arr.length === 0) return 0;
  //先手函数
  const f = (arr, L, R) => {
    if (L === R) return arr[L];

    //拿走左侧牌
    const p1 = arr[L] + g(arr, L + 1, R);
    //拿走右侧牌
    const p2 = arr[R] + g(arr, L, R - 1);

    return Math.max(p1, p2);
  };

  //后手函数
  const g = (arr, L, R) => {
    if (L === R) return 0;

    //先手拿走左侧牌
    const p1 = f(arr, L + 1, R);
    //先手拿走右侧牌
    const p2 = f(arr, L, R - 1);

    return Math.min(p1, p2);
  };

  const first = f(arr, 0, arr.length - 1);
  const second = g(arr, 0, arr.length - 1);
  return Math.max(first, second);
}

function firstWillWin2(arr) {
  if (!arr || arr.length === 0) return 0;
  //先手函数
  const f = (arr, L, R, fmap, gmap) => {
    if (fmap[L][R] !== -1) {
      return fmap[L][R];
    }

    let ans = 0;
    if (L === R) {
      ans = arr[L];
    } else {
      //拿走左侧牌
      const p1 = arr[L] + g(arr, L + 1, R, fmap, gmap);
      //拿走右侧牌
      const p2 = arr[R] + g(arr, L, R - 1, fmap, gmap);
      ans = Math.max(p1, p2);
    }
    fmap[L][R] = ans;
    return ans;
  };

  //后手函数
  const g = (arr, L, R, fmap, gmap) => {
    if (gmap[L][R] !== -1) {
      return gmap[L][R];
    }

    let ans = 0;
    if (L !== R) {
      //先手拿走左侧牌
      const p1 = f(arr, L + 1, R, fmap, gmap);
      //先手拿走右侧牌
      const p2 = f(arr, L, R - 1, fmap, gmap);
      ans = Math.min(p1, p2);
    }
    gmap[L][R] = ans;
    return ans;
  };

  const fmap = Array.from({ length: arr.length }, () =>
    Array(arr.length).fill(-1)
  );
  const gmap = Array.from({ length: arr.length }, () =>
    Array(arr.length).fill(-1)
  );

  const first = f(arr, 0, arr.length - 1, fmap, gmap);
  const second = g(arr, 0, arr.length - 1, fmap, gmap);
  return Math.max(first, second);
}

function firstWillWin3(arr) {
  if (!arr || arr.length === 0) return 0;

  const N = arr.length;

  const fmap = Array.from({ length: N }, () => Array(N).fill(0));

  // fmap中的f(fmap[L][R])值 == Math.max(f[L]+g[L+1][R], f[R]+g[L][R-1])
  /**
   * fmap
   * ----0---1---2---3---4---R
   * 0 | 1 | 2 | 4 | 6 | 9 |
   * 1 |   | 2 | 3 | 6 | 8 |
   * 2 |   |   | 3 | 4 | 8 |
   * 3 |   |   |   | 4 | 5 |
   * 4 |   |   |   |   | 5 |
   * L
   */

  // gmap中的g(gmap[L][R])值 == Math.min(f[L+1][R], f[L][R-1])
  /**
   * gmap
   * ----0---1---2---3---4---R
   * 0 | 0 | 1 | 2 | 4 | 6 |
   * 1 |   | 0 | 2 | 3 | 6 |
   * 2 |   |   | 0 | 3 | 4 |
   * 3 |   |   |   | 0 | 4 |
   * 4 |   |   |   |   | 0 |
   * L
   */

  const gmap = Array.from({ length: N }, () => Array(N).fill(0));

  for (let i = 0; i < N; i++) {
    fmap[i][i] = arr[i];
  }

  for (let startCol = 1; startCol < N; startCol++) {
    let L = 0;
    let R = startCol;

    while (R < N) {
      //   const p1 = arr[L] + g(arr, L + 1, R);
      //   const p2 = arr[R] + g(arr, L, R - 1);
      //   return Math.max(p1, p2);
      fmap[L][R] = Math.max(arr[L] + gmap[L + 1][R], arr[R] + gmap[L][R - 1]);
      //   const p1 = f(arr, L + 1, R);
      //   const p2 = f(arr, L, R - 1);
      //   return Math.min(p1, p2);
      gmap[L][R] = Math.min(fmap[L + 1][R], fmap[L][R - 1]);
      L++;
      R++;
    }
  }
  //   const first = f(arr, 0, arr.length - 1);
  //   const second = g(arr, 0, arr.length - 1);
  //   return Math.max(first, second);
  return Math.max(fmap[0][N - 1], gmap[0][N - 1]);
}

// example
console.log(firstWillWin([1, 2, 3, 4, 5])); //9
console.log(firstWillWin2([1, 2, 3, 4, 5])); //9
console.log(firstWillWin3([1, 2, 3, 4, 5])); //9
