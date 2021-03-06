import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { SWRConfig } from "swr";
import { SnackbarProvider } from "notistack";
import CssBaseline from "@material-ui/core/CssBaseline";
import LogIn from "./components/LogIn";
import axios from "./lib/axios";
import SignUp from "./components/SignUp";
import ChatNew from './components/Chat/index';

const fetcher = (url) => axios.get(url).then((res) => res.data);

function App() {
  return (
    <SWRConfig
      value={{
        fetcher,
      }}
    >
      <SnackbarProvider maxSnack={4}>
        <CssBaseline />
        <Router>
          <Switch>
            <Route path="/signup">
              <SignUp />
            </Route>
            <Route path="/chat">
              <ChatNew />
            </Route>
            <Route path="/">
              <LogIn />
            </Route>
          </Switch>
        </Router>
      </SnackbarProvider>
    </SWRConfig>
  );
}

export default App;
