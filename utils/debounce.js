function debounce(event, time, flag) {
  let timer = null;

  return function (...args) {
    clearTimeout(timer);

    if (flag && !timer) {
      event.apply(this, args);
    }

    timer = setTimeout(() => {
      event.apply(this, args);
    }, time)
  }
}

/** 参考资料
 *  - conardli.《防抖》.发表于http://www.conardli.top/docs/JavaScript/%E9%98%B2%E6%8A%96.html
 *
 */

