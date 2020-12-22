/*
 * replace('Hi Fred', 'Fred', 'Barney')
 * // => 'Hi Barney'
 */
function replace(...args) {
  const string = `${args[0]}`
  // 取出第一个参数作为基础替换值
  return args.length < 3 ? string : string.replace(args[1], args[2])
}

export default replace