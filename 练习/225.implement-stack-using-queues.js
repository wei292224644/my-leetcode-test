class Queue {
  constructor() {
    this.items = [];
  }

  push(element) {
    this.items.push(element);
  }

  pop() {
    return this.items.shift();
  }
  peek() {
    return this.items[0];
  }
  isEmpty() {
    return this.items.length === 0;
  }
  size() {
    return this.items.length;
  }
}

var MyStack = function () {
  this.queue = new Queue();
  this.queue2 = new Queue();

  this.cur = 0;
};

MyStack.prototype._getCurQueue = function () {
  return this.cur === 0 ? this.queue : this.queue2;
};
MyStack.prototype._getOtherQueue = function () {
  return this.cur === 0 ? this.queue2 : this.queue;
};

/**
 * @param {number} x
 * @return {void}
 */
MyStack.prototype.push = function (x) {
  const curQueue = this._getCurQueue();
  curQueue.push(x);
};

/**
 * @return {number}
 */
MyStack.prototype.pop = function () {
  const curQueue = this._getCurQueue();
  const otherQueue = this._getOtherQueue();

  while (curQueue.size() > 1) {
    otherQueue.push(curQueue.pop());
  }
  this.cur = this.cur === 0 ? 1 : 0;
  return curQueue.pop();
};

/**
 * @return {number}
 */
MyStack.prototype.top = function () {
  const curQueue = this._getCurQueue();
  const otherQueue = this._getOtherQueue();

  while (curQueue.size() > 1) {
    otherQueue.push(curQueue.pop());
  }
  const topElement = curQueue.pop();
  otherQueue.push(topElement);
  this.cur = this.cur === 0 ? 1 : 0;
  return topElement;
};

/**
 * @return {boolean}
 */
MyStack.prototype.empty = function () {
  const curQueue = this._getCurQueue();
  return curQueue.isEmpty();
};

/**
 * Your MyStack object will be instantiated and called as such:
 * var obj = new MyStack()
 * obj.push(x)
 * var param_2 = obj.pop()
 * var param_3 = obj.top()
 * var param_4 = obj.empty()
 */

// Example usage:
var obj = new MyStack();
obj.push(1);
obj.push(2);
console.log(obj.top()); // 2
console.log(obj.pop()); // 2
console.log(obj.empty()); // false
