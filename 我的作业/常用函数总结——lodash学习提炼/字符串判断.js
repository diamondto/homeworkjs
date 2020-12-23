/*用JavaScript 实现一个方法，该方法能够判断两个字符串是否匹配, 如:
function isMatch(str1, str2) {
  // ...
}
isMatch('something', 'ginhtemos')  // true
isMatch('aaa', 'aa')  //false
isMatch('abb', 'baa')  //false
isMatch('hello', 'olelh')  //true
与回文算法不同，顺序打乱了，调用sort归一化即可，使用数组的sort方法，默认排序顺序是根据字符串UniCode码~


*/


function isMatch(str1,str2){
    return str1.split('').sort().join('')==str2.split('').sort().join('');
    }