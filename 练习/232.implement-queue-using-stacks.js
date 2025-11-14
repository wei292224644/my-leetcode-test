class MyStack {
  constructor() {
    this.ary = [];
  }

  add(value) {
    this.ary.splice(0, 0, value);
  }

  pop() {
    return this.ary.splice(0, 1)[0];
  }
  top() {
    return this.ary[0];
  }
  empty() {
    return this.ary.length == 0;
  }
  size() {
    return this.ary.length;
  }
}

var MyQueue = function () {
  this.stackPush = new MyStack();
  this.stackPop = new MyStack();
};

MyQueue.prototype._pushToPop = function () {
  if (this.stackPop.empty()) {
    while (!this.stackPush.empty()) {
      this.stackPop.add(this.stackPush.pop());
    }
  }
};
/**
 * @param {number} x
 * @return {void}
 */
MyQueue.prototype.push = function (x) {
  this.stackPush.add(x);
  this._pushToPop();
};

/**
 * @return {number}
 */
MyQueue.prototype.pop = function () {
  this._pushToPop();
  return this.stackPop.pop();
};

/**
 * @return {number}
 */
MyQueue.prototype.peek = function () {
  this._pushToPop();
  return this.stackPop.top();
};

/**
 * @return {boolean}
 */
MyQueue.prototype.empty = function () {
  return this.stackPop.empty() && this.stackPush.empty();
};

/**
 * Your MyQueue object will be instantiated and called as such:
 * var obj = new MyQueue()
 * obj.push(x)
 * var param_2 = obj.pop()
 * var param_3 = obj.peek()
 * var param_4 = obj.empty()
 */

// Example usage:
var obj = new MyQueue();
obj.push(1);
obj.push(2);
console.log(obj.peek()); // returns 1
console.log(obj.pop()); // returns 1
console.log(obj.empty()); // returns false
