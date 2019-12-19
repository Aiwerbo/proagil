import React, {useState, useEffect} from 'react';
import axios from 'axios';
import { Redirect } from 'react-router-dom';
import '../App.css';


const Lobby = (props) => {
  const [games, setGames] = useState([]);
  const [home, setHome] = useState(false);
  const [playMatch, setPlayMatch] = useState(false);
  const [matchId, setMatchId] = useState('');
  const [name, setName] = useState(props.location.state.name)

  console.log(name)

  useEffect(() => {
    axios.get('/api/seeks', {headers: {'Content-Type': 'application/json'}})
    .then(response => {
      console.log(response.data)
      setGames(response.data)
    })
    .catch(error => {
      console.log(error)
    })
  }, [])

  const startGame = () => {
    const player = {
      spelare: name
    }
    axios.post('/api/seeks', JSON.stringify(player), {headers: {"Content-Type":"application/json"}})
    .then(response => {
      console.log(response.data)
    })
    .catch(error => {
      console.log(error)
    })
  }

  const joinGame = (id) => {
    const match = {
      spelare: name,
    }
    axios.post('/api/seeks/'+id, JSON.stringify(match), {headers: {"Content-Type":"application/json"}})
    .then(response => {
      console.log(response.data)
      setMatchId(id)
      setPlayMatch(true)
    })
    .catch(error => {
      console.log(error)
    })
  }

  const logOut = () => {
    setHome(true)
  }

  if (playMatch) {
    return (
      <Redirect to={{
        pathname: '/game/'+ matchId,
        state: { name }, 
      }} />
    )
  }
  if (home) {
    return (
      <Redirect to="/" />
    )
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
            {games.map(game => {
              if (game.spelare.length > 1) {
                return;
              } else {
              return (
              <tr key={game.id} className="lobby-tr">
                <td>{game.spelare}</td>
                <td><button onClick={() => joinGame(game.id)}>Play</button></td>
              </tr>
              )}
            })}
          </tbody>
        </table>
        <br />
        <button onClick={startGame}>Start New Game</button>
        <button onClick={logOut}>Log out</button>
      </div>
    </div>
  )
}

export default Lobby;