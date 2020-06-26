import React, { useState } from 'react';
import {
  BrowserRouter as Router
} from "react-router-dom";
import { Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import styled from 'styled-components'
import store from './store/store';

import Routes from './Routes'
import Nav from './compontnts/nav/Nav'
import Login from "./containers/login/Login"

import './App.css';

function App() {
  const [showRight, setShowRight] = useState(false)
  return (
    <Provider store={store}>
      <Router>
        <Switch>
          <Route exact path="/admin/login" component={Login} />
          <AppWrap>
            <div>
              <Nav />
            </div>
            <MainWrap showRight={showRight}>
              <Routes />
              {/* <MobileTarget onClick={() => setShowRight(!showRight)}>show</MobileTarget> */}
            </MainWrap>
          </AppWrap>
          <Route>
            <h1>404</h1>
          </Route>
        </Switch>
      </Router>
    </Provider >
  );
}

const MobileTarget = styled.button`
    position: absolute;
    right: 10px;
    top: 10px;
    
`
const AppWrap = styled.div`
  display: grid;
  grid-template-columns: 80px 1fr;
  grid-template-rows: 1fr;
  grid-template-areas: "nav main";
  grid-column-gap: 30px;
  grid-row-gap: 0px;

  @media (max-width: 768px) {
    grid-column-gap: 10px;
    grid-template-columns: 55px 1fr;
    .ant-transfer{
      display: flex;
      flex-direction:column;
    }

    .menu {
      width: 60px;
      &:before{
        width: 50px
      }
      .navbar__link{
        padding: 13px;
        margin: 10px 0;
        &--active{
          padding: 13px 16px;
        }
      }
      .logOut{  
        width: 30px;
        height: 30px;
        margin: 10px;
      }
    }
  }

`
const MainWrap = styled.div`
  display: grid;
  grid-gap: 20px;
  grid-template-columns: 1fr minmax(150px, 300px);
  

  @media (max-width: 768px) {
    grid-template-columns: ${props => props.showRight ? '1px 100vw' : 'calc(100vw - 80px)'};
    .ant-transfer{
      display: flex;
      flex-direction:column;
    }
    .ant-transfer-list-body-customize-wrapper{
      overflow:scroll;
    }
  }
`

export default App;
