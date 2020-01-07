import React, { useEffect, useState } from 'react';
import '../App.css';
import io from 'socket.io-client';
import 'react-chessground/dist/styles/chessground.css';
import Chess from 'chess.js';
import { getPlayers } from '../utils/REST-API';
import '../chess.css';

const { Chessground } = require('chessground');

const socket = io('http://localhost:5010');
const chess = new Chess();
const Game = () => {
  
  let ground;

  const [inCheck, setInCheck] = useState(false);
  const [inCheckMate, setInCheckMate] = useState(false);
  const [inDraw, setInDraw] = useState(false);
  const [players, setPlayers] = useState([])
  const [chessMessage, setChessMessage] = useState("");
  const [config, updateConfig] = useState({
    fen: '',
    turnColor: 'white',
    movableColor: 'white'
  });
  
  let configObj = {
    fen: config.fen,
    turnColor: config.turnColor,
    movable: {
      color: config.movableColor, // Something like: userArray[0] = 'white' && userArray[1] = 'black'
      dests: {},
      events: {
        after: (from, to) => {
    
          if (chess.in_check() === true) {
            setInCheck(true);
            setChessMessage('In Check');
            
          }
      
          if (chess.in_checkmate() === true) {
            setInCheckMate(true);
            setChessMessage('In CheckMate');
          }
      
          if (chess.in_draw() === true) {
            setInDraw(true);
            setChessMessage('In Draw');
          }

          const fen = chess.fen();
          const color = chess.turn()
          let turn;
         
          (color === 'b') ? turn = 'black' : turn = 'white';

          updateConfig({ ...config, fen: fen, turnColor: turn, movableColor: turn});
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
      },
    },
  };

  useEffect(() => {
    ground = Chessground(document.querySelector('.App'), configObj);
  }, [configObj]);

  useEffect(() => {
    const id = window.location.pathname.substr(6)
      getPlayers(id).then(res => {
      console.log(res)
      setPlayers(res.data)
      return res
    })
    .then((res) => {
      

      if(res.data.length > 1) {
        updateConfig({...config, movableColor: 'black'})
      }
    })
    
  }, [])

  useEffect(() => {
    socket.on('welcome', (message) => {
      console.log(message);
    });
  }, []);

  socket.emit('message', { data: 'test' }, (err, response) => { // Här ska config-objektet skickas, istället för data: 'test'
    
    console.log(response.data);
  });
  console.log(players)
  console.log(configObj.movable.color)
  return (
    <>
    <div className="App" />
    {chessMessage}
    </>
  );
};

export default Game;
