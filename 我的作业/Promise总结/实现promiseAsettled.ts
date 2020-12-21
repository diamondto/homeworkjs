/*
用法：
Promise.allSettled()不管参数中的promise是fulfilled还是rejected，
都会等参数中的实例都返回结果，包装实例才会结束。
接受的结果与入参时的promise实例一一对应，且结果的每一项都是一个对象，告诉你结果和值，
对象内都有一个属性叫“status”，用来明确知道对应的这个promise实例的状态（fulfilled或rejected）
fulfilled时，对象有value属性，rejected时有reason属性，对应两种状态的返回值。

使用场景：
如果需要知道所有入参的异步操作的所有结果，
或者需要知道这些异步操作是否全部结束，应该使用promise.allSettled()

思路：TS写法设置状态值，用all方法包装，map循环每一个P的状态
*/
interface PromiseFulfilled {
    status: 'fulfilled'
    value: any
  }
  
  interface PromiseRejected {
    status: 'rejected'
    reason: any
  }
  
  export const allSettled = <T>(promises: (Promise<T> | T)[]) =>
    Promise.all(
      promises.map((promise) =>
        Promise.resolve(promise)
          .then(
            (value): PromiseFulfilled => {
              return {
                status: 'fulfilled',
                value,
              }
            }
          )
          .catch(
            (reason): PromiseRejected => {
              return {
                status: 'rejected',
                reason,
              }
            }
          )
      )
    )