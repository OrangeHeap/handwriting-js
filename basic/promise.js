// 实现一个promise

// 设定三个状态 PENDING、FULFILLED、REJECTED ，只能由PENDING改变为FULFILLED、REJECTED，并且只能改变一次
const PENDING = 'PENDING';
const FULFILLED = 'FULFILLED';
const REJECTED = 'REJECTED';

function MyPromise(executor) {
  this.state = PENDING;
  this.value = null;
  this.reason = null;
  this.onFulfilledCallbacks = [];
  this.onRejectedCallbacks = [];

  const resolve = (value) => {
    if (this.state !== PENDING) return;

    this.state = FULFILLED;
    this.value = value;
    this.onFulfilledCallbacks.forEach(fn => fn());
  }

  const reject = (reason) => {
    if (this.state !== PENDING) return;

    this.state = REJECTED;
    this.reason = reason;
    this.onRejectedCallbacks.forEach(fn => fn());
  }

  try {
    executor(resolve, reject);
  } catch (reason) {
    reject(reason);
  }
}

MyPromise.prototype.then = function (onFulfilled, onRejected) {
  if (typeof onFulfilled !== 'function') {
    onFulfilled = (value) => value;
  }

  if (typeof onRejected !== 'function') {
    onRejected = (reason) => reason;
  }

  const promise2 = new MyPromise((resolve, reject) => {
    switch (this.state) {
      case FULFILLED:
        setTimeout(() => {
          try {
            const value = onFulfilled(this.value);
            resolve(value);
          } catch (reason) {
            reject(reason);
          }
        }, 0)
        break;
      case REJECTED:
        setTimeout(() => {
          try {
            const reason = onRejected(this.reason);
            reject(reason);
          } catch (reason) {
            reject(reason);
          }
        }, 0)
        break;
      case PENDING:
        this.onFulfilledCallbacks.push(() => {
          setTimeout(() => {
            try {
              const value = onFulfilled(this.value);
              resolve(value);
            } catch (reason) {
              reject(reason)
            }
          }, 0)
        });
        this.onRejectedCallbacks.push(() => {
          setTimeout(() => {
            try {
              const reason = onRejected(this.reason);
              reject(reason);
            } catch (reason) {
              reject(reason);
            }
          }, 0)
        });
        break;
    }
  })

  return promise2;
}

MyPromise.prototype.catch = function (onRejected) {
  return this.then(null, onRejected);
}

MyPromise.prototype.finally = function(callback) {
  this.then(value => {
    return Promise.resolve(callback()).then(() => {
      return value;
    })
  }, error => {
    return Promise.resolve(callback()).then(() => {
      throw error;
    })
  })
}

MyPromise.resolve = function (param) {
  if (param instanceof Promise) return param;

  return new Promise((resolve, reject) => {
    if (param && param.then && typeof param.then === 'function') {
      // param 状态变为成功会调用resolve，将新 Promise 的状态变为成功，反之亦然
      param.then(resolve, reject);
    } else {
      resolve(param);
    }
  })
}

MyPromise.reject = function (reason) {
  return new Promise((resolve, reject) => {
    reject(reason);
  });
}

MyPromise.all = function (promises) {
  return new Promise((resolve, reject) => {
    const promisesLength = promises.length;
    if (promisesLength === 0) {
      resolve([]);
    } else {
      let result = [];
      let index = 0;

      for (let i = 0; i < promisesLength; i++) {
        promises[i].then(data => {
          // 结果的顺序需要和传入的promise顺序一致
          result[i] = data;

          if (++index === promisesLength) {
            resolve(result);
          }
        }, reason => {
          reject(reason);
        });
      }
    }

  })
}

MyPromise.race = function (promises) {
  return new Promise((resolve, reject) => {
    const promisesLength = promises.length;

    if (promisesLength === 0) {
      resolve();
    } else {
      for (let i = 0; i < promisesLength; i++) {
        promises[i].then(data => {
          resolve(data);
        }, reason => {
          reject(reason);
        })
      }
    }
  })
}
