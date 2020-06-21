Function.prototype.myApply = function (context = window, ...args) {
  if (this === Function.prototype) {
    return undefined;
  }

  const fn = Symbol('fn');
  context = context || window;
  const result = Array.isArray(args) ? context[fn](...args) : context[fn]();
  delete context[fn]

  return result;
}

/** 参考资料
 *  - conardli.《手动实现call、apply、bind》.发表于http://www.conardli.top/docs/JavaScript/%E6%89%8B%E5%8A%A8%E5%AE%9E%E7%8E%B0call%E3%80%81apply%E3%80%81bind.html#%E6%A8%A1%E6%8B%9F%E5%AE%9E%E7%8E%B0call
 *  - 神三元.003: 《如何实现一个 call/apply 函数？》.发表于http://47.98.159.95/my_blog/js-api/003.html
 */

