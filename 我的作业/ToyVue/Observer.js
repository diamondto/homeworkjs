// 观察新值和旧值的变化,如果有变化 更新视图

class Watcher {
    constructor(vm, expr, cb) {
        this.vm = vm;
        this.expr = expr;
        this.cb = cb;
        //   先把旧值存起来  
        this.oldVal = this.getOldVal();
    }
    getOldVal() {
        Dep.target = this;
        // compileUtil.getVal('person.name', vm)
        const oldVal = compileUtil.getVal(this.expr, this.vm)
        Dep.target = null
        return oldVal
    }
    update() {
        //  更新操作 数据变化后 Dep会发生通知 告诉观察者更新视图
        const newVal = compileUtil.getVal(this.expr, this.vm)
        if (newVal !== this.oldVal) {
            this.cb(newVal)
        }
    }

}
class Dep {
    constructor() {
        this.subs = []
    }
    addSub(watcher) {
        this.subs.push(watcher)
    }
    notify() {
        this.subs.forEach(w => w.update())
    }
}

class Observer {
    constructor(data) {
        this.observe(data)
    }
    // 数据劫持
    observe(data) {
        //如果是对象就遍历
        if (data && typeof data === 'object') {
            Object.keys(data).forEach(key => {
                this.defineReactive(data, key, data[key])
            })
        }
    }
    defineReactive(obj, key, value) {
        //  循环递归 对所有层的数据进行观察
        this.observe(value)
        // 通过闭包来实现Dep
        const dep = new Dep()
        Object.defineProperty(obj, key, {
            enumerable: true,
            configurable: false,
            get() {
                // 订阅数据变化时，往Dep中添加观察者
                Dep.target && dep.addSub(Dep.target)
                return value
            },
            set: (newVal) => {
                // 设置新的值
                this.observe(newVal)
                if (newVal !== value) {
                    value = newVal
                }
                dep.notify()
            }
        })
    }

}