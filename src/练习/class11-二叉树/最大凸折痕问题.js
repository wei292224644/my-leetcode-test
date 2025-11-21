const paperFold = function (level) {
  let count = 0;

  let text = "";

  const process = (i, N, isDown) => {
    if (i > N) {
      return;
    }
    process(i + 1, N, true);
    text += isDown ? "凹 " : "凸 ";
    if (!isDown) count++;
    process(i + 1, N, false);
  };

  process(1, level, true);

  console.log(text);
  return count;
};

//example
const level = 4;
const totalConcave = paperFold(level);
console.log(`Total concave folds at level ${level}: ${totalConcave}`);
