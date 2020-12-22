import React from 'react';
import ReactDOM from 'react-dom';

// const ele = (
//     <div title='hello'>
//         <h3 className='title'>hello,react</h3>
//     </div>
// )

/* var ele = React.createElement("div", {title: "hello"}, React.createElement("h3", {
  className: "title"
}, "hello,react")); */
class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      num: 0
    }
  }
  componentDidMount(){
    for(let i = 0; i < 100; i++){
      /* this.setState({
        num:this.state.num + 1
      })
      console.log(this.state.num); */
      this.setState((prevState,prevProps)=>{
        console.log(prevState.num);
        return {
          num: prevState.num +1
        }
      })
      console.log(this.state.num);
      
    }
  }
  render() {
    return (
      <div>
        <p>{this.state.num}</p>
      </div>
    );
  }
}


// jsx: javascript+xml 虚拟DOM  语法糖
ReactDOM.render( <Home /> , document.querySelector('#root'));