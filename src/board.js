import React from 'react';
import './index.css';
import Square from './square';
import RedSquare from './redsquare';


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

		buildrow(i){
					var row=[]
					for (var j=0;j<this.props.rank**2;j++){
									var index=j+i*(this.props.rank**2)
									row.push(this.renderSquare(index))	
								}
					return	<div className='board-row'>
											{row}
									</div>
					}

		buildtable(rank) {
					if(rank === 0){
									return <h3>build table</h3>
									} else {
													var table=[]
													for(var i=0;i<rank**2;i++){
																		table.push(this.buildrow(i))	
																	}
													return table
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
													{this.buildtable(this.props.rank)}
													</div>
													<div className="rank"><h3>Rank</h3></div>
													<div className="difficulty"><h3>Difficulty</h3></div>
							          </center>
							        </div>
							      );
			    }
	  }

export default Board;
