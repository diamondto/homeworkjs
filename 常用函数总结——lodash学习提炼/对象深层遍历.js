var obj = {
    a:{
     b:{
      c:"xl"
     }
    }
   }
  const safeGet = (obj, path) => {
          try {
            return path.split('.').reduce((o, k) => o[k], obj)
            // 先拆分成数组，每一个遍历，初始值传入对象，每一个取对象的属性，下一次取的时候，是上一次的第二层对象
          } catch (e) {
            return undefined
          }
      }
  console.log(safeGet(obj,'a.b.c'));// xl