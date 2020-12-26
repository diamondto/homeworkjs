/*
实现一个函数compose来扁平化调用函数
即把层级嵌套的那种函数调用(一个函数的运行结果当作实参传给下一个函数的这种操作)扁平化。

*/

// let fn1 = function (x) {
//     return x + 100;
// };
// let fn2 = function (x) {
//     return x * 100;
// };
// let fn3 = function (x) {
//     return x / 100;
// };
//   console.log(fn3(fn1(fn2(fn1(6)))))

// let x = fn1(6);
// x = fn2(x);
// x = fn1(x);
// x = fn3(x);
// // 改进之后：
// // 计算改为四个函数的嵌套计算，从右向左依次执行函数，fn1函数的返回值作为fn2函数的参数
// compose(fn3, fn1, fn2, fn1)(6);

/*
实现思路：

1.compose函数执行后跟个()，说明函数执行完再执行一个函数，
即函数执行完会返回一个新函数，而且也会给出第一次调用函数时的参数。

2.继续往下进行，我需要判断给出的函数集合的个数，如果没有给函数，只需将后一个的参数返回，
如果只给出一个函数，只需把后一个的参数赋给这个函数去执行即可，有链式调用的思想。

3.分情况讨论实现。

4.设计到累加，都可以用Array.prototype.reduce
数组的reduce方法可以实现一个累加效果，它接收两个参数，
第一个是一个累加器方法，第二个是初始化值。
累加器接收四个参数，第一个是上次的计算值，第二个是数组的当前值，
、主要用的就是这两个参数，后面两个参数不常用，他们是当前index和当前迭代的数组。

const arr = [[1, 2], [3, 4], [5, 6]];
// prevRes的初始值是传入的[]，以后会是每次迭代计算后的值
const flatArr = arr.reduce((prevRes, item) => prevRes.concat(item), []);

console.log(flatArr); // [1, 2, 3, 4, 5, 6]
5.按照题目要求，因为是从右向左迭代，所以需要使用Array.prototype.reduceRight

const arr = [[1, 2], [3, 4], [5, 6]];
// prevRes的初始值是传入的[]，以后会是每次迭代计算后的值
const flatArr = arr.reduceRight((prevRes, item) => prevRes.concat(item), []);

console.log(flatArr); // [5, 6, 3, 4, 1, 2]
6.Redux的中间件就是用compose实现的，webpack中loader的加载顺序也是从右往左。
*/
// redux源码如下：
function compose1(...funcs) {
    if (funcs.length === 0) {
      return arg => arg
    }
  
    if (funcs.length === 1) {
      return funcs[0]
    }
  
    return funcs.reduce((a, b) => (...args) => a(b(...args)))
  }
   // ES6写法:
   //  参数先用数组收集，调用reduce，初始值传入用户传入的，每次拿到当前res再传入函数数组中
// 这种顺序是先执行最早传入的第一个函数，如果想从右向左，可以使用reduceRight~
// ...args为函数的入参，即为函数依赖收集，X为组合函数的初始入参
// res为当前函数的执行结果，cb为当前数组的遍历元素，即下一个要执行的函数。
const  compose2= (...args) => x => args.reduceRight((res, cb) => cb(res), x)
  const add = x => x + 5;
  const multiply = x => x * 5;
  let calculate = compose2(multiply, add);
  let res = calculate(10);
  console.log(res);    // 结果为75，15*5

// 扩展思考：如果函数依赖收集是异步的如何改写？
// 在reduce的第一个参数处要加上定义时async标志，声明value拿到返回值，
// 再将value传入下一个函数中，并且要返回当前执行结果，如果默认不传参数的话，初始值设置空对象。


// /**
//  * 异步串行化compose
//  */
function composeAsync(...args) {
    return () => {
        args.reduce(async (composed, f) => {
            const value = await composed;
            return f(value);
        }, {})
    }
}

async function first() {
  console.log("first");
  return "first"
}
async function second(str) {
  str += "---second";
  console.log(str);
  return str;
}
async function third(str) {
  str += "---third"
  console.log(str);
}
const composedFn = composeAsync(first,second,third);
composedFn();

// 输出如下：
// first
// first---second
// first---second---third


/* Koa洋葱圈模型的compose,区别是reduce第一个参数的函数要返回一个函数而不是函数返回值
初始值也要传入一个函数，如果是从左向右执行，要换成reduceRight方法。
 */


function onionCompose(...args) {
    return args.reduceRight((composed, fn) => {
        return () => fn(composed);
    }, () => { })
}

async function F1(next) {
  console.log("F1 enter");
  await next();
  console.log("F1 out");
}
async function F2(next) {
  console.log("F2 enter");
  await next();
  console.log("F2 out");
}
async function F3(next) {
  console.log("F3 enter");
  await next();
  console.log("F3 out");
}

let onionFn = onionCompose(F1, F2, F3);
onionFn();

// 输出：

// F1 enter
// F2 enter
// F3 enter
// F3 out
// F2 out
// F1 out


function onionCompose2(...args) {
    return args.reduce((composed, fn) => {
        return () => fn(composed);
    }, () => { })
}

async function F1(next) {
  console.log("F1 enter");
  await next();
  console.log("F1 out");
}
async function F2(next) {
  console.log("F2 enter");
  await next();
  console.log("F2 out");
}
async function F3(next) {
  console.log("F3 enter");
  await next();
  console.log("F3 out");
}

let onionFn2 = onionCompose2(F1, F2, F3);
onionFn2();

// 输出：
// F3 enter
// F2 enter
// F1 enter
// F1 out
// F2 out
// F3 out