import React, {useState, useEffect} from 'react';
import axios from 'axios';
import '../App.css';
//const BASEURL = 'http://localhost:5000/';


const Lobby = (props) => {
  const [games, setGames] = useState([]);
  console.log(props.location.state.name)
  const name = props.location.state.name;

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
    console.log(id)
    const match = {
      spelare: name,
    }
    axios.post('/api/seeks/'+id, JSON.stringify(match), {headers: {"Content-Type":"application/json"}})
    .then(response => {
      console.log(response.data)
    })
    .catch(error => {
      console.log(error)
    })
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
              return (
              <tr key={game.id} className="lobby-tr">
                <td>{game.spelare[0]}</td>
                <td><button onClick={() => joinGame(game.id)}>Join</button></td>
              </tr>
              )
            })}
          </tbody>
        </table>
        <button onClick={startGame}>Start Game</button>
      </div>
    </div>
  )
}

export default Lobby;