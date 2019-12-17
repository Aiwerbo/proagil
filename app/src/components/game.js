import React, { useEffect } from 'react';
import '../App.css';

import Chess from 'chess.js'
import 'react-chessground/dist/styles/chessground.css'
var Chessground = require("chessground").Chessground;

const Game = () => {
  const chess = new Chess()
  console.log(chess)

 useEffect(() => {
   
  Chessground(document.body, {});
  
 }, [])

 while (!chess.game_over()) {
  var moves = chess.moves();
  var move = moves[Math.floor(Math.random() * moves.length)];
  chess.move(move);
}
console.log(chess.pgn());

return (
  <div className="App">

  </div>
  )
}

export default Game;