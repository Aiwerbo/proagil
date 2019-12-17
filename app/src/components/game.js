import React, { useEffect } from 'react';
import '../App.css';

import Chess from 'chess.js'
import 'react-chessground/dist/styles/chessground.css'
const Chessground = require("chessground").Chessground;

const Game = () => {
  const chess = new Chess()

 useEffect(() => {  
  Chessground(document.body, {}); 
 }, [])

 while (!chess.game_over()) {
  const moves = chess.moves();
  const move = moves[Math.floor(Math.random() * moves.length)];
  chess.move(move);
}

return (
  <div className="App">
  </div>
  )
}

export default Game;