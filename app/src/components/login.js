import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import '../App.css';

const Login = () => {
  const [name, setName] = useState('');
  const [auth, setAuth] = useState(false);
  const [error, setError] = useState('');

  const gameName = (e) => {
    setName(e.target.value);
  }

  const startGame = (e) => {
    e.preventDefault();
    if (!name || name.length > 15 || name.length < 3) {
      setError('You username need to be between 2 and 15 character');
      return;
    }
    setAuth(true)
  }


  if (auth) {
    return (
      <Redirect to="/lobby" />
    )
  }
  return (
    <div className='login-container'>
      <div className='login-box'>
        <form>
          <input className='login-input' type="text" name="name" placeholder="Name" onChange={gameName} />
          <button className='login-button' type="submit" onClick={startGame}>Start Game</button>
        </form>
        <div style={{ color: 'red', marginTop: '15px'}}>{error}</div>
      </div>
    </div>
  )
}

export default Login;