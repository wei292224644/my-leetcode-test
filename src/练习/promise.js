const localQueueMicrotask =
  typeof queueMicrotask === "function"
    ? queueMicrotask
    : (fn) => Promise.resolve().then(fn);

const STATE_PENDING = "pending";
const STATE_FULFILLED = "fulfilled";
const STATE_REJECTED = "rejected";
class CustomPromise {
  constructor(executor) {
    this.state = STATE_PENDING;

    this.value = undefined;

    this.onFullfilledCallbacks = [];
    this.onRejectedCallbacks = [];

    try {
      executor(this._resolve.bind(this), this._reject.bind(this));
    } catch (err) {
      this._reject(err);
    }
  }

  _resolve(value) {
    if (this.state == STATE_PENDING) {
      this.state = STATE_FULFILLED;
      this.value = value;

      this.onFullfilledCallbacks.forEach((callback) => callback());
    }
  }

  _reject(reason) {
    if (this.state == STATE_PENDING) {
      this.state = STATE_REJECTED;
      this.value = reason;

      this.callbacks.forEach((callback) => {
        callback.onRejected(this.value);
      });
    }
  }

  then(onFullfilled, onRejected) {
    onFullfilled =
      typeof onFullfilled === "function" ? onFullfilled : (value) => value;
    onRejected =
      typeof onRejected === "function"
        ? onRejected
        : (reason) => {
            throw reason;
          };

    const promise2 = new CustomPromise((resolve, reject) => {
      if (this.state === STATE_PENDING) {
        this.callbacks.push({
          onFullfilled: (value) => {
            localQueueMicrotask(() => {
              const result = onFullfilled(value);
              if (result === promise2) {
                return reject(
                  new TypeError("Chaining cycle detected for promise")
                );
              }

              try {
                if (result instanceof CustomPromise) {
                  result.then(resolve, reject);
                } else {
                  resolve(result);
                }
              } catch (err) {
                reject(value);
              }
            });
          },
          onRejected: (reason) => {
            localQueueMicrotask(() => {
              const result = onRejected(reason);
              if (result === promise2) {
                return reject(
                  new TypeError("Chaining cycle detected for promise")
                );
              }

              try {
                if (result instanceof CustomPromise) {
                  result.then(resolve, reject);
                } else {
                  resolve(result);
                }
              } catch (err) {
                reject(reason);
              }
            });
          },
        });
      } else if (this.state === STATE_FULFILLED) {
        localQueueMicrotask(() => {
          const result = onFullfilled(this.value);
          if (result === promise2) {
            return reject(new TypeError("Chaining cycle detected for promise"));
          }

          try {
            if (result instanceof CustomPromise) {
              result.then(resolve, reject);
            } else {
              resolve(result);
            }
          } catch (err) {
            reject(this.value);
          }
        });
      } else if (this.state === STATE_REJECTED) {
        localQueueMicrotask(() => {
          const result = onRejected(this.value);
          if (result === promise2) {
            return reject(new TypeError("Chaining cycle detected for promise"));
          }

          try {
            if (result instanceof CustomPromise) {
              result.then(resolve, reject);
            } else {
              resolve(result);
            }
          } catch (err) {
            reject(this.value);
          }
        });
      }
    });
  }

  catch(onRejected) {
    return this.then(undefined, onRejected);
  }

  finally(callback) {
    return this.then(
      (value) => {
        return CustomPromise.resolve(callback()).then(() => value);
      },
      (reason) => {
        return CustomPromise.resolve(callback()).then(() => {
          throw reason;
        });
      }
    );
  }

  _resolvePromise(promise2, x, resolve, reject) {
    if (promise2 === x) {
      return reject(new TypeError("Chaining cycle detected for promise"));
    }

    let called = false;

    if (x !== null && (typeof x === "object" || typeof x === "function")) {
      try {
        const then = x.then;
        if (typeof then === "function") {
          then.call(
            x,
            (y) => {
              if (called) return;
              called = true;
              this.resolvePromise(promise2, y, resolve, reject);
            },
            (r) => {
              if (called) return;
              called = true;
              reject(r);
            }
          );
        } else {
          resolve(x);
        }
      } catch (err) {
        if (called) return;
        called = true;
        reject(err);
      }
    } else {
      resolve(x);
    }
  }

  static resolve(value) {
    return new CustomPromise((resolve, reject) => {
      if (value instanceof CustomPromise) {
        value.then(resolve, reject);
      } else {
        resolve(value);
      }
    });
  }

  static reject(value) {
    return new CustomPromise((resolve, reject) => {
      reject(value);
    });
  }

  static all(promises) {
    return new CustomPromise((resolve, reject) => {
      const results = [];

      promises.forEach((promise) => {
        promise.then(
          (value) => {
            results.push(value);

            if (results.length == promises.length) {
              resolve(results);
            }
          },
          (reason) => {
            reject(reason);
          }
        );
      });
    });
  }

  static race(promises) {
    return new CustomPromise((resolve, reject) => {
      let finished = false;
      promises.forEach((promise) => {
        promise.then(
          (value) => {
            if (finished) return;
            resolve(value);
            finished = true;
          },
          (reason) => {
            if (finished) return;
            reject(reason);
            finished = true;
          }
        );
      });
    });
  }
}

const promise = new Promise();
