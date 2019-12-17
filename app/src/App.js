import React, { useEffect } from 'react';
import './App.css';
import Chess from 'chess.js';


//import 'react-chessground/dist/styles/chessground.css';

const Chessground = require('chessground').Chessground;
//var Chess = require('chess.js');


function App() {
  const chess = new Chess();
  
  console.log(chess);
 
  useEffect(() => {
    
    Chessground(document.body, {});
    
    
  }, []);

  return (
    <div className="App">
    </div>
  );
}

export default App;
