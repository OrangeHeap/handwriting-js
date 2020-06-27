function myNew(fn, ...args) {
  if (typeof fn !== 'function') {
    throw 'new Operator function the first param must be a function';
  }

  // 新建了一个对象 obj
  let obj = new Object();

  obj.__proto__ = fn.prototype;

  // 执行方法，获得返回值
  const result = fn.call(obj, ...args)

  // 如果返回值是一个对象，我们就返回这个对象，如果没有就正常返回
  return typeof result === 'object' ? result : obj;
};

/** 参考资料
 *  - 神三元.《001: 如何模拟实现一个new的效果？》.发表于http://47.98.159.95/my_blog/js-api/001.html
 *  - 冴羽.《JavaScript深入之new的模拟实现》.发表于https://github.com/mqyqingfeng/Blog/issues/13
 */
