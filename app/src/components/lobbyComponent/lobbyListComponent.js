import React, { useState, useEffect } from 'react';
import axios from 'axios';

const LobbyListComponent = ({
  setErrorMess, name, setMatchId, setPlayMatch,
}) => {
  const [games, setGames] = useState([]);

  useEffect(() => {
    axios.get('/api/seeks', { headers: { 'Content-Type': 'application/json' } })
      .then((response) => {
        setGames(response.data);
      })
      .catch((error) => {
        setErrorMess(error);
      });
  }, [setErrorMess]);

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

  return (
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
  );
};

export default LobbyListComponent;
