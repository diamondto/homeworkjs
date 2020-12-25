/*ES6 提供了 Map 数据结构。
它类似于对象，
也是键值对的集合，但是“键”的范围不限于字符串，
各种类型的值（包括对象）都可以当作键。
map结构作用：解决键值只能是字符串的问题

结构类型：

1，类似于对象，也是键值对的集合

2，“键”的范围不限于字符串，各种类型的值（包括对象）都可以当作键

object和map对比：Object 结构提供了“字符串—值”的对应，Map 结构提供了“值—值”的对应。

Map 的键是一个简单类型的值（数字、字符串、布尔值），则只要两个值严格相等，Map 将其视为一个键，
比如0和-0就是一个键，布尔值true和字符串true则是两个不同的键。
另外，undefined和null也是两个不同的键。
虽然NaN不严格相等于自身，但 Map 将其视为同一个键。
此外，键名值可以为undefined.
任何具有 Iterator 接口、且每个成员都是一个双元素的数组的数据结构都可以当作Map构造函数的参数.
let Arr = [["name","xinlan"],["age","22"],["sex","woman"]];
let myMap = new Map(Arr);
console.log(myMap.get("name")); //xinlan
如果传入的数组Key出现同名，键值将会被最后一个此键名的值的所覆盖.

let Arr = [["name","xl"],["name","xl2"],["age","22"],["sex","woman"]];
let myMap = new Map(Arr);
console.log(myMap.get("name")); //xl2

如果键的类型不是基本类型，例如数组或者对象，
注意只有对同一个对象的引用，Map 结构才将其视为同一个键!!!
let Arr = [[["name"],"xl"]];
let myMap = new Map(Arr);
console.log(myMap.get(["name"])); 
 //两个["name"]在内存中的地址不一样，此处输出undefined;

let arr1 = ["name"];
let Arr = [[arr1,"xl"]];
let myMap = new Map(Arr);
console.log(myMap.get(arr1));   //输出xl


map的属性：

1，size 属性：返回 Map 结构的成员总数

2，set(key, value) ：设置或更新key值 set方法返回的是当前的Map对象，因此可以采用链式写法

3，get(key) ：读取key对应的键值，如果找不到key，返回undefined

4，has(key) ：返回布尔值，表示某个键是否在当前 Map 对象之中

5，delete(key)： 删除某个键，返回布尔值

6，clear() ：清除所有成员，没有返回值

let myMap = new Map();
myMap.set("name","xl");    
myMap.set("age","22");     //添加元素
console.log(myMap.size);  //2
console.log(myMap.get("name"));//xl  此处键为字符串，注意与上文的区别~
console.log(myMap.has("name")); //true
myMap.delete("age"); //删除
console.log(myMap.size); //1
console.log(myMap.has("age")); //false
myMap.clear();    //清空元素
console.log(myMap.size); //0


map的遍历方法：

Map 结构原生提供三个遍历器生成函数和一个遍历方法。

keys()：返回键名的遍历器。
values()：返回键值的遍历器。
entries()：返回所有成员的遍历器。
forEach()：遍历 Map 的所有成员。

let myMap = new Map();
myMap.set("name","xl");
myMap.set("age","22");
myMap.set("sex","woman");

myMap.forEach(
  (value,key,map)=>{
    console.log(value);    //xl,22,woman
    console.log(key);  //name,age,sex
    console.log(map); 
  }
)

Map转数组：
用展开运算符:
let myMap = new Map();
myMap.set("name","xl");
myMap.set("age","22");
myMap.set("sex","woman");

console.log(...myMap); // [["name","xl"],["age","22"],["sex","woman"]];

WeakMap与Map的区别:
WeakMap 对象是一组键值对的集合，
只接受对象作为键名（null除外），不接受其他类型的值作为键名
键名是弱引用，键值可以是任意的，
键名所指向的对象可以被垃圾回收，此时键名是无效的 不能遍历，方法有get、set、has、delete

注意，WeakMap 弱引用的只是键名，而不是键值。键值依然是正常引用。

WeakMap 中，每个键对自己所引用对象的引用都是弱引用，在没有其他引用和该键引用同一对象，这个对象将会被垃圾回收（相应的key则变成无效的），所以，WeakMap 的 key 是不可枚举的。

方法：

has(key)：判断是否有 key 关联对象
get(key)：返回key关联对象（没有则则返回 undefined）
set(key)：设置一组key关联对象
delete(key)：移除 key 的关联对象
用法与Map一致。


Set是一种在ES6中新增的数据结构，与数组不同的是其成员无重复且无序。
与Array一样，Set本身也是一个构造函数,可以从其身上new出新对象。

Set常用属性及增删改查方法:

size属性: 返回集合的元素个数。（类似数组的长度length）
add(value)方法: 向集合中添加一个元素value。注意：如果向集合中添加一个已经存在的元素，不报错但是集合不会改变。
delete(value)方法: 从集合中删除元素value。
has(value)方法: 判断value是否在集合中，返回true或false.
clear()方法: 清空集合。
用法如下:
let mySet = new Set([1, 2, 3, 2, 1]);
console.log(mySet.size);   //3
console.log(...mySet);      //1,2,3
mySet.add(4);
console.log(mySet.size);   //4
mySet.delete(3);
console.log(mySet.size);  //3
console.log(mySet.has(2));  //true
mySet.clear();
console.log(mySet.size);  //0
将Set转为数组:
Array.from 方法可以将 Set 数据结构转为数组：
let mySet = new Set([1, 2, 3, 2, 1]);
console.log(mySet instanceof Array);  //false
let myArr = Array.from(mySet);
console.log(myArr instanceof Array);  //true
console.log(myArr);  // [1,2,3]

Set集合遍历方法:
注意:遍历顺序为插入顺序

keys()：返回一个包含集合中所有键的迭代器
values()：返回一个包含集合中所有值得迭代器
entries()：返回一个包含Set对象中所有元素得键值对迭代器
forEach(callbackFn, thisArg)：用于对集合成员执行callbackFn操作，如果提供了 thisArg
参数，回调中的this会是这个参数，没有返回值
let mySet = new Set([1, 2, 3, 2, 1]);
console.log(mySet.keys());// SetIterator {1, 2, 3}
console.log(mySet.values());// SetIterator {1, 2, 3}
console.log(mySet.entries());// SetIterator {1, 2, 3}
mySet.forEach(function(i){
 console.log(i+this);  // 21,22,23
},20)



Set：

成员唯一、无序且不重复
[value, value]，键值与键名是一致的（或者说只有键值，没有键名）
可以遍历，方法有：add、delete、has
WeakSet：

成员都是对象
成员都是弱引用，可以被垃圾回收机制回收，可以用来保存DOM节点，不容易造成内存泄漏
不能遍历，方法有add、delete、has

