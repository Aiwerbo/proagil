import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import LobbyListComponent from './lobbyListComponent';
import { postNewGame } from '../../utils/REST-API';
import './lobbyComponent.css';

const LobbyComponent = ({ location }) => {
  const [home, setHome] = useState(false);
  const [playMatch, setPlayMatch] = useState(false);
  const [matchId, setMatchId] = useState('');
  const [errorMess, setErrorMess] = useState('');
  const name = location.state;

  const startGame = () => {
    postNewGame(name)
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
      <Redirect
        to={{
          pathname: `/game/${matchId}`,
          state: { name },
        }}
      />
    );
  }
  if (home) {
    return <Redirect to="/" />;
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
        <button type="button" className="lobby-button" onClick={startGame}>
          Start New Game
        </button>
        <button type="button" onClick={logOut}>
          Log out
        </button>
        <div className="lobby-errorMessage">{errorMess}</div>
      </div>
    </div>
  );
};

LobbyComponent.propTypes = {
  location: PropTypes.string.isRequired,
};

export default LobbyComponent;
