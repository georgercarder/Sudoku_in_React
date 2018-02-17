import React from 'react';
import './index.css';
import Board from './board';

class Game extends React.Component {
  
  constructor(props){
    super(props);
    this.state={
      prepuzzle: this.props.puzzles[Math.floor(Math.random()*30)].puzzle,
      rank: 2,
      prerank: 2,
      difficulty: 5,
      predifficulty: 5,
      squares: Array(16).fill(null),  
      red: Array(16).fill(null),
      win: false,
      message: null,
			status: <h3>push 'start' to start game</h3>,
      startorclear: 'start',
      started: 0,
      puzzles: this.props.puzzles,
    };
  }

  setRank(){
    if(this.state.prerank===2){
      this.setState({prerank: 3})  
    } else {
      this.setState({prerank: 2})  
    }
  }

  setDiff(){
    var predifficulty = this.state.predifficulty
    this.setState({predifficulty: (predifficulty%6)+1})
  }

  load(){
    this.findPuzzle(this.state.prerank,this.state.predifficulty);
    this.setState({
      rank: this.state.prerank, 
      difficulty: this.state.predifficulty,
      /*squares,red:Array(this.state.prerank**4).fill(null)*/
      
      win: false,
      message: null,
      startorclear: 'start',
      started: 0,
      })
      setTimeout(function() {this.start()}.bind(this),1)
  }

  findPuzzle(rank,diff){
    var l = this.state.puzzles.length
    var found = false
    var r = 0
    while(found === false){
      r = Math.floor(Math.random()*l)
      if(this.state.puzzles[r].rank===rank && this.state.puzzles[r].difficulty===diff){
        this.setState({prepuzzle: this.state.puzzles[r].puzzle.slice()})
        found = true
      }
    }
  }

  startorclear(){
    if(this.state.startorclear==='start'){
      return(<h3>start</h3>);  
    } else {
      return(<h3>clear</h3>);
    }
  }

  start(){
    if(this.state.startorclear==='start'){
      const red=this.state.red.slice()
      const squares= this.state.squares.slice();
      var puzzle=this.state.prepuzzle;
        /*[1,4,0,0,0,0,0,0,3,0,1,0,0,0,2,0]*/
  
      for(var i=0;i<this.state.rank**4;i++){
        if(puzzle[i]!==0){
          squares[i]=puzzle[i]
          red[i]=puzzle[i]
        } else {
          squares[i]=null
          red[i]=null
        }
      }

      this.setState({squares: squares, red: red, started: 1, startorclear: "clear",}, () => this.changeStatus());
    } else {
      this.setState({  
        squares: Array(this.state.rank**4).fill(null),  
        red: Array(this.state.rank**4).fill(null),
        win: false,
        checking: 0,
        message: null,
        startorclear: 'start',
        started: 0,
      }, () => this.changeStatus());
    }
  }

  handleClick(i){
    const squares = this.state.squares.slice();
    squares[i]=(squares[i]%this.state.rank**2)+1;
    this.setState({squares: squares});
  }
  
  changeStatus(){
    if(this.state.started!==1){
      this.setState({status: <h3>Push 'start' to start game</h3>})  
    } else if (this.state.win===false&&this.state.message!==1){
      this.setState({status: <h3>game in progress</h3>});
    } else if (this.state.win===false&&this.state.message===1){
      this.setState({status: <h3>nope, keep trying</h3>});
    }else {
      this.setState({status: <h3>SUDOKU WINNER!</h3>});  
    }
  }

  gamecheck(){
    //this.state.squares
    var SQUARES=this.state.squares.slice()
    var rank=this.state.rank
    // ROWS COLUMNS BOXES

    var decision=true
    // rows
    let set = new Set()
    for(var i=0;i<(rank**2);i++){
      set.clear()
      for(var j=0;j<=(rank**2);j++){
        set.add(SQUARES[j+i*(rank**2)])
      }
      if(set.size<(rank**2)){
        decision=false
        break
      }
    }
    // cols
    for(var j=0;j<(rank**2);j++){
      set.clear()
      for(var i=0;i<=(rank**2);i++){
        set.add(SQUARES[j+i*(rank**2)])
      }
      if(set.size<(rank**2)){
        decision=false
        break
      }
   }

    // boxes will be difficult...
    var b = 0
    let box = new Set()
    while(b<rank**2){
      for(var i=0;i<rank;i++){
        for(var j=0;j<rank;j++){
          box.clear()
          for(var ii=rank*i;ii<rank*(i+1);ii++){
            for(var jj=rank*j;jj<rank*(j+1);jj++){
              box.add(SQUARES[jj+(rank**2)*ii])
              b=b+1
            }
          }
          if(box.size<(rank**2)){
            decision=false
            break
          }
        }
      if(decision===false){
        break
      }
      }
      if(decision===false){
        break
      }
    }

    if( decision===true ){
      this.setState({win: true, red: this.state.squares}, () => this.changeStatus());  
    } else {
      this.setState({win: false, message:1}, () => this.changeStatus());
      setTimeout(function() {this.setState({message: 2}, () => this.changeStatus())}.bind(this),1200)
    }
  }

  render() {
    const welcome = 'Sudoku Sunshine';

    return (
      <div>
      <div className="welcome"><h1>{welcome}</h1></div>

        <div className="dashboard">
          <div className="button" onClick={() => this.setRank()}><h3>rank {this.state.prerank}</h3></div>
          <div className="button" onClick={() => this.setDiff()}><h3>difficulty {this.state.predifficulty}</h3></div>
          <div className="button" onClick={() => this.load()}><h3>select</h3></div>
          <div className="button" onClick={() => this.start()}>{this.startorclear()}</div>
          <div className="button" onClick={() => this.gamecheck()}><h3>check</h3></div>
        </div>
        <div className="status">{this.state.status}</div>
        <div className="gamePad">
          <div className="game" >
          <Board
            rank={this.state.rank}
            difficulty={this.state.difficulty}
            squares={this.state.squares}
            red={this.state.red}
            gamestatus={() => this.gamestatus()}
            onClick={(i) => this.handleClick(i)}/>
          </div>
        </div>
      </div>
    );
  }
}

export default Game;
