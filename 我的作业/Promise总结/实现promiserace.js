// 场景：当想要实现一个方法，每次传入多个请求，哪个先返回就取消其他的，使用先返回的值
// Promise.race(iterable) 方法返回一个 promise，
// 一旦迭代器中的某个promise解决或拒绝，返回的 promise就会解决或拒绝

/*
思路：
取跑得最快的那个 Promise，成功就 resolve，失败就 reject。
所以直接在循环的每个 Promise里的 then 和 catch 里取 resolve 或者 reject，
去触发最外层的 Promise。
*/


Promise.race = function(promise) {
	let promises = Array.from(promise)
    return new Promise(function(resolve, reject) {
        for (var i = 0; i < promises.length; i++) {
       		 Promise.resolve(promises[i]).then(data => {
				resolve(data);
       			 }, err => {
          			return reject(err)
        })
      }
    })
  }








// test
const p1 = new Promise((resolve, reject) => {
    setTimeout(() => {
         resolve('第一个任务');
    }, 200);
})
const p2 = new Promise((resolve,reject) =>{
    setTimeout(() => {
        reject('第二个任务')
    }, 1000);
})
const p3 = new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve('第三个任务');    
    }, 500);
  })
Promise.all([p1,p2,p3]).then(
    result=>console.log(result)
  ).catch(
    e=>console.log(e)        
  )
  // 打印：第一个任务
