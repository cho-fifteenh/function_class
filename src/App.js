import React, { Component, useState, useEffect } from "react";
import "./App.css";

function App() {
  var [funcShow, setFuncShow] = useState(true);
  var [classShow, setClassShow] = useState(true);
  return (
    <div classNmae="App">
      !!
      <input
        type="button"
        value="remove func"
        onClick={function () {
          setFuncShow(false);
        }}
      />
      <input
        type="button"
        value="remove func"
        onClick={function () {
          setClassShow(false);
        }}
      />
      {funcShow ? <FuncComp initNumber={2} /> : null}
      {classShow ? <ClassComp initNumber={2} /> : null}
    </div>
  );
}

//함수 안에서 state 사용하기.
function FuncComp(props) {
  var numberState = useState(props.initNumber); //2개 이상의 배열/ [0]는 undefined인데 props.initNumber을 넣어주면 [0]의 값이 바뀜. ==> state처럼 쓸 수 있음.
  var number = numberState[0];
  var setNumber = numberState[1]; //배열의 두번째 값은 상태를 바꾸는 함수.

  // var dateState = useState(new Date().toString());
  // var _date = dateState[0];
  // var setDate = dateState[1];

  //축약형
  var [_date, setDate] = useState(new Date().toString());

  //side effect
  useEffect(
    function () {
      console.log("func => useEffect()");
      document.title = number;
      return function () {
        console.log("func => useEffect return");
      };
    },
    [number]
  ); //number의 원소 상태가 바뀌었을 때만 첫번째 callback 함수가 호출됨.

  //componetDidMount에서만 실행되게
  useEffect(
    function () {
      console.log("func => useEffect()");
      document.title = number;
      return function () {
        console.log("func => useEffect return");
      };
    },
    [] // 빈배열을 넣으면 1회는 실행되나 그 다음엔 실행되지 않음.
  );

  return (
    <div className="container">
      <h2>function style componet</h2>
      <p>Number:{props.initNumber}</p>
      <p>state처럼 쓰기 Date:{_date}</p>
      <p>state처럼 쓰기 Number:{number}</p>
      <input
        type="button"
        value="random"
        onClick={function () {
          setNumber(Math.random());
        }}
      ></input>
      <input
        type="button"
        value="date"
        onClick={function () {
          setDate(new Date().toString());
        }}
      ></input>
    </div>
  );
}

class ClassComp extends Component {
  state = {
    number: this.props.initNumber,
    date: new Date().toString(),
  };
  componentWillMount() {
    console.log("class => componentWillMount");
  }
  render() {
    return (
      <div className="container">
        <h2>class style component</h2>
        <p>Number:{this.props.initNumber}</p>
        <p>Number:{this.state.number}</p>
        <p>Date:{this.state.date}</p>
        <input
          type="button"
          value="random"
          onClick={function () {
            this.setState({ number: Math.random() });
          }.bind(this)}
        ></input>
        <input
          type="button"
          value="date"
          onClick={function () {
            this.setState({ date: new Date().toString() });
          }.bind(this)}
        ></input>
      </div>
    );
  }
}

export default App;
