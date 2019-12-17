import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Lobby from './components/lobby';
import Login from './components/login';
import Game from './components/game';

const App = () => {

  return (
    <Router>
        <Switch>
            <Route path='/lobby' component={Lobby} />
            <Route path='/game' component={Game} />
            <Route path='/game/:id' component={Game} />
            <Route exact path='/' component={Login} />
        </Switch>
    </Router>
  );
}

export default App;