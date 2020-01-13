import React from 'react';
import './chessMessage.css';

const ChessMessage = (props) => (
  <>
    <div className="chessMessage">
      {props.chessMessage}
    </div>
  </>
);

export default ChessMessage;
