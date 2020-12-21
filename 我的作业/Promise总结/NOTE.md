### Promise.all()方法


Promise.all(iterable);传入一个可迭代对象，如Array。
它将一个可迭代的Promise作为输入，
并返回一个Promise解析为输入Promise结果数组的单元。
当所有输入的承诺都已解决，或者输入可迭代的输入不包含任何承诺时，此返回的承诺将解决。
在任何输入的承诺拒绝或非承诺引发错误时，它都会立即拒绝，并且将使用此第一个拒绝消息/错误来拒绝。

返回值：
一个已经得到解决 Promise，如果可迭代通过为空。
一个异步解决 Promise，如果可迭代通过包含任何承诺。
一个悬而未决 Promise的所有其他情况。当给定可迭代对象中的所有promise已解决或任何promise均被拒绝时，此返回的promise随后将被异步解析/拒绝（堆栈为空时）。
无论完成顺序如何，返回值都将按照传递的承诺的顺序进行。

Promise.all()将在任何输入承诺被拒绝时立即拒绝。
相比之下，返回的承诺Promise.allSettled()将等待所有输入的承诺完成，而不管是否拒绝。
因此，它将始终从可迭代的输入中返回每个承诺和功能的最终结果。

要点总结：
1.Promise.all之后最终获取的结果res的结果是按照all里面的写入顺序来定的。
结果是一个数组，数组的每一项是每一个请求对应的resolve结果。
Promse.all在处理多个异步处理时非常有用，适合于同时发送多个请求p1,p2,并要求多个请求都有返回结果时再进行处理。
（1）比如说一个页面上需要等两个或多个ajax的数据回来以后才正常显示，在此之前只显示loading图标。
（2）在前端开发请求数据的过程中，偶尔会遇到发送多个请求并根据请求顺序获取和使用数据的场景，使用Promise.all毫无疑问可以解决这个问题。
2.Promise.all可以将多个Promise实例包装成一个新的Promise实例。同时，成功和失败的返回值是不同的，成功的时候返回的是一个结果数组，而失败的时候则返回最先被reject失败状态的值。
3.Promise.all 里的任务列表[asyncTask(1),asyncTask(2),asyncTask(3)],我们是按照顺序发起的。 
但是根据结果来说，它们是异步的，互相之间并不阻塞，每个任务完成时机是不确定的，尽管如此，所有任务结束之 后，它们的结果仍然是按顺序地映射到resultList里,这样就能和Promise.all里的任务列表 
[asyncTask(1),asyncTask(2),asyncTask(3)]一一对应起来。


<code>

   let wake = (time) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(`${time / 1000}秒后醒来`)
    }, time)
  })
}

let p1 = wake(3000)
let p2 = wake(2000)

Promise.all([p1, p2]).then((result) => {
  console.log(result)       // [ '3秒后醒来', '2秒后醒来' ]
}).catch((error) => {
  console.log(error)
})

</code>

### Promise.race()方法

Promise.race([p1, p2, p3])里面哪个结果获得的快，就返回那个结果，不管结果本身是成功状态还是失败状态。
使用场景：
多台服务器部署了同样的服务端代码，假如我要获取一个商品列表接口，我可以在 race 中写上所有服务器中的查询商品列表的接口地址，哪个服务器响应快，就从哪个服务器拿数据。
eggjs框架源码中杀子进程的工具函数:
<code>

function* killProcess(subProcess, timeout) {
subProcess.kill('SIGTERM');
yield Promise.race([
awaitEvent(subProcess, 'exit'),
sleep(timeout),
]);
if (subProcess.killed) return;
subProcess.kill('SIGKILL');
}
</code>

