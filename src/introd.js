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
      <div>
				<h1 onClick={() => this.props.changepage(1)}>Hello Introduction</h1>
      </div>
    );
  }
}

export default Introd;
