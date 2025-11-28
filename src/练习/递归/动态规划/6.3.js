//N皇后问题是指在N×N的棋盘上要摆N个皇后，
//要求任何两个皇后不同行、不同列，也不在同一条斜线上，
//给定一个正数N，返回N皇后问题有多少种摆法。
//例如： N=1，返回1；N=2或3，返回0；N=8，返回92。

function NQueens(n) {
  //n小于1或大于32时，不合法，直接返回0
  //因为32位整数的二进制表示中只有32位，最多摆法会超过32位整数的表示范围
  if (n < 1) {
    return 0;
  }

  //观测row行之前的皇后的摆放情况，是否和当前要摆放的row行col列冲突
  const isValid = (row, col, record) => {
    for (let i = 0; i < row; i++) {
      if (record[i] == col || Math.abs(record[i] - col) == Math.abs(i - row)) {
        return false;
      }
    }
    return true;
  };

  const process = (n, row, record) => {
    if (row == n) {
      return 1;
    }
    let ways = 0;

    //尝试在row行的每一列摆放皇后
    for (let i = 0; i < n; i++) {
      if (isValid(row, i, record)) {
        // 在row行的i列摆放皇后
        record[row] = i;
        ways += process(n, row + 1, record);
      }
    }
    return ways;
  };

  const record = Array(n).fill(0); // record[i] = x 表示第i行的皇后放在了x列
  return process(n, 0, record);
}

function NQueens2(n) {
  if (n < 1 || n > 32) {
    return 0;
  }

  /**
   *
   * @param {number} limit 皇后占位符表示皇后数量
   * @param {number} colLim 之前皇后的列影响
   * @param {number} leftDiaLim  之前皇后的左下对角线影响
   * @param {number} rightDiaLim 之前皇后的右下对角线影响
   */
  const process = (limit, colLim, leftDiaLim, rightDiaLim) => {
    //所有皇后都摆放完了
    if (colLim === limit) {
      return 1;
    }

    // colLim =                                 0b0001000
    // leftDiaLim =                             0b0010000
    // rightDiaLim=                             0b0000100
    // limit =                                  0b1111111
    // colLim | leftDiaLim | rightDiaLim =      0b0011100
    // ~(colLim | leftDiaLim | rightDiaLim) =   0b1100011
    // pos = 0b1100011 & 0b1111111 = 0b1100011

    let pos = limit & ~(colLim | leftDiaLim | rightDiaLim);

    let mostRightOne = 0;
    let ways = 0;
    while (pos !== 0) {
      //提取最右侧的1
      mostRightOne = pos & -pos;
      pos = pos - mostRightOne;
      ways += process(
        limit,

        //更新列的影响
        colLim | mostRightOne,
        //左对角线影响左移一位
        (leftDiaLim | mostRightOne) << 1,
        //右对角线影响右移一位
        (rightDiaLim | mostRightOne) >>> 1
      );
    }
  };

  const limit = n == 32 ? -1 : (1 << n) - 1;
}

// example
console.log(NQueens(12)); // 14200
