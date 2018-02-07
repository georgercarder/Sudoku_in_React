import React from 'react';
import './index.css';

class Introd extends React.Component {
  
  constructor(props){
    super(props);
    this.state={
    };
  }

  render() {

    return (
      <div onClick={() => this.props.changepage(1)}>
				<center>
				<h1 style={{'font-size':'500%'}}>Sudoku Sunshine</h1>
				<h1>click to enter</h1>
			  </center>
      </div>
    );
  }
}

export default Introd;
