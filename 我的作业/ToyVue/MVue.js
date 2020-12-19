// 解析工具类
const compileUtil = {
    getVal(expr, vm) {
        return expr.split('.').reduce((data, cur) => {
            // 在这里触发函数的getter
            data = data[cur]
            return data
        }, vm.$data)
    },
    setVal(expr, vm, inputVal) {
        // 'person.age'
        return expr.split('.').reduce((data, cur,index,arr) => {
            // 在这里触发函数的getter 一个不断赋值的操作
            if (index == arr.length - 1) {
                data[cur] = inputVal;
            }
            return data[cur]
        }, vm.$data)
    },
    //  获取新值 对{{a}}--{{b}} 这种格式进行处理
    getContentVal(expr, vm) {
        return expr.replace(/\{\{(.+?)\}\}/g, (...args) => {
            return this.getVal(args[1], vm)
        })
    },
    text(node, expr = '', vm) {
        // 处理 <div v-text='person.fav'></div> {{person.name}} - {{person.age}}
        let value;
        if (String.prototype.includes.call(expr, '{{')) { // {{person.name}} - {{person.age}}
            value = expr.replace(/\{\{(.+?)\}\}/g, (...args) => {
                //绑定watcher从而更新视图
                new Watcher(vm, args[1], (newVal) => {
                    this.updater.textUpdater(node, this.getContentVal(expr, vm))
                })
                return this.getVal(args[1], vm)
            })
        } else {
            //也可能是v-text='obj.name' v-text='msg'
            value = this.getVal(expr, vm);
        }
        this.updater.textUpdater(node, value)

    },
    html(node, expr, vm) {
         // html处理直接取值 然后调用更新函数即可
        const value = this.getVal(expr, vm)
        new Watcher(vm, expr, (newVal) => {
            this.updater.htmlUpdater(node, newVal)
        })
        this.updater.htmlUpdater(node, value)
    },
    model(node, expr, vm) {
        const value = this.getVal(expr, vm)
        
         // 订阅数据变化时 绑定更新函数 更新视图的变化
        // 数据==>视图
        new Watcher(vm, expr, (newVal) => {
            this.updater.modelUpdater(node, newVal)
        })
        // 视图 =》 数据 =》 视图
        node.addEventListener('input', (e) => {
            // 设置值
            this.setVal(expr, vm, e.target.value)
        })
        this.updater.modelUpdater(node, value)
    },
    // 对事件进行处理
    on(node, expr, vm, eventName) {
         // 获取事件函数
        let fn = vm.$options.methods && vm.$options.methods[expr]
        // 添加事件使用vue时 都不需要关心this的指向问题,这是因为源码的内部已经处理了this
        node.addEventListener(eventName, fn.bind(vm), false)
    },
    // 更新的函数
    updater: {
    // 绑定简单的属性较好写
    // 类名样式的绑定较复杂 因为对应的值可能是对象 也可能是数组
        modelUpdater(node, value) {
            node.value = value
        },
        textUpdater(node, value) {
            node.textContent = value
        },
        htmlUpdater(node, value) {
            node.innerHTML = value
        },
        model(node, expr, vm) {

        }
    }
}

// 模版编译
class Compile {
    constructor(el, vm) {
        this.el = this.isElementNode(el) ? el : document.querySelector(el);
        this.vm = vm

        //1. 获取文档碎片对象 放入内存中会减少回流和重绘
        const fragment = this.node2Fragment(this.el)
        //2. 编译模版
        this.compile(fragment)
        //3. 追加子元素到跟节点
        this.el.appendChild(fragment)
    }
    compile(fragment) {
        // 1.获取子节点
        const childNodes = fragment.childNodes;

        [...childNodes].forEach(child => {
            if (this.isElementNode(child)) {
                // 是元素节点
                this.compileElement(child)
            } else {
                // 文本节点
                this.compileText(child)
            }

            // 递归遍历 
            if (child.childNodes && child.childNodes.length) {
                this.compile(child)
            }
        })
    }
    compileElement(node) {
        // 编译元素 <div v-html="text"></html>
        const attributes = node.attributes;
        [...attributes].forEach(attr => {
            const { name, value } = attr

            if (this.isDirective(name)) { // 是一个指令 v-text v-html v-on:click
                const [, directive] = name.split('-');
                const [dirName, eventName] = directive.split(':');

                // 更新数据 数据驱动视图
                compileUtil[dirName](node, value, this.vm, eventName)

                // 删除有指令的标签上的属性
                node.removeAttribute(name)
            } else if (this.isEventName(name)) {
                // @click='handleClick'
                let [, eventName] = name.split('@');
                compileUtil['on'](node, value, this.vm, eventName)
            }
        })
    }
    compileText(node) {
        const content = node.textContent;

        if (/\{\{(.+?)\}\}/.test(content)) {
            compileUtil['text'](node, content, this.vm)
        }
    }
    node2Fragment(el) {
        const f = document.createDocumentFragment();
        while (el.firstChild) {
            f.appendChild(el.firstChild)
        }
        return f
    }
    isDirective(name) {
        return String.prototype.startsWith.call(name, 'v-')
    }
    isEventName(name) {
        return String.prototype.startsWith.call(name, '@')
    }
    isElementNode(node) {
        return node.nodeType === 1
    }

}
// 使用vue的时候,通常可以直接vm.msg来获取数据,
// 这是因为vue源码内部做了一层代理.也就是说把数据获取操作vm上的取值操作都代理到vm.$data上
class MVue {
    constructor(options) {
        this.$el = options.el
        this.$data = options.data
        this.$options = options

        if (this.$el) {
             // 如果这个根元素存在开始编译模板
            // 1. 实现一个数据观察者，能够对数据对象的所有属性进行监听，如有变动可拿到最新值并通知订阅者
            new Observer(this.$data)
            // 2. 实现一个指令解析器
            new Compile(this.$el, this)
            // 3. 实现代理，把数据获取操作 vm上的取值操作 都代理到vm.$data上
            this.proxyDataa(this.$data)
        }
    }
    proxyDataa(data) {
        for (const key in data) {
            Object.defineProperty(this, key, {
                get() {
                    return data[key]
                },
                set(newVal) {
                    data[key] = newVal
                }
            })
        }
    }
}