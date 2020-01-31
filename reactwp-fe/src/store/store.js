import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import pageReducer from '../reducers/pageReducer';
/* eslint-disable no-underscore-dangle */
const store = createStore(
  combineReducers({
    pages: pageReducer
  }),
  applyMiddleware(
    thunk
  ),
);
/* eslint-enable */
export default store;