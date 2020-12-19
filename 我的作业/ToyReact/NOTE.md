### 学习笔记

[MDN解释](https://developer.mozilla.org/zh-CN/docs/Web/API/Document/createRange)

</br>

### 

dom2级在Document类型中定义了 createRange()方法；

创建range对象很简单 var range = document.createRange() 

操作range对象，有两个步骤，1选择节点，2,操作节点

选择节点：

最简单的选择节点方法：

 selectNode() :选择整个节点，包括子节点

 selectNodeContents()  选择节点的子节点

区别就是 例如这样一段html代码中 <p id="p1"><b>Hello</b> world!</p> 

var range1 = document.createRange(),
    range2 = document.createRange(),
    p1 = document.getElementById("p1");
range1.selectNode(p1);
range2.selectNodeContents(p1);
他们的节点范围就是 

以上2个方法只能选择节点集合，需要精细选择节点，要用到的是 setStart()  和  setEnd() 个方法都接受两个参数：一个参照节点，一个节点偏移量

例如

 <p id="p1">Hello world!</p> 

 

range = document.createRange();
p1 = document.getElementById("p1").childNodes[0];
range.setStart(p1,2);
range.setEnd(p1,8);

选中的将会是 llo wo（注意！以0为基数，空格也算一个文本字符，占1个偏移量）

 2.操作节点

 deleteContents() 这个方法能够从文档中删除范围缩包含的内容

 extractContents() 会删除并返回文档片段

 CloneContents() 创建范围对象的一个副本，不会影响原来的节点

 insertNode() 向范围选区的开始处插入一个节点

 surroundContents() 环绕范围插入内容 

 

其他：

复制 DOM 范围  ： 可以使用 cloneRange()方法复制范围。这个方法会创建调用它的范围的一个副本。

 var newRange = range.cloneRange();  

清理 DOM 范围 ：

在使用完范围之后，最好是调用 detach() 方法，以便从创建范围的文档中分离出该范围。调用
detach()之后，就可以放心地解除对范围的引用，从而让垃圾回收机制回收其内存了。来看下面的
例子

range.detach(); //从文档中分离
range = null; //解除引用 
推荐在使用范围的最后再执行这两个步骤。一旦分离范围，就不能再恢复使用了。 



