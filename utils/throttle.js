function throttle(event, time) {
  let pre = 0;
  let timer = null;

  return function (...args) {
    if (Date.now() - pre > time) {
      clearTimeout(timer);
      timer = null;
      pre = Date.now();
      event.apply(this, args)
    } else if (!timer) {
      timer = setTimeout(() => {
        event.apply(this, args)
      }, timer)
    }
  }
}

/** 参考资料
 *  - conardli.《节流》.发表于http://www.conardli.top/docs/JavaScript/%E8%8A%82%E6%B5%81.html
 *
 */
