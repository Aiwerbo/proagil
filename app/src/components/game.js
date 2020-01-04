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

  const [inCheck, setInCheck] = useState(false);
  const [inCheckMate, setInCheckMate] = useState(false);
  const [inDraw, setInDraw] = useState(false);
  const [config, updateConfig] = useState({
    fen: '',
    turnColor: 'white',
    movable: {
      color: 'white', // Something like: userArray[0] = 'white' && userArray[1] = 'black'
      dests: {},
      events: {
        after: (from, to) => {
          console.log(chess.ascii());
          console.log(config.fen);
          console.log(from, to);
          console.log(chess.turn());

          if (chess.in_check() === true) {
            setInCheck(true);
          }

          if (chess.in_checkmate() === true) {
            setInCheckMate(true);
          }

          if (chess.in_draw() === true) {
            setInDraw(true);
          }

          const fen = chess.fen();
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
      },
      move: (from, to) => {
        const move = chess.move({ from, to });
        // If the move is legit, this if changes the turnColor, and while testing, the playercolor
        if (move !== null) {
          config.turnColor === 'white' ? config.turnColor = 'black' : config.turnColor = 'white';
          config.movable.color === 'white' ? config.movable.color = 'black' : config.movable.color = 'white';
        }
      },
    },
  });

  useEffect(() => {
    ground = Chessground(document.querySelector('.App'), config);
  }, [config]);

  useEffect(() => {
    if (inCheck === true) {
      console.log('In Check');
    } else if (inCheckMate === true) {
      console.log('In CheckMate');
    } else if (inDraw === true) {
      console.log('In Draw');
    }
  }, [inCheck, inCheckMate, inDraw]);

  useEffect(() => {
    socket.on('welcome', (message) => {
      console.log(message);
    });
  }, []);

  socket.emit('message', { data: 'test' }, (err, response) => { // Här ska config-objektet skickas, istället för data: 'test'
    console.log(response.data);
  });

  console.log(inCheckMate);

  return (
    <div className="App" />
  );
};

export default Game;
