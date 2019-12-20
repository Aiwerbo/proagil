import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Redirect } from 'react-router-dom';
import '../App.css';

const Lobby = (props) => {
  const [games, setGames] = useState([]);
  const [home, setHome] = useState(false);
  const [playMatch, setPlayMatch] = useState(false);
  const [matchId, setMatchId] = useState('');
  const [errorMess, setErrorMess] = useState('');
  const name = props.location.state.name;

  useEffect(() => {
    axios.get('/api/seeks', { headers: { 'Content-Type': 'application/json' } })
      .then((response) => {
        setGames(response.data);
      })
      .catch((error) => {
        setErrorMess(error);
      });
  }, []);

  const startGame = () => {
    const player = {
      spelare: name,
    };
    axios.post('/api/seeks', JSON.stringify(player), { headers: { 'Content-Type': 'application/json' } })
      .then((response) => {
        setMatchId(response.data.id);
        setPlayMatch(true);
      })
      .catch((error) => {
        setErrorMess(error);
      });
  };

  const joinGame = (id) => {
    const joinMatch = {
      spelare: name,
    };
    axios.post(`/api/seeks/${id}`, JSON.stringify(joinMatch), { headers: { 'Content-Type': 'application/json' } })
      .then((response) => {
        setMatchId(response.data[0].id);
        setPlayMatch(true);
      })
      .catch((error) => {
        setErrorMess(error);
      });
  };

  const logOut = () => {
    setHome(true);
  };

  if (playMatch) {
    return (
      <Redirect to={{
        pathname: `/game/${matchId}`,
        state: { name },
      }}
      />
    );
  }
  if (home) {
    return (
      <Redirect to="/" />
    );
  }
  return (
    <div className="lobby-container">
      <div className="lobby-box">
        <h2 className="lobby-header">Games</h2>
        <table>
          <thead>
            <tr>
              <td className="lobby-td">Player</td>
              <td>Join Game</td>
            </tr>
          </thead>
          <tbody>
            {games.map((game) => {
              if (game.spelare.length > 1) {
                return null;
              }
              return (
                <tr key={game.id} className="lobby-tr">
                  <td>{game.spelare}</td>
                  <td><button type="button" onClick={() => joinGame(game.id)}>Play</button></td>
                </tr>
              );
            })}
          </tbody>
        </table>
        <br />
        <button type="button" className="lobby-button" onClick={startGame}>Start New Game</button>
        <button type="button" onClick={logOut}>Log out</button>
        <div style={{ color: 'red', marginTop: '15px', fontSize: '13px' }}>{errorMess}</div>
      </div>
    </div>
  );
};

export default Lobby;
