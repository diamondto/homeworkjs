#### 几种实现双向绑定的做法
目前几种主流的mvc(vm)框架都实现了单向数据绑定，双向数据绑定可以理解为就是在单向绑定的基础上给可输入元素（input、textare等）添加了change(input)事件，来动态修改model和 view。
实现数据绑定的做法有大致如下几种：

发布者-订阅者模式（backbone.js）
脏值检查（angular.js）
数据劫持（vue.js）

发布者-订阅者模式: 一般通过sub, pub的方式实现数据和视图的绑定监听，更新数据方式通常做法是 vm.set('property', value)，这里有篇文章讲的比较详细，有兴趣可点这里
这种方式现在毕竟太low了，我们更希望通过 vm.property = value这种方式更新数据，同时自动更新视图，于是有了下面两种方式
脏值检查: angular.js 是通过脏值检测的方式比对数据是否有变更，来决定是否更新视图，最简单的方式就是通过 setInterval() 定时轮询检测数据变动，当然Google不会这么low，angular只有在指定的事件触发时进入脏值检测，大致如下：

DOM事件，譬如用户输入文本，点击按钮等。( ng-click )
XHR响应事件 ( $http )
浏览器Location变更事件 ( $location )
Timer事件( interval )
执行 apply()

数据劫持: vue.js 则是采用数据劫持结合发布者-订阅者模式的方式，通过Object.defineProperty()来劫持各个属性的setter，getter，在数据变动时发布消息给订阅者，触发相应的监听回调。
MVVM原理
Vue响应式原理最核心的方法便是通过Object.defineProperty()来实现对属性的劫持，达到监听数据变动的目的，无疑这个方法是本文中最重要、最基础的内容之一
整理了一下，要实现mvvm的双向绑定，就必须要实现以下几点：

1、实现一个数据监听器Observer，能够对数据对象的所有属性进行监听，如有变动可拿到最新值并通知订阅者
2、实现一个指令解析器Compile，对每个元素节点的指令进行扫描和解析，根据指令模板替换数据，以及绑定相应的更新函数
3、实现一个Watcher，作为连接Observer和Compile的桥梁，能够订阅并收到每个属性变动的通知，执行指令绑定的相应回调函数，从而更新视图
4、mvvm入口函数，整合以上三者

实现指令解析器Compile
实现一个指令解析器Compile，对每个元素节点的指令进行扫描和解析，根据指令模板替换数据，以及绑定相应的更新函数,添加监听数据的订阅者，一旦数据有变动，收到通知，更新视图。
![Alt text](图片链接 "https://user-gold-cdn.xitu.io/2020/6/9/17297083977dad4d?imageView2/0/w/1280/h/960/format/webp/ignore-error/1")
