export default function FakeAutomata(args) {
  let statusTable = args.statusTable;
  let finalStatus = args.finalStatus;
  let transitions = args.transitions;
  let string = args.string;

  let status = 1;
  for (let char of string) { // 逐个遍历
    let inputStatus = 0; // 复位
    for (let i = 0; i < transitions.length; i++) { // 二维数组每一行依次检查
      if (transitions[i].indexOf(char) !== -1) { // 针对该行进行数组或者字符串匹配匹配成功
        inputStatus = i + 1; // 记录找到该行的对应列下标
        break;
      } else if (i === transitions.length - 1 && transitions[i] === "_others") {
        inputStatus = i + 1; // 遍历到最后一行
        break;
      }
    }// for循环结束即把需要验证的特征符号遍历完毕，在二维数组中去映射
    status = statusTable[status][inputStatus]; 
  }

  return finalStatus.indexOf(status) !== -1 ? true : false;
}
// finalStatus是一个数组，包含二维中的枚举情况，关于数组的indexOf方法用例如下：
// let arr = ['orange', '2016', '2016'];

// arr.indexOf('orange');  //0
// arr.indexOf('o');  //-1

// arr.indexOf('2016');  //1
// arr.indexOf(2016);  //-1
// 这里没把例子拆的那么细，四个用例足以说明问题。

// arr.indexOf(‘orange’) 输出 0 因为 ‘orange’ 是数组的第 0 个元素，匹配到并返回下标。
// arr.indexOf(‘o’) 输出 -1 因为此方法不会在每一个元素的基础上再次执行 indexOf 匹配。
// arr.indexOf(’2016′) 输出 1 因为此方法从头匹配直到匹配到时返回第一个数组元素的下表，而不是返回全部匹配的下标。
// arr.indexOf(2016) 输出 -1 注意：这里不会做隐式类型转换。