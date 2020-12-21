const promise = new Promise((resolve, reject) => {
    console.log(1)
    resolve()
    console.log(2)
})
promise.then(() => {
    console.log(3)
})
console.log(4)
/*
Promise 构造函数是同步执行的，promise.then 中的函数是异步执行的。
// => 1
// => 2
// => 4
// => 3
*/


const first = () => (new Promise((resolve, reject) => {
    console.log(3);
    let p = new Promise((resolve, reject) => {
        console.log(7);
        setTimeout(() => {
            console.log(5);
            resolve(6);
        }, 0)
        resolve(1);
    });
    resolve(2);
    p.then((arg) => {
        console.log(arg);
    });

}));

first().then((arg) => {
    console.log(arg);
});
console.log(4);

/*

// => 3
// => 7
// => 4
// => 1
// => 2
// => 5

第一轮事件循环，先执行宏任务，主script，new Promise立即执行，输出 3，
执行p这个new Promise操作，输出 7，
发现setTimeout，将回调函数放入下一轮任务队列（Event Quene），
p的then，暂且命名为then1，放入微任务队列，且first也有then，命名为then2，放入微任务队列。
执行console.log(4),输出 4，宏任务执行结束。

再执行微任务，执行then1,输出 1，执行then2,输出 2.

第一轮事件循环结束，开始执行第二轮。
第二轮事件循环先执行宏任务里面的，也就是setTimeout的回调，
输出 5.resolve(6)不会生效，
因为p的Promise状态一旦改变就不会再变化了。
*/

const promise1 = new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve('success')
    }, 1000)
  })
  const promise2 = promise1.then(() => {
    throw new Error('error!!!')
  })
  
  console.log('promise1', promise1)
  console.log('promise2', promise2)
  
  setTimeout(() => {
    console.log('promise1', promise1)
    console.log('promise2', promise2)
  }, 2000)

  /*
promise1 Promise {<pending>}
promise2 Promise {<pending>}
Uncaught (in promise) Error: error!!!
    at <anonymous>
promise1 Promise {<resolved>: "success"}
promise2 Promise {<rejected>: Error: error!!!
    at <anonymous>}

promise 有 3 种状态：pending、fulfilled 或 rejected。
状态改变只能是 pending->fulfilled 或者 pending->rejected，
状态一旦改变则不能再变。上面 promise2 并不是 promise1，
而是返回的一个新的 Promise 实例。
  */

  
const promise = new Promise((resolve, reject) => {
    resolve('success1')
    reject('error')
    resolve('success2')
  })
  
  promise
    .then((res) => {
      console.log('then: ', res)
    })
    .catch((err) => {
      console.log('catch: ', err)
    })

/*

then: success1
构造函数中的 resolve 或 reject 只有第一次执行有效，
多次调用没有任何作用：promise 状态一旦改变则不能再变。


*/


Promise.resolve(1)
  .then((res) => {
    console.log(res)
    return 2
  })
  .catch((err) => {
    return 3
  })
  .then((res) => {
    console.log(res)
  })

  /*
  1
  2
  promise 可以链式调用。链式调用通常会通过 return this 实现，
  但promise 每次调用 .then 或者 .catch 都会返回一个新的 promise，实现了链式调用。

  */
 const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log('once')
      resolve('success')
    }, 1000)
  })
  
  const start = Date.now()
  promise.then((res) => {
    console.log(res, Date.now() - start)
  })
  promise.then((res) => {
    console.log(res, Date.now() - start)
  })

  /*

once
success 1005
success 1007

promise 的 .then 或者 .catch 可以被调用多次，
但这里 Promise 构造函数只执行一次。
或者说 promise 内部状态一经改变，并且有了一个值，
那么后续每次调用 .then 或者 .catch 都会直接拿到该值。
  */

  
Promise.resolve()
.then(() => {
  return new Error('error!!!')
})
.then((res) => {
  console.log('then: ', res)
})
.catch((err) => {
  console.log('catch: ', err)
})

/*
return Promise.reject(new Error('error!!!'))
throw new Error('error!!!')

.then 或者 .catch 中 return 一个 error 对象并不会抛出错误
所以不会被后续的 .catch 捕获，需要改成其中一种：
因为返回任意一个非 promise 的值都会被包裹成 promise 对象，
即 return new Error('error!!!') 等价于 return Promise.resolve(new Error('error!!!'))。
*/


const promise = Promise.resolve()
  .then(() => {
    return promise
  })
promise.catch(console.error)

/*
.then 或 .catch 返回的值不能是 promise 本身，否则会造成死循环。类似于：

process.nextTick(function tick () {
  console.log('tick')
  process.nextTick(tick)
})
结果:

TypeError: Chaining cycle detected for promise #<Promise>

*/


Promise.resolve(1)
  .then(2)
  .then(Promise.resolve(3))
  .then(console.log)

/*
.then 或者 .catch 的参数期望是函数，传入非函数则会发生值穿透。
结果：
1

*/

Promise.resolve()
  .then(function success (res) {
    throw new Error('error')
  }, function fail1 (e) {
    console.error('fail1: ', e)
  })
  .catch(function fail2 (e) {
    console.error('fail2: ', e)
  })

  /*
.then 可以接收两个参数，第一个是处理成功的函数，第二个是处理错误的函数。
.catch 是 .then 第二个参数的简便写法，
但是它们用法上有一点需要注意：
.then 的第二个处理错误的函数捕获不了第一个处理成功的函数抛出的错误，
而后续的 .catch 可以捕获之前的错误。
结果：

fail2:  Error: error
    at success (<anonymous>)
  */

  
process.nextTick(() => {
    console.log('nextTick')
  })
  Promise.resolve()
    .then(() => {
      console.log('then')
    })
  setImmediate(() => {
    console.log('setImmediate')
  })
  console.log('end')

  /*
  process.nextTick 和 promise.then 都属于 微任务，
  而 setImmediate 属于 宏任务，在事件循环的 check 阶段执行。
  事件循环的每个阶段宏任务（macrotask）之间都会执行 微任务microtask，
  事件循环的开始会先执行一次 microtask。
 结果：

end
nextTick
then
setImmediate
  */


// 练习
// 红灯3秒亮一次，
// 绿灯1秒亮一次，黄灯2秒亮一次；
// 如何使用Promise让三个灯不断交替重复亮灯？
// 要求红灯亮过后，绿灯才能亮，绿灯亮过后，黄灯才能亮，黄灯亮过后，红灯才能亮

/*
分析：
红灯亮起时，承诺2s秒后亮绿灯，
绿灯亮起时承诺1s后亮黄灯，
黄灯亮起时，承诺3s后亮红灯…
是一个Promise链式调用，
1.每一个亮灯动作写在then()方法中
2.同时返回一个新的Promise，并将其状态由pending设置为fulfilled，允许下一盏灯亮起。

*/
function red() {
    console.log('red');// 模拟红灯亮
  }
  
  function green() {
    console.log('green');
  }
  
  function yellow() {
    console.log('yellow');
  }
  
  // 逻辑抽离，设置时长和相应回调，n秒后执行回调
  let myLight = (timer, cb) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        cb();
        resolve();
      }, timer);
    });
  };
  
  // 模拟题目
  let myStep = () => {
    Promise.resolve().then(() => {
      return myLight(3000, red);
    }).then(() => {
      return myLight(2000, green);
    }).then(()=>{
      return myLight(1000, yellow);
    }).then(()=>{
      myStep(); // 循环递归调用保证一直重复亮灭
    })
  };
  myStep();
  
  // output:
  // => red
  // => green
  // => yellow
  // => red
  // => green
  // => yellow
  // => red

  /*
  请实现一个mergePromise函数，
  把传进去的数组按顺序先后执行，并且把返回的数据先后放到数组data中。


思路：
Promise控制异步流程，首先ajax1，ajax2，ajax3都是函数，
只是这些函数执行后会返回一个Promise，
按照题目要求只要顺序执行这三个函数就好了，然后把结果放到data中;

  */
 const mergePromise = ajaxArray => {
    // 书写异步函数逻辑代码
    // 保存数组中的函数执行后的结果
    let data = [];
  
    // Promise.resolve方法调用时不带参数，直接返回一个resolved状态的 Promise 对象。
    // sequence就是一个成功状态的P对象。
    let sequence = Promise.resolve();
  
    ajaxArray.forEach(item => {
      // 第一次的 then 方法用来执行数组中的每个函数，
      // 第二次的 then 方法接受数组中的函数执行后返回的结果，
      // 并把结果添加到 data 中，然后把 data 返回。
      sequence = sequence.then(item).then(res => {
        data.push(res);
        return data;
      });
    });
  
  // 遍历结束后，返回一个 Promise，也就是 sequence， 他的 [[PromiseValue]] 值就是 data，
  // 而 data（保存数组中的函数执行后的结果） 也会作为参数，传入下次调用的 then 方法中。
    return sequence;
  };

  /*
  封装一个异步加载图片的方法

  */
function loadImageAsync(url) {
    return new Promise(function(resolve,reject) {
        var image = new Image();
        image.onload = function() {
            resolve(image) 
        };
        image.onerror = function() {
            reject(new Error('Could not load image at' + url));
        };
        image.src = url;
     });
}
/*
现有8个图片资源的url，已经存储在数组urls中，
且已有一个函数function loading，输入一个url链接，
返回一个Promise，该Promise在图片下载完成的时候resolve，下载失败则reject。
要求：任何时刻同时下载的链接数量不可以超过3个。
请写一段代码实现这个需求，要求尽可能快速地将所有图片下载完成。

思路：
需要先并发请求3张图片，当一张图片加载完成后，
又会继续发起一张图片的请求，让并发数保持在3个，
直到需要加载的图片都全部发起请求。

用Promise来实现就是，先并发请求3个图片资源，
这样可以得到3个Promise，组成一个数组promises，
然后不断调用Promise.race来返回最快改变状态的Promise，满足快速下载。
然后从数组promises中删掉这个Promise对象，再加入一个新的Promise，
直到全部的url被取完，最后再使用Promise.all来处理一遍数组promises中没有改变状态的Promise。
以确定是否全部下载成功。
注意all和race的结合使用~
handler对应加载图片的函数，limit设置一次并发请求的个数限制
*/



var urls = ['https://www.kkkk1000.com/images/getImgData/getImgDatadata.jpg', 'https://www.kkkk1000.com/images/getImgData/gray.gif', 'https://www.kkkk1000.com/images/getImgData/Particle.gif', 'https://www.kkkk1000.com/images/getImgData/arithmetic.png', 'https://www.kkkk1000.com/images/getImgData/arithmetic2.gif', 'https://www.kkkk1000.com/images/getImgData/getImgDataError.jpg', 'https://www.kkkk1000.com/images/getImgData/arithmetic.gif', 'https://www.kkkk1000.com/images/wxQrCode2.png'];

function loadImg(url) {
    return new Promise((resolve, reject) => {
        const img = new Image()
        img.onload = () => {
            console.log('一张图片加载完成');
            resolve();
        }
        img.onerror = reject;
        img.src = url;
    })
};
function limitLoad(urls, handler, limit) {

    // 对数组做一个拷贝，也可以用slice方法，slice是浅拷贝。
      const sequence = […urls];
  
    let promises = [];
  
    //并发请求到最大数，取前N个任务，即前N个图片放入数组
    promises = sequence.splice(0, limit).map((url, index) => {
      // 这里返回的 index 是任务在 promises 的下标，
      // 用于在 Promise.race 之后找到完成的任务下标
      return handler(url).then(() => {
        return index;
      });
    });
  
    // 利用数组的 reduce 方法来以队列的形式执行
    // 初始值用promise.all包装，传入3张图片的数组，一个batch为一次队列循环。
    return sequence.reduce((last, url, currentIndex) => {
      return last.then(() => {
        // 返回最快改变状态的 Promise
        return Promise.race(promises)
      }).catch(err => {
        // 这里的 catch 不仅用来捕获前面 then 方法抛出的错误
        // 更重要的是防止中断整个链式调用
        console.error(err)
      }).then((res) => {
        // 用新的 Promise 替换掉最快改变状态的 Promise
        promises[res] = handler(sequence[currentIndex]).then(() => {
          return res
        });
      })
    }, Promise.resolve()).then(() => {
      return Promise.all(promises)
    })
  
  }
  
  limitLoad(urls, loadImg, 3);
  
  /*
  因为 limitLoad 函数也返回一个 Promise，所以当 所有图片加载完成后，可以继续链式调用
  
  limitLoad(urls, loadImg, 3).then(() => {
      console.log('所有图片加载完成');
  }).catch(err => {
      console.error(err);
  })
  */