import React from './react';
import ReactDOM from './react-dom';
const ele = (
    <div className='active' title='123'>
        hello,<span>react</span>
    </div>
)

/* function Home() {
    return (
        <div className='active' title='123'>
            hello,<span>react</span>
        </div>
    )
} */
class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            num: 0
        }
    }
    componentWillMount() {
        console.log('组件将要加载');
    }
    componentWillReceiveProps(props) {
        console.log('props');
    }
    componentWillUpdate() {
        console.log('组件将要更新');
    }
    componentDidUpdate() {
        
    }
    componentDidMount() {
        console.log('组件加载完成');
        for (let i = 0; i < 10; i++) {
            this.setState((prevState, prevProps) => {
                console.log(prevState.num);

                return {
                    num: prevState.num + 1
                }
            })
        }

    }
    handlerClick() {
        // 修改状态的唯一方法是调用setState
        this.setState({
            num: this.state.num + 1
        })
    }
    render() {
        return (
            <div className='active' title='123'>
                {this.state.num}
                hello,<span>react </span> 
                <button onClick={this.handlerClick.bind(this)}>摸我</button>
            </div>
        );
    }
}
const title = 'active'
// console.log(<Home name={title}/>);
// 核心:组件化开发
// 两个问题:
// 1.为什么ReactDOM.render()必须要引入React?
// 2.组件: 函数组件 类组件
// ReactDOM.render('React',document.querySelector('#root'));
// ReactDOM.render(ele, document.querySelector('#root'));
ReactDOM.render(<Home name={title} />, document.querySelector('#root'));
/* 
createElement(tag,attrs,child1,chil2....)

var ele = React.createElement("div", {
  className: "active",
  title: "123"
}, "hello,", React.createElement("span", null, "react"));

*/