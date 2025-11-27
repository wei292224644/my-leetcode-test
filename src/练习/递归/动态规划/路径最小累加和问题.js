//给定一个二维数组matrix,从左上角走到右下角,每一步只能向右或者向下,沿途经过的数字要累加起来,返回最小的路径和
//例如:
//[
//  [1,3,5,9],
//  [8,1,3,4],
//  [5,0,6,1],
//  [8,8,4,0]
//]
//路径1→3→1→0→6→1→0的和最小为12

export function minPathSum(matrix) {
  if (matrix == null || matrix.length === 0 || matrix[0].length === 0) {
    return 0;
  }

  const N = matrix.length;
  const M = matrix[0].length;

  //   const process = (matrix, x, y) => {
  //     if (x === N - 1 && y === M - 1) {
  //       return matrix[x][y];
  //     }

  //     // 到达最后一行只能向右走
  //     if (x === N - 1) {
  //       return matrix[x][y] + process(matrix, x, y + 1);
  //     }

  //     // 到达最后一列只能向下走
  //     if (y === M - 1) {
  //       return matrix[x][y] + process(matrix, x + 1, y);
  //     }

  //     // 向右和向下两条路径中选择较小的路径和
  //     const p1 = process(matrix, x + 1, y);
  //     const p2 = process(matrix, x, y + 1);
  //     return matrix[x][y] + Math.min(p1, p2);
  //   };

  //   return process(matrix, 0, 0);

  //   const dp = Array.from({ length: N }, () => Array(M).fill(0));
  //   dp[N - 1][M - 1] = matrix[N - 1][M - 1];
  //   //最后一行
  //   const lastRow = N - 1;
  //   const lastCol = M - 1;
  //   for (let i = M - 2; i >= 0; i--) {
  //     dp[lastRow][i] = matrix[lastRow][i] + dp[lastRow][i + 1];
  //   }
  //   //最后一列
  //   for (let j = N - 2; j >= 0; j--) {
  //     dp[j][lastCol] = matrix[j][lastCol] + dp[j + 1][lastCol];
  //   }

  //   for (let i = N - 2; i >= 0; i--) {
  //     for (let j = M - 2; j >= 0; j--) {
  //       dp[i][j] = matrix[i][j] + Math.min(dp[i + 1][j], dp[i][j + 1]);
  //     }
  //   }

  //   return dp[0][0];

  //动态规划-空间压缩
  const arr = new Array(M).fill(0);

  arr[M - 1] = matrix[N - 1][M - 1];

  for (let i = M - 2; i >= 0; i--) {
    arr[i] = matrix[N - 1][i] + arr[i + 1];
  }

  for (let i = N - 2; i >= 0; i--) {
    for (let j = M - 1; j >= 0; j--) {
      arr[j] = matrix[i][j] + Math.min(arr[j], arr[j + 1] || 0);
    }
  }

  return arr[0];
}

//example
console.log(
  minPathSum([
    [1, 3, 5, 9],
    [8, 1, 3, 4],
    [5, 0, 6, 1],
    [8, 8, 4, 0],
  ])
); //12
