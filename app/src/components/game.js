import React, { useEffect } from 'react';
import '../App.css';
import io from 'socket.io-client';
import 'react-chessground/dist/styles/chessground.css';
import Chess from 'chess.js'

const Chessground = require("chessground").Chessground;
const socket = io('http://localhost:5010')
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


useEffect(() => {
  
  socket.on("welcome", (message) => {
    console.log(message)
})
}, []);

socket.emit('message', {data: 'test'}, (err, response) => {
  console.log(response.data)
})


return (
  <div className="App">
  </div>
  )
}

export default Game;