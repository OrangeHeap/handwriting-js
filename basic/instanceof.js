// 判断target的prototype是否在 origin 的原型链上。
function myInstanceof01 (target, origin) {
  const proto = target.__proto__;

  if (proto) {
    return origin.prototype === proto ? true : myInstanceof01(proto, origin);
  } else {
    return false
  }
}

function myInstanceof02(L, R) { //L 表示左表达式，R 表示右表达式
  let O = R.prototype;// 取 R 的显示原型
  L = L.__proto__;// 取 L 的隐式原型

  while (true) {
    if (L === null)
      return false;
    if (O === L)// 这里重点：当 O 严格等于 L 时，返回 true
      return true;
    L = L.__proto__;
  }
}

/** 参考资料
 *  - 姜俊杰(2013.06.06).《JavaScript instanceof 运算符深入剖析》.发表于https://www.ibm.com/developerworks/cn/web/1306_jiangjj_jsinstanceof/index.html
 *  - conardli.《手动实现instanceof》.发表于http://www.conardli.top/docs/JavaScript/%E6%89%8B%E5%8A%A8%E5%AE%9E%E7%8E%B0instanceof.html
 */
