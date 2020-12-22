import Component from '../react/component';
import { diff,diffNode} from "./diff";
const ReactDOM = {
    render
}

/* 
const ele = ( <div className = 'active'
    title = '123' style='' style={ {} } >
    hello, < span > react < /span> <
    /div>
)
ReactDOM.render(ele, document.querySelector('#root'));
*/
function render(vnode, container,dom) {
    return diff(dom,vnode,container);
}

export function createComponent(comp, props) {
    let inst;
    if (comp.prototype && comp.prototype.render) {
        console.log('类组件加载了');

        // 如果是类定义的组件 则创建实例 返回
        inst = new comp(props);
    } else {
        // 如果是函数组件,将函数组件扩展成类组件 方便后面统一管理
        inst = new Component(props);
        inst.constructor = comp;
        // 定义render函数
        inst.render = function () {
            return this.constructor(props);
        }
    }
    return inst;
}
export function setComponentProps(comp, props) {
    if (!comp.base) {
        if (comp.componentWillMount) comp.componentWillMount();
    } else if (comp.componentWillReveiveProps) {
        comp.componentWillReveiveProps();
    }
    // 设置组件的属性
    comp.props = props;
    // 渲染组件
    renderComponent(comp);
}
export function renderComponent(comp) {
    let base;
    const renderer = comp.render();

    // 更改的部分
    // base = _render(renderer);
    base = diffNode(comp.base, renderer);
    if (comp.base && comp.componentWillUpdate) {
        comp.componentWillUpdate();
    }
    if (comp.base) {
        if (comp.componentDidUpdate) comp.componentDidUpdate();
    } else if (comp.componentDidMount) {
        comp.componentDidMount();
    }
    // 节点替换
    /* if (comp.base && comp.base.parentNode) {
        comp.base.parentNode.replaceChild(base, comp.base);
    } */
    comp.base = base;
}
function _render(vnode) {
    if (vnode === undefined || vnode === null || typeof vnode === 'boolean') vnode = '';
    if (typeof vnode === 'number') vnode = String(vnode);
    // 如果vnode是字符串
    if (typeof vnode === 'string') {
        // 创建文本节点
        return document.createTextNode(vnode);
    }

    //  如果tag是函数,则渲染组件 react 函数就是一个组件
    if (typeof vnode.tag === 'function') {
        // 1.创建组件
        const comp = createComponent(vnode.tag, vnode.attrs);
        // 2.设置组件的属性
        setComponentProps(comp, vnode.attrs);
        // 3.组件渲染的节点对象返回
        return comp.base;
    }
    // 否则就是虚拟DOM对象
    const {
        tag,
        attrs
    } = vnode;
    // 创建节点对象
    const dom = document.createElement(tag);

    if (attrs) {
        // 有属性 key: className = 'active' title = '123'
        Object.keys(attrs).forEach(key => {
            const value = attrs[key];
            setAttribute(dom, key, value)
        })
    }
    if (vnode.childrens) {
        // 递归渲染子节点
        vnode.childrens.forEach(child => render(child, dom))
    }
    return dom;
}
// 设置属性
export function setAttribute(dom, key, value) {
    // 将属性名className转换成class
    if (key === 'className') {
        key = 'class';
    }

    // 如果是事件 onClick onBlur ....
    if (/on\w+/.test(key)) {
        // 转小写
        key = key.toLowerCase();
        dom[key] = value || '';
    } else if (key === 'style') {
        if (!value || typeof value === 'string') {
            dom.style.cssText = value || '';
        } else if (value && typeof value === 'object') {
            // {width: 20}
            for (let k in value) {

                if (typeof value[k] === 'number') {
                    dom.style[k] = value[k] + 'px';
                } else {
                    dom.style[k] = value[k]
                }
            }
        }
    } else {
        // 其它属性
        if (key in dom) {
            dom[key] = value || ''
        }
        if (value) {
            // 更新值
            dom.setAttribute(key, value);
        } else {
            dom.removeAttribute(key);
        }
    }


}
export default ReactDOM;