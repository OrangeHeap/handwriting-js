// 实现柯里化函数
function currying(fn, ...args) {
  return args.length >= fn.length ? fn(...args) : (...args2) => currying(fn, ...args, ...args2)
}

/** 参考资料
 *  - conardli.《函数柯里化》.发表于http://www.conardli.top/docs/JavaScript/%E5%87%BD%E6%95%B0%E6%9F%AF%E9%87%8C%E5%8C%96.html
 *
 */
