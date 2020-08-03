import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { SWRConfig } from 'swr';
import { SnackbarProvider } from 'notistack';

import LogIn from "./components/LogIn";
import Chat from "./components/Chat";
import { Container } from "@material-ui/core";
import axios from './lib/axios';
import SignUp from "./components/SignUp";

const fetcher = (url) => axios.get(url).then((res) => res.data);

function App() {
  return (
    <SWRConfig
      value={{
        fetcher,
      }}
    >
      <SnackbarProvider maxSnack={4}>
        <Container maxWidth="md">
          <Router>
            <Switch>
              <Route path='/signup'>
                <SignUp />
              </Route>
              <Route path="/chat">
                <Chat />
              </Route>
              <Route path="/">
                <LogIn />
              </Route>
            </Switch>
          </Router>
        </Container>
      </SnackbarProvider>
    </SWRConfig>
  );
}

export default App;
