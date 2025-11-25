//不申请额外空间逆序栈
//思路：利用递归函数调用栈实现逆序
//示例输入：stack = [1,2,3,4,5]
//示例输出：stack = [5,4,3,2,1]

class Stack {
  constructor() {
    this.items = [];
  }

  add(item) {
    this.items.push(item);
  }

  pop() {
    return this.items.pop();
  }

  isEmpty() {
    return this.items.length === 0;
  }

  size() {
    return this.items.length;
  }
}

function reverseStack(stack) {
  if (stack.isEmpty()) return;
  const i = f(stack);
  reverseStack(stack);
  stack.add(i);
}

//辅助函数：递归实现获取并移除栈底元素
function f(stack) {
  const res = stack.pop();
  if (stack.isEmpty()) {
    return res;
  }

  const last = f(stack);
  stack.add(res);
  return last;
}

//example
const stack = new Stack();
stack.add(1);
stack.add(2);
stack.add(3);
stack.add(4);
stack.add(5);

console.log("Original Stack:", stack.items);
reverseStack(stack);
console.log("Reversed Stack:", stack.items);
