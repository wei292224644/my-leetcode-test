//汉洛塔问题是指
//有三根立柱A、B、C，其中A柱上从小到大套着n个大小不等的圆盘，
//现要求将A柱上的圆盘全部搬到C柱上，且在搬动过程中要遵循以下规则：
//1.每次只能移动一个圆盘；
//2.大盘不能放在小盘上面。
//请问如何搬动才能最少移动次数？

function hanoi(n) {
  // if (n < 1) return;

  // const process = (n, from, to, other) => {
  //   if (n == 1) {
  //     console.log(`Move 1 from ${from} to ${to}`);
  //     return;
  //   }
  //   //将 n-1 的圆盘从 from -> other
  //   process(n - 1, from, other, to);
  //   //将第 n 个圆盘从 from -> to
  //   console.log(`Move ${n} from ${from} to ${to}`);
  //   //将 n-1 的圆盘从 other -> to
  //   process(n - 1, other, to, from);
  // };

  // process(n, "left", "right", "mid");

  if (n < 1) return;

  const process = (num, from, to, other) => {
    if (num == 1) {
      console.log(`Move 1 from ${from} to ${to}`);
      return;
    }

    process(num - 1, from, other, to);
    console.log(`Move ${num} from ${from} to ${to}`);
    process(num - 1, other, to, from);
  };

  process(n, "left", "right", "mid");
}

//example
hanoi(3);
