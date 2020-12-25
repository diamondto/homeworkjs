/*
splice() 方法向/从数组中添加/删除项目，然后返回被删除的项目。
该方法会改变原始数组。
arrayObject.splice(index,howmany,item1,.....,itemX)
index ：必需。整数，规定添加/删除项目的位置，使用负数可从数组结尾处规定位置。
howmany：必需。要删除的项目数量。如果设置为 0，则不会删除项目。
item:可选。向数组添加的新项目。

*/
Array.prototype.splice = function (start, deleteCount, ...args) {
    // 处理start边界值，考虑负数情况，满足题目条件
    if (start < 0) {
      if (Math.abs(start) > this.length - 1) {
        start = 0
      } else {
        start += this.length
      }
    }
    // 处理deleteCount值，
    deleteCount = typeof deleteCount !== 'undefined' ? deleteCount : this.length
    // 处理args值，可选参数，为空则不添加元素
    args = args.length ? args : []
    // 处理特殊情况，末尾添加，没有删除任何元素返回空数组，但原数组会改变
    if (start > this.length - 1) {
      this.concat(args)
      return []
    }
    /**
     * start在数组范围内，正常情况：
     * 先把原数组值复制取出，原数组清空
     * 先入栈不需要处理的数组前部分元素
     * 然后把需要加入的args
     * 最后入栈数组后部分元素
     * 返回中间删掉的元素组成的数组
     */
    let arr = [...this] // 复制
    this.length = 0 // 清空
    // 先入栈前部分元素
    let i = 0
    while (i < start) {
      this.push(arr.shift()) // 每次取出当前元素
      i++
    }
    // 入栈args
    args.forEach(item => this.push(item))
    // 入栈后部分元素
    arr.forEach((item, index) => {
      if (index >= deleteCount) {
        this.push(item)
        delete arr[index]
      }
    })
    // 返回删除部分
    return arr
  }