import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import pageReducer from '../reducers/pageReducer';
import userReduser from '../reducers/userReduser';
/* eslint-disable no-underscore-dangle */

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__;

const store = createStore(
  combineReducers({
    pages: pageReducer,
    user: userReduser
  }),
  composeEnhancers(applyMiddleware(
    thunk
  )),

);
/* eslint-enable */
export default store;