# 学习笔记
>  第二周

## JS语言通识
### 1 范用语言分类方法
#### 1.1 按语法分类
- 非形式语言
    - 中文、韩文
- 形式语言（***乔姆斯基谱系***）
    - 0型：无限制文范
    - 1型：上下文相关文法
    - 2型：上下文无关文法
    - 3型：正则文法（***Regular***）
    
#### 1.2 产生式(BNF)
- 用尖括号包裹起来的名称表示语法结构名
- 语法结构分成基础结构和需要用其他语法结构定义的复合结构
    - 基础结构称为终结符（***Terminal Symbol***）
    - 复合结构称为非终结符（***Nonterminal Symbol***）
    - 引号和中间的字符表示终结符
    - 可以有括号
    - `*` 表示一次或多次
    - `|` 表示或
    - `+` 表示至少一次
 
e.g. 用BNF表示四则运算 1+2*3  

终结符：
- Number
- `+`
- `-`
- `*`
- `/`

非终结符
- MultiplicativeExpress
- AdditiveExpress
```xml
<AdditiveExpress> ::= 
    <MultiplicativeExpress> | <AdditiveExpress> "+" <MultiplicativeExpress> | <AdditiveExpress> "-" <MultiplicativeExpress>
<MultiplicativeExpress> ::= 
    <Number> | <MultiplicativeExpress> "*" <Number> | <MultiplicativeExpress> "/" <Number>
```
习题：编写带括号的四则运算的产生式

----

#### 1.3 通过产生式理解乔姆斯基谱系
- 0型：无限制文范
  - ?::=?
- 1型：上下文相关文法
  - ?`<A>`?::=?`<B>`?
- 2型：上下文无关文法
  - `<A>`::=?
- 3型：正则文法（***Regular***）
  - `<A>`::=`<A>`?
  - `<A>`::=?`<A>` 
  
#### 1.4 其他产生式
- EBNF
- ABNF
- Customized
  
#### 1.5 现代语言的特例
- C++中，`*`可能表示乘法符号或是指针，具体指哪一个，取决于`*`前面的标识符是否被声明为类型；
- VB中，`<`可能是小于号，也可能是XML直接量的开始，取决于当前位置是否可以接受XML直接量；
- Python中，行首的tab符和空格会根据上一行的行首空白以一定规则被处理成虚拟终结符 ***indent*** 或 ***dedent***;
- JavaScript中，`/`可能是除号，也可能是正则开头，处理方式类似于VB，字符串模版中也需要特殊处理`}`，以及自动插入`;`规则。

#### 1.6 语言的分类
- 形式语言——按用途分类
  - 数据描述语言
    -  JSON
    -  HTML
    -  XAML
    -  SQL
    -  CSS
  - 编程语言
    - C
    - C++
    - Java
    - C#
    - Python
    - Ruby
    - Perl
    - Lisp
    - T-SQL
    - Clojure
    - Haskell
    - JavaScript
- 形式语言——按表达方式分类
  - 声明式语言
    -  ……
  - 命令式语言
    - ……

#### 1.7 图灵完备性
> 所有的可计算的问都可以用来描述的语言
- 命令式——图灵机
  - goto
  - if和while
- 声明式——Lambda
  - 递归
  
#### 1.8 动态与静态
- 动态
  - 在用户的设备上/在线服务器上
  - 产品实际运行时
  - Runtime
- 静态
  - 在程序员的设备上
  - 在产品开放时
  - Compiletime  

#### 1.9 类型系统
- 动态类型系统和静态类型系统
- 强类型和若类型
  - String + Number
  - String == Boolean
- 复合类型
  - 结构体
  - 函数签名
- 子类型
- 泛型
  - 逆变/协变   
  
#### 1.10 一般命令式编程语言
- Atom
  - Identifier
  - Literal 
- Expression
  - Atom
  - Operator
  - Punctuator
- Statement
  - Expression 
  - Keyword
  - Punctuator
- Structure
  - Class
  - Process
  - Namespace 
- Program
  - Program
  - Module
  - Package
  - Library 
  
## 重学JavaScript
### 1 
- 语法
- 语义
- 运行时
- Atom
- Grammer
  - Literal
  - Variable
  - Keywords
  - Whitespace
  - Line Terminal
- Runtime 
- Type
- Execution Content
- Types
  - Number
  - String
  - Boolean
  - Object
  - Null
  - Undefined
  - Symbol 


### 2 JS类型——Number
> IEEE 754 Double Float
- Sign(1) 符号位，缩写S
- Exponent(11) 指数位，缩写E
  - 指数位大于1000000000 BIN 时表示正 
  - 指数位小于1000000000 BIN 时表示负
- Fraction(52) 精度位，缩写F
  
运算公式：  
```math
Value = (-1)^S * (1+F) * 2^E
```
### 3 JS类型——String
#### 3.1 基本概念
- character 字符
- Code point 码点
- Encoding 编码方式
#### 3.2 字符集
- ASCII 
> 127个字符，其中包含10个数字，26个大写字母，26个小写字母，是由美国计算机提出的概念
- Unicode
> 将全世界的字符都编入了，划分各个片区
- UCS
> 只有从0x0000到0xFFFF范围的字符集
- GB 
    - GB2312
    - GBK(GB13000)
    - GB18030
> 中国的国标编码标准，与unicode码点不兼容
- ISO - 8859
> 东欧国家的编码标准，类似于我国的GB
- BIG5 
> 台湾使用的编码标准，俗称大5码
#### 3.3 UTF-8编码方式
- UTF
    - UTF-8  
    ==1110==0100 ==01==111000 ==10==000000
        - 前四位标识有几个字节
        - 此后每一个字节以10开头
    - UTF-16
#### 3.4 字符串语法
##### 3.4.1 格式
可以使用如下几种符号来包裹字符串
- ""
- ''
- ``
##### 3.4.2 转义字符  
转义字符 | 描述
---|---
\b | 代表退格
\t | 代表一个制表符,即一个Tab空格
\n | 换行回车
\v | 垂直的制表符
\r | 回车
\\" | 双引号
\\' | 单引号
\\\ | 反斜线
\OOO | 使用八进制表示的拉丁字母
\xHH | 使用十六进制数表示的拉丁字母,HH表示一个2位的十六进制整数
\uHHHH | 使用十六进行数(该数值指定该字符的Unicode值)表示的字符,HHHH表示一个4位的十六进制整数
##### 3.4.3 模板字符串引擎原理
```javascript
`ab${x}abc${y}abc`
- `abc${
- }abc${
- }abc
```
### 4 JS类型——Boolean
只用==true==和==false==两个值
### 5 JS类型——NULL和Undefined
- null是JavaScript的关键字
- undefined不是JavaScript中的关键字
```javascript
function fun() {
  var undefined = 1;
  console.log(undefined); // 输出1
}
function foo() {
  var null = 0; // 报错 Uncaught SyntaxError: Unexpected token 'null'
  console.log(null); 
}
```
- 安全地表示undefined
```javascript
void 0;
```
### 2 JS中的对象和类
#### 2.1 对象 
#### 2.2 类
> 类是一种描述对象的方式  
> "归类"和"分类"是两个主要的流派  
> 对于"归类"方法而言，多继承是非常自然的事情，例如C++  
> 而采用"分类"思想的计算机语言，则是单继承结构，并且会有一个基类Object
#### 2.3 原型
> 原型是一种更接近人类原始认知的描述对象的方法  
> 我们并不试图做严谨的分类，而是采用"相似"的方式去描述  
> 任何对象仅仅需要描述它和原型的区别即可
  
#### 2.1 Object in Javascript
> 在JavaScript运行时，原生对象的描述方式非常简单，我们只需要关心原型和属性两个部分
##### 2.1.1 属性Property
> 属性使用Key/Value对进行描述的

其中，key值类型：
- Symbol 可以用于控制属性访问权限
- String  可以被使用者猜测
  
value值类型分为：
- 数据属性：

属性|说明  
---|---
[[value]]|value值，可以是任何数据类型  
writable|特征值，是否可写
enumerable|特征值，是否可枚举
configurable|特征值，是否可改变

- 访问器属性：

属性|说明  
---|---
get|get方法  
set|set方法
enumerable|特征值，是否可枚举
configurable|特征值，是否可改变

> JavaScript用属性来统一抽象对象的状态和行为  
> 一般来说，数据属性用于描述状态，访问器属性用于描述行为  
> 数据属性中如果存储函数，也可以用于描述行为
>  
##### 2.1.2 原型机制
> 当我们访问属性时，如果当前对象没有（这个属性），则会沿着属性找原型对象是否有此名称的属性，而原型还可能有原型，因此，有"原型链"这一说法。  
> 这一算法保证了每个对象只需要描述自己和原型的区别即可。

##### 2.1.3 语法
- {}/./[]/Object.defineProperty
> 提供了基本的对象机制操作：创建对象、访问属性、定义新的属性、改变属性的特征值
- Object.create/Object.setPrototypeOf/Object.getPrototypeOf
> 基于原型描述对象的方法
- new/class/extends
> ES6新增，基于类的方式描述对象的方法
- new/function/prototype
> 由于历史的原因，基于function和prototype的方式描述对象的方法，不建议使用
##### 2.1.3 特殊对象
###### 2.1.3.1 函数对象 function
> 除了一般对象的属性和原型，函数对象还有一个行为[[call]]  
> 用JS重的function关键字，箭头运算符活着Function构造器创建的对象，会有[[call]]这个行为。  
> 用类似f()这样的语法把对象当作函数调用时，会访问到[[call]]这个行为，如果对应对象没有[[call]]这个行为，则程序会报错  
> function.prototypeOf这个对象原型没有[[setPrototypeOf]]方法，可以调用，但没有任何效果
###### 2.1.3.1 数组对象 Array
> 数组对象具有length这个特殊属性，会随着数组的长度发生改变而动态变化
###### 2.1.3.1 字符串对象 String
> 和数组对象一样，字符串也具有length这个特殊属性，会随着数组的长度发生改变而动态变化  
> 字符串对象可以通过下标访问到其中的任意一个字符
###### 2.1.3.1 宿主对象 Host Object
> 用JavaScript语法支持的一些特性去实现JavaScript语言并不支持的特性
- 浏览器的"window"
- nodeJS的"global"
