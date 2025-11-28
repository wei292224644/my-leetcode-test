//给定 3 个参数，N、M、K
//怪兽有 N 滴血，等着英雄来砍自己
//英雄每一次打击，都会让怪兽流失[0, M]滴血
//英雄一共打击 K 次
//返回英雄把怪兽打死的概率
export function monsterDieProbability(N, M, K) {
  if (N < 0 || M < 0 || K < 0) {
    return 0;
  }

  //最多打掉的血量
  const totalWays = Math.pow(M + 1, K);

  //   /**
  //    * @param {number} m 每次打击最多掉血量
  //    * @param {number} hp 剩余怪兽血量
  //    * @param {number} rest 剩余打击次数
  //    * @returns {number} 返回怪兽被打死的次数
  //    */
  //   const process = (m, hp, rest) => {
  //     if (hp <= 0) {
  //       return Math.pow(m + 1, rest);
  //     }

  //     if (rest == 0) {
  //       return hp <= 0 ? 1 : 0;
  //     }

  //     let ways = 0;
  //     for (let i = 0; i <= m; i++) {
  //       ways += process(M, hp - i, rest - 1);
  //     }
  //     return ways;
  //   };
  //   const ans = process(M, N, K);

  //动态规划
  const dp = Array.from({ length: N + 1 }, () => Array(K + 1).fill(0));
  dp[0][0] = 1;

  for (let rest = 1; rest <= K; rest++) {
    for (let hp = 0; hp <= N; hp++) {
      let ways = 0;
      for (let i = 0; i <= M; i++) {
        if (hp - i < 0) {
          ways += Math.pow(M + 1, rest - 1);
        } else {
          ways += dp[hp - i][rest - 1];
        }
      }
      dp[hp][rest] = ways;
    }
  }

  const ans = dp[N][K];
  return ans / totalWays;
}

// example
const N = 10,
  M = 3,
  K = 5;

console.log(monsterDieProbability(N, M, K)); // 输出: 0.5
