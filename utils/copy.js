// ================= 浅拷贝 ==================
function shallowCopy(target) {
  if (typeof target === 'object' && target !== null) {
    // 判断需要拷贝的是否是数组，如果是则创建一个数组，如果不是则创建一个对象
    const cloneTarget = Array.isArray(target) ? [] : {}

    // 浅层遍历target所有属性
    for (let prop of target) {
      cloneTarget[prop] = target[prop]
    }

    return cloneTarget
  } else {
    return target
  }
}

// 使用concat浅拷贝数组
function shallowCopyArray01(target) {
  return target.concat();
}

// 使用slice浅拷贝数组
function shallowCopyArray02(target) {
  return target.slice();
}

// 通过展开运算浅拷贝数组
function shallowCopyArray03(target) {
  return [...target]
}

// 浅拷贝对象
function shallowCopyObject(...args) {
  return Object.assign({}, ...args)
}

/**
 * 参考资料
 * - 神三元.《004：JS中浅拷贝的手段有哪些？》.发表于：http://47.98.159.95/my_blog/js-api/004.html#%E9%87%8D%E8%A6%81-%E4%BB%80%E4%B9%88%E6%98%AF%E6%8B%B7%E8%B4%9D%EF%BC%9F
 */
