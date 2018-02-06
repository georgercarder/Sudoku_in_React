import React from 'react';
import './index.css';
import Board from './board';

class Game extends React.Component {
  
  constructor(props){
    super(props);
    this.state={
			rank: 2,
			difficulty: 7,
      squares: Array(16).fill(null),  
      red: Array(16).fill(null),
      win: false,
      checking: 0,
      message: null,
      startorclear: 'start',
      started: 0,
    };
  }

  setRank(){
		if(this.state.rank===2){
		  this.setState({rank: 3})	
		} else {
			this.setState({rank: 2})	
		}
	}

	setDiff(){
		var difficulty = this.state.difficulty
		this.setState({difficulty: (difficulty%10)+1})
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
			var puzzle=[1,4,0,0,0,0,0,0,3,0,1,0,0,0,2,0]
	
			for(var i=0;i<16;i++){
				if(puzzle[i]!==0){
					squares[i]=puzzle[i]
					red[i]=puzzle[i]
				}
			}

      this.setState({squares: squares, red: red, started: 1, startorclear: "clear",});
    } else {
      this.setState({  
				rank: 2, 
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
    if(this.state.started!==1){
      return (<h3>Push 'start' to start game</h3>)  
    } else if (this.state.win===false&&this.state.message!==1){
      return (<h3>status: game in progress</h3>);
    } else if (this.state.win===false&&this.state.message===1){
      return (<h3>keep trying, game in progress</h3>);
    }else {
      return (<h3>CONGRATULATIONS SUDOKU MASTER!</h3>);  
    }
  }

  gamecheck(){
    this.setState({checking: 1})
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
      this.setState({win: true,});  
    } else {
      this.setState({win: false, message: 1});
    }
  }

  render() {
		const welcome = 'Welcome to Sudoku!';
	  const rankDiff = 'rank='+this.state.rank+' difficulty='+this.state.difficulty;

    return (
      <div>
				<center>
			<div className="status"><h1>{welcome}</h1><h3>{rankDiff}</h3></div>
			          <div className="gamestatus">{this.gamestatus()}</div>


					<div>
						<div className="rank" onClick={() => this.setRank()}><h3>rank</h3></div>
			      <div className="difficulty" onClick={() => this.setDiff()}><h3>difficulty</h3></div>
						<div className="loadpuzzles"><h3>load</h3></div>
			</div>
			<div>
            <div className="start" onClick={() => this.start()}>{this.startorclear()}</div>
            <div className="check" onClick={() => this.gamecheck()}><h3>check</h3></div>
					</div>
			
        <div className="game">
          <Board
						rank={this.state.rank}
						difficulty={this.state.difficulty}
            squares={this.state.squares}
            red={this.state.red}
            gamestatus={() => this.gamestatus()}
            onClick={(i) => this.handleClick(i)}/>
        </div>
			</center>
      </div>
    );
  }
}

export default Game;
