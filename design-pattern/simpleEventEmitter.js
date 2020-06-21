function EventEmitter() {
  // 创建事件列表
  this._events = Object.create(null);
}

EventEmitter.prototype.addListener = function (eventName, listener) {
  const listenerType = typeof listener

  if (!this._events) {
    this._events = Object.create(null);
  }

  if (listenerType !== 'function') {
    throw new Error(`The "listener" argument must be type of Function. Received type ${listenerType}`);
  }

  // 如果时间名称存在，直接将listener推入数组，如果不存在则新建一个包含listener的数组
  this._events[eventName] ? this._events[eventName].push(listener) : this._events[eventName] = [ listener ];
}


EventEmitter.prototype.removeListener = function (eventName, listener) {
  // 如果这个事件本身不存在，则直接return
  if (!Array.isArray(this._events[eventName])) return;

  !listener ?
    // 如果没有传入listener直接删除整个事件
    delete this._events[eventName] :
    // 支持删除普通事件、只调用一次的方法
    this._events[eventName] = this._events[eventName].filter(e => e !== listener && e.origin !== listener);
}

// 向事件队列添加事件，只执行一次
EventEmitter.prototype.once = function (eventName, listener) {
  const once = (...args) => {
    listener.apply(this, args);
    this.removeListener(eventName, listener)
  }

  once.origin = listener;
  this.addListener(eventName, once);
}

// 执行某类事件
EventEmitter.prototype.emit = function (eventName, ...args) {
  if (!Array.isArray(this._events[eventName])) return

  this._events[eventName].forEach(fn => {
    fn.apply(this, args)
  })
}


/** 参考资料
 *  - conardli.《EventEmitter》.发表于http://www.conardli.top/docs/JavaScript/EventEmitter.html
 *  - 冴羽.《EventEmitter》.发表于https://github.com/mqyqingfeng/EventEmitter
 */
