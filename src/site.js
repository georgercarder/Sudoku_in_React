import React from 'react';
import './index.css';
import Game from './game';
import Introd from './introd';
import Fetchgames from './fetchgames';
import axios from 'axios';

class Site extends React.Component {
  
  constructor(props){
    super(props);
    this.state={
			page: <Introd onload={this.handleFetch()} changepage={(i) => this.changepage(i)}/>,
			puzzles: 'url(path to node)' 
    };
  }

	handleFetch(){
		axios.get('http://georgercarder.com/fetch/').then((response) => this.setState({puzzles: JSON.stringify(response.data)}))
	}

	changepage(i){
		if (i===1){
			this.setState({page:  <Game puzzles={this.state.puzzles}/>,})
		}
	}

  render() {

    return (
      <body>
				{this.state.page}
				{this.state.puzzles}
      </body>
    );
  }
}

export default Site;
