/**
 * 一些项目要占用一个会议室宣讲，会议室不能同时容纳两个项目的宣讲。给你每个项目的开始时间和结束时间
 * 你来安排宣讲的日程，要求会议室进行的宣讲项目数量最多。返回最多的宣讲项目数量。
 */

class Program {
  constructor(start, end) {
    this.start = start;
    this.end = end;
  }
}

function bestArrange(plans) {
  if (plans.length === 0) {
    return 0;
  }
  const programs = plans.sort((a, b) => a.end - b.end || a.start - b.start);

  let timeline = 0;
  let sum = 0;
  for (let i = 0; i < programs.length; i++) {
    const program = programs[i];

    if (timeline <= program.start) {
      sum++;
      timeline = program.end;
    }
  }
  return sum;
}

//example

const generatePrograms = (programSize, timeMax) => {
  const programs = [];
  const size = Math.floor(Math.random() * programSize) + 1;
  for (let i = 0; i < size; i++) {
    const r1 = Math.floor(Math.random() * timeMax) + 1;
    const r2 = Math.floor(Math.random() * timeMax) + 1;
    const start = Math.min(r1, r2);
    const end = Math.max(r1, r2);
    programs.push(new Program(start, end));
  }
  return programs;
};

//暴力解法
const bestArrange1 = (plans) => {
  if (plans.length === 0 || plans == null) {
    return 0;
  }

  const copyButExcept = (ary, i) => {
    const res = [];
    for (let j = 0; j < ary.length; j++) {
      if (j !== i) {
        res.push(ary[j]);
      }
    }
    return res;
  };

  const process1 = (programs, done, timeline) => {
    if (programs.length === 0) {
      return done;
    }
    let max = done;

    for (let i = 0; i < programs.length; i++) {
      if (programs[i].start >= timeline) {
        const next = copyButExcept(programs, i);
        max = Math.max(max, process1(next, done + 1, programs[i].end));
      }
    }
    return max;
  };
  return process1(plans, 0, 0);
};

// const programSize = 12;
// const timeMax = 20;
// const timeTimes = 10000;

// for (let i = 0; i < timeTimes; i++) {
//   const plans = generatePrograms(programSize, timeMax);

//   const bestArrange1Result = bestArrange1(plans);
//   const bestArrangeResult = bestArrange(plans);
//   if (bestArrange1Result !== bestArrangeResult) {
//     console.log("Oops!");
//   }
// }
// console.log("test completed");

//example test
const programs = [];
programs.push(new Program(6, 11));
programs.push(new Program(16, 16));
programs.push(new Program(5, 17));
programs.push(new Program(20, 20));
programs.push(new Program(17, 20));

console.log(bestArrange(programs));
console.log(bestArrange1(programs));
