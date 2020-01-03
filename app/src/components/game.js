import React, { useEffect, useState } from 'react';
import '../App.css';
import io from 'socket.io-client';
import 'react-chessground/dist/styles/chessground.css';
import Chess from 'chess.js';
import '../chess.css';

const { Chessground } = require('chessground');

const socket = io('http://localhost:5010');

const Game = () => {
  const chess = new Chess();
  let ground;

  const [creator, setCreator] = useState(true);
  const [gameOver, setGameOver] = useState(false);
  const [config, updateConfig] = useState({
    fen: '',
    turnColor: 'white',
    movable: {
      color: 'white', // Something like: creator ? 'white' : 'black'
      dests: {},
      events: {
        after: (from, to) => {
          console.log(chess.ascii());
          console.log(config.fen);
          console.log(from, to);
          console.log(chess.turn());

          // Checking if the game is over.
          if (chess.game_over() === true) {
            console.log('CHECKMATE');
          }

          const fen = chess.fen();
          config.fen = fen;
          updateConfig({ ...config, fen }); // Fen-update not working, yet updating useEffect.
        },
      },
    },
    events: {
      select: (key) => {
        const legitMoves = chess.moves({ square: key });
        const destsObj = {};
        destsObj[String(key)] = legitMoves;
        ground.set({ movable: { dests: destsObj } });
        console.log(config);
      },
      move: (from, to) => {
        const move = chess.move({ from, to });
        // If the move is legit, this if changes the turnColor, and while testing, the playercolor
        // When possible, transform this mutate to setState({...state , turnColor: 'color'})
        if (move !== null) {
          if (config.turnColor === 'white') {
            /* ground.set({turnColor: 'black'}) */
            /* updateConfig({...config, turnColor: 'black'}); */
            config.turnColor = 'black';
          } else if (config.turnColor === 'black') {
            /* ground.set({turnColor: 'white'}) */
            /* updateConfig({...config, turnColor: 'white'}); */
            config.turnColor = 'white';
          }

          if (config.movable.color === 'white') {
            /* ground.set({movable: {color: 'black'}}) */
            config.movable.color = 'black';
          } else if (config.movable.color === 'black') {
            /* ground.set({movable: {color: 'white'}}) */
            config.movable.color = 'white';
          }
        }
      },
    },
  });

  useEffect(() => {
    ground = Chessground(document.querySelector('.App'), config);
  }, [config, gameOver]);

  useEffect(() => {
    socket.on('welcome', (message) => {
      console.log(message);
    });
  }, []);

  socket.emit('message', { data: 'test' }, (err, response) => { // Här ska config-objektet skickas, istället för data: 'test'
    console.log(response.data);
  });

  return (
    <div className="App" />
  );
};

export default Game;
