import React, { useState } from 'react';
import axios from 'axios';
import { Redirect } from 'react-router-dom';
import LobbyListComponent from './lobbyListComponent';
import './lobbyComponent.css';

const LobbyComponent = (props) => {
  const [home, setHome] = useState(false);
  const [playMatch, setPlayMatch] = useState(false);
  const [matchId, setMatchId] = useState('');
  const [errorMess, setErrorMess] = useState('');
  const name = props.location.state.name;

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
          <LobbyListComponent
            name={name}
            setMatchId={setMatchId}
            setPlayMatch={setPlayMatch}
            setErrorMess={setErrorMess}
          />
        </table>
        <br />
        <button type="button" className="lobby-button" onClick={startGame}>Start New Game</button>
        <button type="button" onClick={logOut}>Log out</button>
        <div className="lobby-errorMessage">{errorMess}</div>
      </div>
    </div>
  );
};

export default LobbyComponent;
