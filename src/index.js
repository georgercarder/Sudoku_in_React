import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Center from 'react-center';

function Square(props){
  return(
    <button className="square" onClick={() => props.onClick()}>
      {props.value}
    </button>
  );
}

function RedSquare(props){
  return(
    <button className="redsquare">
      {props.value}
    </button>
  );
}

class Board extends React.Component {
  renderSquare(i) {
    if(this.props.red[i]===null){
      return <Square
        value={this.props.squares[i]}
        onClick={() => this.props.onClick(i)}/>;
    } else {
      return <RedSquare
        value={this.props.squares[i]}
      />;

    }
  }

  render() {
    const welcome = 'Welcome to Sudoku!';
      return (
        <div>
          <center>
            <div className="status"><h1>{welcome}</h1></div>
            <div className="gamestatus">{this.props.gamestatus()}</div>
            <div className="table">
              <div className="board-row">
                {this.renderSquare(0)}
                {this.renderSquare(1)}
                {this.renderSquare(2)}
                {this.renderSquare(3)}
              </div>
              <div className="board-row">
                {this.renderSquare(4)}
                {this.renderSquare(5)}
                {this.renderSquare(6)}
                {this.renderSquare(7)} 
              </div>
              <div className="board-row">
                {this.renderSquare(8)}
                {this.renderSquare(9)}
                {this.renderSquare(10)}
                {this.renderSquare(11)} 
              </div> 
              <div className="board-row">
                {this.renderSquare(12)} 
                {this.renderSquare(13)}
                {this.renderSquare(14)}
                {this.renderSquare(15)} 
              </div>
            </div>
          </center>
        </div>
      );
    }
  }

class Game extends React.Component {
  
  constructor(props){
    super(props);
    this.state={
      squares: Array(16).fill(null),  
      red: Array(16).fill(null),
      win: false,
      checking: 0,
      message: null,
      startorclear: 'start',
      started: 0,
    };
  }

  startorclear(){
    if(this.state.startorclear==='start'){
      return(<h3>START</h3>);  
    } else {
      return(<h3>CLEAR</h3>);
    }
  }

  start(){
    if(this.state.startorclear==='start'){
      const red=this.state.red.slice()
      const squares= this.state.squares.slice();

      squares[0]=1
      squares[1]=4
      squares[8]=3
      squares[10]=1
      squares[14]=2
      red[0]=1
      red[1]=4
      red[8]=3
      red[10]=1
      red[14]=2

      this.setState({squares: squares, red: red, started: 1, startorclear: "clear",});
    } else {
      this.setState({  
        squares: Array(16).fill(null),  
        red: Array(16).fill(null),
        win: false,
        checking: 0,
        message: null,
        startorclear: 'start',
        started: 0,
      });
    }
  }

  handleClick(i){
    const squares = this.state.squares.slice();
    squares[i]=(squares[i]%4)+1;
    this.setState({squares: squares});
  }
  
  gamestatus(){
    if(this.state.started!=1){
      return (<h3>Push 'start' to start game</h3>)  
    } else if (this.state.win===false&&this.state.message!=1){
      return (<h3>status: game in progress</h3>);
    } else if (this.state.win===false&&this.state.message==1){
      return (<h3>keep trying, game in progress</h3>);
    }else {
      return (<h3>CONGRATULATIONS SUDOKU MASTER!</h3>);  
    }
  }

  gamecheck(){
    this.setState({checking: 1})
    //this.state.squares
    var SQUARES=this.state.squares.slice()
    var r1=SQUARES.slice(0,4)  // I'm going to generalize this section
    var r2=SQUARES.slice(4,8)  // first priority was getting something working with REACT
    var r3=SQUARES.slice(8,12)
    var r4=SQUARES.slice(12,16)
    var c1=[SQUARES[0],SQUARES[4],SQUARES[8],SQUARES[12]]
    var c2=[SQUARES[1],SQUARES[5],SQUARES[9],SQUARES[13]]
    var c3=[SQUARES[2],SQUARES[6],SQUARES[10],SQUARES[14]]
    var c4=[SQUARES[3],SQUARES[7],SQUARES[11],SQUARES[15]]
    var b1=[SQUARES[0],SQUARES[1],SQUARES[4],SQUARES[5]]
    var b2=[SQUARES[2],SQUARES[3],SQUARES[6],SQUARES[7]]
    var b3=[SQUARES[8],SQUARES[9],SQUARES[12],SQUARES[13]]
    var b4=[SQUARES[10],SQUARES[11],SQUARES[14],SQUARES[15]]
    //
    var BIG=[r1,r2,r3,r4,c1,c2,c3,c4,b1,b2,b3,b4]

    var decision=true

    for (var i=0;i<12;i++){
      for(var j=1;j<5;j++){
        var found_1=BIG[i].find(function(x){
          return x===1;  
        });
        var found_2=BIG[i].find(function(x){
          return x===2;  
        });
        var found_3=BIG[i].find(function(x){
          return x===3;  
        });
        var found_4=BIG[i].find(function(x){
          return x===4;  
        });

        if (typeof found_1 == "undefined"||typeof found_2 == "undefined"||typeof found_3 == "undefined"||typeof found_4 == "undefined"){
          decision=false
        }
      }  
    }
    if( decision===true ){
      this.setState({win: true,});  
    } else {
      this.setState({win: false, message: 1});
    }
  }

  render() {
    return (
      <body>
        <div className="game">
          <Board 
            squares={this.state.squares}
            red={this.state.red}
            gamestatus={() => this.gamestatus()}
            onClick={(i) => this.handleClick(i)}/>
        </div>
        <center>
          <div>
            <div className="start" onClick={() => this.start()}>{this.startorclear()}</div>
            <div className="check" onClick={() => this.gamecheck()}><h3>CHECK</h3></div>
          </div>
        </center>
      </body>
    );
  }
}

// ========================================

ReactDOM.render(
  <Center>
    <Game />,
  </Center>,
  document.getElementById('root')
);

