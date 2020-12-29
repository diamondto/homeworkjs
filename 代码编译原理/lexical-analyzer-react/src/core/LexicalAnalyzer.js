import "./keywords";
import { KEYWORDS } from "./keywords";
import FakeAutomata from "./sb";

function isKeyword(string) {
  if (KEYWORDS.indexOf(string) !== -1) return true;
  // 判断用户输入语法是否是keyword.js中枚举的关键字
  else return false;
}

function isIdentifier(string) {
  let statusTable = [
    [0, 0, 0],
    [0, 2, 0],
    [0, 2, 2],
  ];
  let finalStatus = [2];
  let transitions = [
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz_",
    "0123456789",
  ];

  return FakeAutomata({
    statusTable,
    finalStatus,
    transitions,
    string,
  });
}

function isArithmeticOperator(string) {
  let statusTable = [
    [0, 0, 0, 0],
    [0, 2, 3, 4],
    [0, 5, 0, 0],
    [0, 0, 6, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
  ];
  let finalStatus = [2, 3, 4, 5, 6];
  let transitions = [["+"], ["-"], ["*", "/", "%", "="]];
  // 00 10 20 21 22 23 24 

  return FakeAutomata({
    statusTable,
    finalStatus,
    transitions,
    string,
  });
}

function isLogicalOperator(string) {
  let statusTable = [
    [0, 0, 0],
    [0, 2, 3],
    [0, 0, 4],
    [0, 0, 4],
    [0, 0, 0],
  ];
  let finalStatus = [2, 4];
  let transitions = [["!", ">", "<"], ["="]];

  return FakeAutomata({
    statusTable,
    finalStatus,
    transitions,
    string,
  });
}

function isOperator(string) {
  return isArithmeticOperator(string) || isLogicalOperator(string);
}

function isUnsigned(string) {
  let statusTable = [
    [0, 0, 0, 0, 0],
    [0, 2, 0, 0, 0],
    [0, 2, 3, 5, 0],
    [0, 4, 0, 0, 0],
    [0, 4, 0, 5, 0],
    [0, 7, 0, 0, 6],
    [0, 7, 0, 0, 0],
    [0, 7, 0, 0, 0],
  ];
  let finalStatus = [2, 4, 7];
  let transitions = ["0123456789", ".", "Ee", "+-"];
  let status = 1;
//   for (let char of string) { // 假设输入“.”
//     let inputStatus = 0; // 复位
//     for (let i = 0; i < transitions.length; i++) { // 遍历四次
//       if (transitions[i].indexOf(char) !== -1) { // i=1匹配成功，
//         inputStatus = i + 1; // =2
//         break;
//       } else if (i === transitions.length - 1 && transitions[i] === "_others") {
//         inputStatus = i + 1; 
//         break;
//       }
//     }// for循环结束即把需要验证的特征符号遍历完毕，在二维数组中去映射
//     status = statusTable[status][inputStatus]; // [1][2]-->5 
//   }

//   return finalStatus.indexOf(status) !== -1 ? true : false;

  return FakeAutomata({
    statusTable,
    finalStatus,
    transitions,
    string,
  });
}

function isIntenger(string) {
  // status = statusTable[status][inputStatus];
  // status初始设置为1，
  let statusTable = [
    [0, 0, 0, 0, 0, 0],
    [0, 3, 2, 0, 0, 0],
    [0, 2, 2, 0, 0, 0],
    [0, 0, 0, 4, 5, 0],
    [0, 0, 6, 0, 0, 6],
    [0, 5, 0, 0, 5, 0],
    [0, 6, 6, 0, 0, 6],
  ];
  let finalStatus = [2, 3, 5, 6];
  let transitions = ["0", "123456789", "x", "1234567", "abcdefABCDEF"];

  return FakeAutomata({
    statusTable,
    finalStatus,
    transitions,
    string,
  });
}

function isConstant(string) {
  return isUnsigned(string) || isIntenger(string);
}

function isDelimiter(string) {
  if (string.length > 1) return false;
  // 已经去除换行，判断当前字符是否是分隔符，返回不是-1则为其中一个特殊字符
  
  let delimiters = ",{}[]();";
  return delimiters.indexOf(string) !== -1 ? true : false;
  // 判断字符串是否包涵子字符串时的技巧~（正则不熟练就用字符串的indexOf方法！）。
  // 返回指定的字符串值string在字符串 ",{}[]();"中首次出现的位置.
  // 暂时不用统计个数，只需要按顺序解析代码即可。
//   test
//   let numStr = '2016';

// numStr.indexOf('2');  //0
// numStr.indexOf(2);  //0
// 注意： indexOf 会做简单的类型转换，把数字转换成字符串 '2' 然后再执行。
}
// 返回一个高阶函数，判断真假。
function isComment(string) {
  // 将string和自定义的三组变量传入到FakeAutomata中获取一个布尔值。
  // transitions枚举注释的开始和结束标记。
  let statusTable = [
    [0, 0, 0, 0],
    [0, 2, 0, 0],
    [0, 0, 3, 0],
    [0, 0, 4, 3],
    [0, 5, 4, 3],
    [0, 0, 0, 0],
  ];
  let finalStatus = [5];
  let transitions = ["/", "*", "_others"];
//  输入statusTable,
//     finalStatus,
//     transitions,
//     string,  返回布尔值
// let status = 1;
//   for (let char of string) { // 逐个遍历
//     let inputStatus = 0; // 复位
//     for (let i = 0; i < transitions.length; i++) { // 遍历三次
//       if (transitions[i].indexOf(char) !== -1) { // 字符串匹配，判断字串是否存在
//         inputStatus = i + 1; // 列数加1，
//         break;
//       } else if (i === transitions.length - 1 && transitions[i] === "_others") {
//         inputStatus = i + 1; 
//         break;
//       }
//     }// for循环结束即把需要验证的特征符号遍历完毕，在二维数组中去映射
//     status = statusTable[status][inputStatus]; // [1][1]对应2
//   }

//   return finalStatus.indexOf(status) !== -1 ? true : false;
return FakeAutomata({
  statusTable,
  finalStatus,
  transitions,
  string,
});
}

function analyzeWord(word) {
  
  if (word.length === 0) {
    return 0;
    // 错误
  } else if (isKeyword(word)) {
    return 1;
  } else if (isIdentifier(word)) {
    // 标识符
    return 2;
  } else if (isOperator(word)) {
    // 操作符
    return 3;
  } else if (isDelimiter(word)) {
    // 分隔符
    return 4;
  } else if (isConstant(word)) {
    return 5;
    // 常量
  } else if (isComment(word)) {
    // 注释
    return 6;
  } else {
    // 错误
    return 0;
  }
}

/**
 * 读取字符串，返回一个json数组
 * @param 字符串
 * @returns 一个json数组
 */
function analyzeString(string) {
  let content = string.replace(/[\r\n]/g, "");
  let result = [];
  // 过滤回车换行

  while (content.length > 0) {
    let buffer = content.slice();
    // 数据备份
    let index = content.length - 1;
    // 这样写底层效率更高，从后向前扫描
    for (; analyzeWord(buffer) === 0 && index > 0; index--) {
      buffer = buffer.substring(0, buffer.length - 1);
      // 不改变原字符串，截取开始到倒数第一个字符
    }

    if (index === 0 && analyzeWord(buffer) === 0) {
      content = content.substring(1);
      // 
    } else {
      result.push({
        // 分析成功，放入结果数组
        type: analyzeWord(buffer), // 赋值字符类型
        content: buffer, // 
        key: result.length // 记录分析的行数
      });
      content = content.substring(index + 1);
      // 分析完当前数值，向后再次截取，进入while循环
    }
  }

  return result;
}

export default analyzeString;
