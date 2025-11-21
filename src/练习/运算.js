const add = (a, b) => {
  let sum = a;

  while (b !== 0) {
    sum = a ^ b;
    b = (a & b) << 1;
    a = sum;
  }
  return sum;
};

const minus = (a, b) => {
  return add(a, add(~b, 1));
};

const muti = (a, b) => {
  let res = 0;
  while (b !== 0) {
    if ((b & 1) !== 0) {
      res = add(res, a);
    }
    a <<= 1;
    b >>>= 1;
  }
  return res;
};

const isNeg = (n) => {
  return n < 0;
};

const negNum = (n) => {
  return add(~n, 1);
};

const div = (a, b) => {
  let x = isNeg(a) ? negNum(a) : a;
  let y = isNeg(b) ? negNum(b) : b;

  let res = 0;
  for (let i = 30; i >= 0; i = minus(i, 1)) {
    if (x >> i >= y) {
      res = res | (1 << i);
      x = minus(x, y << i);
    }
  }

  return isNeg(a) ^ isNeg(b) ? negNum(res) : res;
};

const divide = (a, b) => {
  if (a === Number.MIN_VALUE && b == Number.MIN_VALUE) {
    return 1;
  }
  if (b === Number.MIN_VALUE) {
    return 0;
  }
  if (a === Number.MIN_VALUE) {
    if (b == negNum(1)) {
      return Number.MAX_VALUE;
    }
    // a/b
    // a+1/b =c
    // a - (b*c) = d
    // d/b = e
    // a/b = c+e
    let c = div(add(a, 1), b);
    return add(c, div(minus(a, muti(c, b)), b));
  }
  return div(a, b);
};

let now = performance.now();
console.log(divide(16584, 22));
console.log(performance.now() - now);

now = performance.now();
console.log(16584 / 22);
console.log(performance.now() - now);
