import React from 'react';
import './index.css';

function RedSquare(props){
	    return(
				          <button className="redsquare">
				            {props.value}
				          </button>
				        );
}

export default RedSquare;
