// 忽略标点符号、大小写和空格，正着读和反着读一模一样。
function made(str) {
    var str1 = str.toLowerCase(); //先将字符串全部转换为小写
    var reg = /[\W\_]/g; // 删除所有非字母数字字符和下划线
    var str2 = str1.replace(reg, ""); // 去掉非字母和非数字
    var str3 = str2.split(""); // 字符串分隔成数组
    var str4 = str3.reverse(); // 反转数组中的元素
    var str5 = str4.join(""); // 反转后的数组转化为字符串
    return str2 === str5;
}