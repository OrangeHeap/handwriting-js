Function.prototype.myBind = function (context, ...args) {
  if (typeof this !== 'function') {
    throw new Error('Function.prototype.myBind - what is trying to be bound is not callable');
  }

  const self = this;

  let fBound = function () {
    return self.apply(this instanceof self ?
      this :
      context, args.concat(Array.prototype.slice.call(arguments)));
  }

  fBound = Object.create(this.prototype);

  return fBound;
}

/** 参考资料
 * - 神三元.《002: 如何模拟实现一个 bind 的效果？》.发表于http://47.98.159.95/my_blog/js-api/002.html
 * - 冴羽.《JavaScript深入之bind的模拟实现》.发表于https://github.com/mqyqingfeng/Blog/issues/12
 */
