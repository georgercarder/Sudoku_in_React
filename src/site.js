import React from 'react';
import './index.css';
import Game from './game';
import Introd from './introd';

class Site extends React.Component {
  
  constructor(props){
    super(props);
    this.state={
			page: <Introd changepage={(i) => this.changepage(i)}/> 
    };
  }

	changepage(i){
		if (i===1){
			this.setState({page:  <Game />,})
		}
	}

  render() {

    return (
      <body>
				{this.state.page}
      </body>
    );
  }
}

export default Site;
