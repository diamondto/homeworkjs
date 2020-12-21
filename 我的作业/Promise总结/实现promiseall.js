 
 
/*

Promise.all传入一个可迭代对象，返回值是一个Promise实例
 */
 Promise.all = function (promise) {
    let promises = Array.from(promise) //将iterator转换为数组
    return new Promise((resolve, reject) => {

        let index = 0 // 记录已成功的操作数
        let result = [] // 存放已成功的异步操作
        if (promises.length === 0) {
            resolve(result) // 边界条件，不为空向下,如果数组长度为0则返回空数组
        } else {
            function processValue(i, data) { 
                // 处理单个元素，存入结果
                result[i] = data
                if (++index === promises.length) {
                    resolve(result)
                     // 全部遍历完，返回结果,
                    // 所有的 promises 状态都是 fulfilled，promise.all返回的实例才变成 fulfilled 态
                }
            }
            for (let i = 0; i < promises.length; i++) {
                Promise.resolve(promises[i]).then((data) => {
                    processValue(i, data) // 调用单元素处理
                }, (err) => {
                    reject(err)
                    return
                })
            }
        }
    })
}


