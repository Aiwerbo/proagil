import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { getAllGames, postJoinGame } from '../../utils/REST-API';

const LobbyListComponent = ({
  setErrorMess,
  name,
  setMatchId,
  setPlayMatch,
}) => {
  const [games, setGames] = useState([]);

  useEffect(() => {
    getAllGames()
      .then((response) => {
        setGames(response.data);
      })
      .catch((error) => {
        setErrorMess(error);
      });
  }, [setErrorMess]);

  const joinGame = (id) => {
    postJoinGame(name, id)
      .then((response) => {
        setMatchId(response.data.id);
        setPlayMatch(true);
      })
      .catch((error) => {
        setErrorMess(error);
      });
  };

  return (
    <tbody>
      {games.map((game) => {
        if (game.spelare.length > 1) {
          return null;
        }
        return (
          <tr key={game.id} className="lobby-tr">
            <td className="lobbyList-player">{game.spelare}</td>
            <td><button type="button" className="lobbyList-button" onClick={() => joinGame(game.id)}>Play</button></td>
          </tr>
        );
      })}
    </tbody>
  );
};

LobbyListComponent.propTypes = {
  setErrorMess: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  setMatchId: PropTypes.string.isRequired,
  setPlayMatch: PropTypes.string.isRequired,
};

export default LobbyListComponent;
