import React, { useState } from 'react';
import '../App.css';

const Login = () => {
  const [name, setName] = useState('')

  const gameName = (e) => {
    console.log(e.target.value)
    setName(e.target.value);
  }

  return (
    <div className='login-container'>
      <div className='login-box'>
        <form>
          <input className='login-input' type="text" name="name" placeholder="Name" onChange={gameName} />
          <button className='login-button' type="submit">Start Game </button>
        </form>
      </div>
    </div>
  )
}

export default Login;