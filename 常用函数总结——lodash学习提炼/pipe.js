// pipe函数
// pipe函数跟compose函数的左右是一样的，也是将参数平铺，
// 只不过他的顺序是从左往右。

const pipe = function(){
  const args = [].slice.apply(arguments);
  return function(x) {
    return args.reduce((res, cb) => cb(res), x);
  }
}
//  参数先用数组收集，调用reduce，初始值传入用户传入的，每次拿到当前res再传入函数数组中
// 这种顺序是先执行最早传入的第一个函数，如果想从右向左，可以使用reduceRight~
// ES6简便写法，...args为pipe函数的入参，即为函数依赖收集，X为组合函数的初始入参
// res为当前函数的执行结果，cb为当前数组的遍历元素，即下一个要执行的函数。
const pipe = (...args) => x => args.reduce((res, cb) => cb(res), x)
// 参数顺序改为从左往右
const add = x => x + 5;
const multiply = x => x * 5;
let calculate = pipe(multiply, add);
  let res = calculate(10);
  console.log(res);    // 结果为55,5*10+5=55
  


