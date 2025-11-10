const randomOneToFive = () => {
  return Math.floor(Math.random() * 5) + 1;
};

const getRandom = () => {
  let oneToFive = randomOneToFive();

  if (oneToFive === 1 || oneToFive === 2) {
    return 0;
  }
  if (oneToFive === 4 || oneToFive === 5) {
    return 1;
  }
  return getRandom();
};

const randomZeroToSeven = () => {
  return (getRandom() << 2) + (getRandom() << 1) + getRandom();
};

const random = () => {
  let num = randomZeroToSeven();

  if (num === 7) {
    return random();
  }
  return num + 1;
};

let count = 0;
const trials = 1000000;

for (let i = 0; i < trials; i++) {
  let r = random();
  if (r === 3) {
    count++;
  }
}

let count2 = 0;
for (let i = 0; i < trials; i++) {
  let r = Math.floor(Math.random() * 7) + 1;
  if (r === 3) {
    count2++;
  }
}

console.log("Number of times 3 was rolled:", count);
console.log("Estimated probability of rolling a 3:", count / trials);
console.log("Number of times 3 was rolled (uniform):", count2);
console.log("Estimated probability of rolling a 3 (uniform):", count2 / trials);
