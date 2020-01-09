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
let ground;

const Game = () => {
  let turn;

  const [inCheck, setInCheck] = useState(false);
  const [inCheckMate, setInCheckMate] = useState(false);
  const [inDraw, setInDraw] = useState(false);
  const [players, setPlayers] = useState([]);
  const [room, setRoom] = useState('');
  const [chessMessage, setChessMessage] = useState('');
  const [movableColors, setMovableColor] = useState('');
  const [config, updateConfig] = useState({
    turnColor: 'white',
    fen: '',
  });
  const checkDraw = () => {
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
  };
  const configObj = {
    fen: config.fen,
    turnColor: config.turnColor,
    orientation: movableColors,
    movable: {
      color: movableColors,
      dests: {},
      events: {
        after: () => {
          checkDraw();
          const obj = {
            fen: chess.fen(),
            turnColor: turn,
            room,
          };
          socket.emit('message', { data: obj }, () => {
          });

          updateConfig({ ...config, fen: chess.fen(), turnColor: turn });
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
        if (move) {
          turn = (config.turnColor === 'white') ? 'black' : 'white';
        } else {
          turn = config.turnColor;
        }
      },
    },
  };

  useEffect(() => {
    ground = Chessground(document.querySelector('.App'), configObj);
  }, [configObj, movableColors, config]);

  useEffect(() => {
    const id = window.location.pathname.substr(6);
    getPlayers(id).then((res) => {
      setPlayers(res.data);
      return res;
    })
      .then((res) => {
        if (res.data.length > 1) {
          setMovableColor('black');
          setRoom(id);
        } else {
          setMovableColor('white');
          setRoom(id);
        }
      });
  }, []);

  useEffect(() => {
    socket.on(room, (message) => {
      chess.load(message.data.fen);
      checkDraw();
      updateConfig({ ...config, fen: message.data.fen, turnColor: message.data.turnColor });
    });
  }, [room]);

  return (
    <>
      <div className="App" />
      {chessMessage}
    </>
  );
};

export default Game;
