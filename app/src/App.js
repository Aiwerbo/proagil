import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import LobbyComponent from './components/lobbyComponent/lobbyComponent';
import Login from './components/login';
import Game from './components/game';

const App = () => {
  return (
    <Router>
      <Switch>
        <Route path="/lobby" component={LobbyComponent} />
        <Route path="/game/:id" component={Game} />
        <Route exact path="/" component={Login} />
      </Switch>
    </Router>
  );
};

export default App;
