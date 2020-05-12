import React from 'react';
import {
  BrowserRouter as Router
} from "react-router-dom";
import { Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store/store';

import Routes from './Routes'
import Nav from './compontnts/nav/Nav'
import Login from "./containers/login/Login"

import './App.css';

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Switch>
          <Route exact path="/admin/login" component={Login} />
          <div className="App">
            <div>
              <Nav />
            </div>
            <div className="gridMain">
              <Routes />
            </div>
          </div>
          <Route>
            <h1>404</h1>
          </Route>
        </Switch>
      </Router>
    </Provider >
  );
}

export default App;
