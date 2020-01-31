import React from 'react';
import {
  BrowserRouter as Router
} from "react-router-dom";
import { Provider } from 'react-redux';
import store from './store/store';

import Routes from './Routes'
import Nav from './compontnts/nav/Nav'

import './App.css';

function App() {
  return (
    <Provider store={store}>
      <Router>
        <div className="App">
          <div>
            <Nav />
          </div>
          <div className="gridMain">
            <Routes />
          </div>
        </div>
      </Router>
    </Provider >
  );
}

export default App;
