function objectMerge(target, source) {
    if (typeof target !== 'object') {
      target = {} // 只合并对象
    }
    if (Array.isArray(source)) {
      return source.slice() 
    }
    Object.keys(source).forEach(property => {
      const sourceProperty = source[property]
      // 先把key组成一个数组，根据key拿到值，赋予新的对象
      if (typeof sourceProperty === 'object') {
          // 递归调用，如果是多层嵌套的值，套娃取出，传入入参
          // 递归入参是剥开一层之后的对象
        target[property] = objectMerge(target[property], sourceProperty)
      } else {
        // 基本类型直接赋值即可，不用递归
        target[property] = sourceProperty
      }
    })
    return target
  }