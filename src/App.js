import React, { useState, useEffect } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

import LogIn from './components/LogIn';
import Chat from './components/Chat';
import { Container } from '@material-ui/core';

function App() {
  return (
    <Container maxWidth="md">
      <Router>
        <Switch>
          <Route path='/chat'>
            <Chat />
          </Route>
          <Route path='/'>
            <LogIn />
          </Route>
        </Switch>
      </Router>
    </Container>
  );
}

export default App;
