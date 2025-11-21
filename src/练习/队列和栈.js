/**
 * 双向链表实现 队列和栈
 */

class DoubleNode {
  constructor(value, next, prev) {
    this.value = value;
    this.next = next || null;
    this.prev = prev || null;
  }
}

/**
 * 队列是先进入先出来
 * 栈是先进来后出来
 */
class MyQueue {
  constructor() {
    this.head = null;
    this.tail = null;
  }

  add(value) {
    const newNode = new DoubleNode(value);

    if (this.head === null) {
      this.head = newNode;
      this.tail = newNode;
    } else {
      this.tail.next = newNode;
      newNode.prev = this.tail;
      this.tail = newNode;
    }
  }
  poll() {
    if (this.head === null) {
      return null;
    }

    const res = this.head.value;

    if (this.head == this.tail) {
      this.head = null;
      this.tail = null;
    } else {
      this.head = this.head.next;
      this.head.prev = null;
    }

    return res;
  }
}

class MyStack {
  constructor() {
    this.head = null;
    this.tail = null;
  }

  add(value) {
    const newNode = new DoubleNode(value);

    if (this.head === null) {
      this.head = newNode;
      this.tail = newNode;
    } else {
      this.tail.next = newNode;
      newNode.prev = this.tail;
      this.tail = newNode;
    }
  }

  poll() {
    const res = this.tail;

    if (this.head == this.tail) {
      this.head = null;
      this.tail = null;
    } else {
      const prev = this.tail.prev;
      if (prev) {
        prev.next = null;
      }
      this.tail = prev;
    }

    return res && res.value;
  }
}

// const stack = new MyStack();
// stack.add("1");
// stack.add("2");
// stack.add("3");
// stack.add("4");
// stack.add("5");
// console.log(stack.poll());
// console.log(stack.poll());
// console.log(stack.poll());
// console.log(stack.poll());
// console.log(stack.poll());
// console.log(stack.poll());
// console.log(stack.poll());

class MyArrayStack {
  constructor(count = 5) {
    this.index = 0;
    this.ary = new Array(count).fill(null);
    this.count = count;
  }

  add(value) {
    if (this.index == this.count) {
      throw new Error("栈满了，无法再次添加");
    }

    this.ary[this.index] = value;
    this.index++;
  }

  pop() {
    if (this.index == 0) {
      throw new Error("栈空了，没有值可以导出");
    }
    this.index--;
    const res = this.ary[this.index];
    return res;
  }

  peek() {
    if (this.index == 0) {
      throw new Error("栈空了，没有值可以导出");
    }
    return this.ary[this.index - 1];
  }

  empty() {
    return this.index === 0;
  }
}

// const arrayStack = new MyArrayStack();

// arrayStack.add("1");
// arrayStack.add("2");
// arrayStack.add("3");
// arrayStack.add("4");
// arrayStack.add("5");
// arrayStack.add("6");
// arrayStack.add("7");

// console.log(arrayStack.poll());
// console.log(arrayStack.poll());
// console.log(arrayStack.poll());
// console.log(arrayStack.poll());
// console.log(arrayStack.poll());
// console.log(arrayStack.poll());
// console.log(arrayStack.poll());
// console.log(arrayStack.poll());
// console.log(arrayStack.poll());
// console.log(arrayStack.poll());
// console.log(arrayStack.poll());

// arrayStack.add("1");
// arrayStack.add("2");
// arrayStack.add("3");
// arrayStack.add("6");
// arrayStack.add("7");

// console.log(arrayStack.poll());
// console.log(arrayStack.poll());
// console.log(arrayStack.poll());

class MyArrayQueue {
  constructor(count = 5) {
    this.ary = new Array(count).fill(null);
    this.begin = 0;
    this.end = 0;
    this.size = 0;
    this.count = count;
  }

  add(value) {
    if (this.size == this.count) {
      throw new Error("队列满了，无法再次添加");
    }

    this.size++;
    this.ary[this.begin] = value;
    this.begin = this._nextIndex(this.begin);
  }

  poll() {
    if (this.size == 0) {
      throw new Error("队列空了，没有值可以导出");
    }

    this.size--;
    const res = this.ary[this.end];
    this.end = this._nextIndex(this.end);
    return res;
  }

  _nextIndex(index) {
    if (index == this.count - 1) {
      return 0;
    }
    return index + 1;
  }
}

// const arrayQueue = new MyArrayQueue(5);

// arrayQueue.add("1");
// arrayQueue.add("2");
// arrayQueue.add("3");
// arrayQueue.add("4");
// arrayQueue.add("5");

// console.log(arrayQueue.poll());
// console.log(arrayQueue.poll());
// console.log(arrayQueue.poll());
// arrayQueue.add("7");
// arrayQueue.add("8");
// console.log(arrayQueue.poll());
// console.log(arrayQueue.poll());
// console.log(arrayQueue.poll());
// console.log(arrayQueue.poll());

// console.log(arrayQueue.ary, arrayQueue.begin, arrayQueue.end, arrayQueue.size);

class TwoStacksOneQueue {
  constructor() {
    this.stackPush = new MyArrayStack(5);
    this.stackPop = new MyArrayStack(5);
  }

  _pushToPop() {
    if (this.stackPop.empty()) {
      while (!this.stackPush.empty()) {
        this.stackPop.add(this.stackPush.pop());
      }
    }
  }
  add(value) {
    this.stackPush.add(value);

    this._pushToPop();
  }

  poll() {
    if (this.stackPop.empty() && this.stackPush.empty()) {
      throw new Error("队列空了，没有值可以导出");
    }
    this._pushToPop();
    return this.stackPop.pop();
  }

  peek() {
    if (this.stackPop.empty() && this.stackPush.empty()) {
      throw new Error("队列空了，没有值可以导出");
    }
    this._pushToPop();

    return this.stackPop.peek();
  }
}

// const twoStacksOneQueue = new TwoStacksOneQueue();
// twoStacksOneQueue.add("1");
// twoStacksOneQueue.add("2");
// twoStacksOneQueue.add("3");
// twoStacksOneQueue.add("4");
// console.log(twoStacksOneQueue.poll());
// console.log(twoStacksOneQueue.poll());
// console.log(twoStacksOneQueue.poll());
// console.log(twoStacksOneQueue.poll());
// twoStacksOneQueue.add("5");
// twoStacksOneQueue.add("2");
// twoStacksOneQueue.add("3");
// twoStacksOneQueue.add("4");
// twoStacksOneQueue.add("5");
// console.log(twoStacksOneQueue.poll());
// console.log(twoStacksOneQueue.poll());
// console.log(twoStacksOneQueue.poll());
// console.log(twoStacksOneQueue.poll());
// console.log(twoStacksOneQueue.poll());

class TwoQueuesOneStack {
  constructor() {
    this.queue1 = new MyQueue();
    this.queue2 = new MyQueue();
    this.cur = 0;
  }
  _getCurQueue() {
    return this.cur === 0 ? this.queue1 : this.queue2;
  }

  _getOtherQueue() {
    return this.cur === 0 ? this.queue2 : this.queue1;
  }

  add(value) {
    this._getCurQueue().add(value);
  }

  poll() {
    const curQueue = this._getCurQueue();
    const otherQueue = this._getOtherQueue();

    if (curQueue.head === null) {
      throw new Error("栈空了，没有值可以导出");
    }

    while (curQueue.head !== null && curQueue.head !== curQueue.tail) {
      otherQueue.add(curQueue.poll());
    }
    this.cur = this.cur === 0 ? 1 : 0;
    return curQueue.poll();
  }
}

const twoQueuesOneStack = new TwoQueuesOneStack();
twoQueuesOneStack.add("1");
twoQueuesOneStack.add("2");
twoQueuesOneStack.add("3");
twoQueuesOneStack.add("4");

console.log(twoQueuesOneStack.poll());
console.log(twoQueuesOneStack.poll());
twoQueuesOneStack.add("5");
twoQueuesOneStack.add("6");
console.log(twoQueuesOneStack.poll());
console.log(twoQueuesOneStack.poll());
console.log(twoQueuesOneStack.poll());
