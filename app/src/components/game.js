import React, { useEffect, useState } from 'react';
import '../App.css';
import io from 'socket.io-client';
import 'react-chessground/dist/styles/chessground.css';
import Chess from 'chess.js';
import { getPlayers, postMoves, getMoves } from '../utils/REST-API';
import '../chess.css';
import SideMenu from './sideMenuComponent/sideMenu.js'

const { Chessground } = require('chessground');

const socket = io('http://localhost:5010');
const chess = new Chess();
let ground;

const Game = () => {
  let turn;

  const [players, setPlayers] = useState([]);
  const [room, setRoom] = useState('');
  const [chessMessage, setChessMessage] = useState('Ongoing Game');
  const [movableColors, setMovableColor] = useState('');
  const [moveHistory, updateMoveHistory] = useState([])
  const [config, updateConfig] = useState({
    turnColor: 'white',
    fen: '',
  });
  const checkDraw = () => {
    if (chess.in_checkmate() === true) {
      setChessMessage('In CheckMate');
    }
    else if (chess.in_draw() === true) {
      setChessMessage('In Draw');
    }
    else if (chess.in_check() === true) {
      setChessMessage('In Check');
    }
    else {
      setChessMessage('Ongoing Game');
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

          const id = window.location.pathname.substr(6);
          let move = chess.history({verbose: true});
          let obj2 = {
            move: move[0]
          }

          postMoves(obj2, id).then((res) => {
            console.log(res)
            updateMoveHistory(res.data)
          })
          
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

  useEffect(() => {
    const id = window.location.pathname.substr(6);
    setTimeout(() => {
      getMoves(room).then((res) => {
        updateMoveHistory(res.data)
      })
    }, 1000);
  }, [config])

  let styleObj = {
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  }

  console.log("MoveHistory:")
  console.log(moveHistory)

  return (
    <>
      <div className="Chessgame_Container_Main" style={styleObj}>
        <div className="App"/>
        <SideMenu chessMessage={chessMessage} moveHistory={moveHistory}/>
      </div>
    </>
  );
};

export default Game;
