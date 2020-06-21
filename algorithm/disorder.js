// 数组乱序 洗牌算法
function disorder(array) {
  const length = array.length;
  let current = length - 1;
  let random;

  while (current > -1) {
    random = Math.floor(length * Math.random());
    // 交换元素
    [array[current], array[random]] = [array[random], array[current]];
    current--;
  }

  return array
}

/** 参考资料
 *  - conardli.《数组乱序-洗牌算法》.http://www.conardli.top/docs/JavaScript/%E6%95%B0%E7%BB%84%E4%B9%B1%E5%BA%8F-%E6%B4%97%E7%89%8C%E7%AE%97%E6%B3%95.html
 *
 */
