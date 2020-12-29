import React from "react";
import analyzeString from "./core/LexicalAnalyzer";
import { CodeFlaskReact } from "react-codeflask";

import "./css/Main.css";
import "bootstrap/dist/css/bootstrap.min.css";

class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      text: "/* 👆 上传文件，或者输入一些代码... */",
      result: [],
    };
    this.handleFileChange = this.handleFileChange.bind(this);
    this.handleTextChange = this.handleTextChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleReset = this.handleReset.bind(this);
  }

  handleFileChange() {
    let fileInput = document.getElementById("file-input");// 获取输入框节点
    let file = fileInput.files[0];// files为文件对象数组
  // <input> 标签规定用户可输入数据的输入字段。
// 根据不同的 type 属性，
// 输入字段有多种形态。输入字段可以是文本字段、复选框、密码字段、单选按钮、按钮等等。
    let reader = new FileReader();
    reader.addEventListener("loadend", () => {
      this.setState({
        text: reader.result,
      });
      fileInput.value = "";// 输入完成后清空
    });
    reader.readAsText(file);
  }
   // 文本改变，覆盖状态
  handleTextChange(code) {
    this.setState({
      text: code,
    });
  }

  handleSubmit() {
    let string = this.state.text; // 从状态中拿取字符串
    let result = analyzeString(string); // 调用解析函数
    this.setState({ result }); // 存储解析结果
  }

  handleReset() {
    // 重置状态到原始值
    this.setState({ text: "/* 👆上传文件，或者输入一些代码... */", result: [] });
  }

  render() {
    return (
      <div className="main row">
        <div className="left-box col-lg-6 col-md-6 col-sm-6 col-xs-1">
          <div className="custom-file">
            <input
              className="custom-file-input"
              type="file"
              id="file-input"
              onChange={this.handleFileChange}
            />
            <label className="custom-file-label" data-browse="浏览文件">
              选择文件
            </label>
          </div>

          <CodeFlaskReact
            code={this.state.text}
            onChange={this.handleTextChange}
            id="code-editor"
            language="clike"
            fontSize={25}
            defaultTheme={false}
          />

          <div className="buttons row">
            <div className="col-lg-6 col-xs-1">
              <button className="btn btn-warning" onClick={this.handleReset}>
                重置 <i className="fas fa-sync-alt"></i>
              </button>
            </div>
            <div className="col-lg-6 col-xs-1">
              <button className="btn btn-primary" onClick={this.handleSubmit}>
                分析 <i className="fas fa-angle-right"></i>
              </button>
            </div>
          </div>
        </div>

        <div className="right-box col-lg-6 col-md-6 col-sm-6 col-xs-1">
          <h2>分析结果</h2>
          <div className="token-table-container">
            <TokenTable tokens={this.state.result} />
          </div>
        </div>
      </div>
    );
  }
}
// 自定义函数渲染表格组件，只塞入props，即分析之后的数据，纯函数渲染功能
function TokenTable(props) {
  let typeStringsCHN = [
    "错误",
    "关键字",
    "标识符",
    "操作符",
    "分隔符",
    "常量",
    "注释",
  ];
  // ID 类型根据type下标对应相关的关键字  内容
  const tokens = props.tokens.map((token) => {
    return (
      <tr key={token.key}>
        <td>{token.key + 1}</td>
        <td>{typeStringsCHN[token.type]}</td>
        <td>{token.content}</td>
      </tr>
    );
  });

  return (
    <table className="table table-bordered">
      <thead>
        <tr>
          <td>ID</td>
          <td>类型</td>
          <td>内容</td>
        </tr>
      </thead>
      <tbody>{tokens}</tbody>
    </table>
  );
}

// function ResultBox(props) {
//   const tokens = props.tokens.map((token) => {
//     return <Token token={token} key={token.key} />;
//   });
//   return <div className="token-box">{tokens}</div>;
// }

// function Token(props) {
//   let typeStringsCHN = [
//     "错误",
//     "关键字",
//     "标识符",
//     "操作符",
//     "分隔符",
//     "常量",
//     "注释",
//   ];
//   return (
//     <div className="token">
//     <h4></h4>
//       <h2>{props.token.key + 1}</h2>
//       <h3>{typeStringsCHN[props.token.type]}</h3>
//       <h3>{props.token.content}</h3>
//     </div>
//   );
// }

export default Main;
