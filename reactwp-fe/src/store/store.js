import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import pageReducer from '../reducers/pageReducer';
import userReduser from '../reducers/userReduser';
import schemaReduser from '../reducers/schemaReduser'
import mediaRediser from '../reducers/mediaRediser'

/* eslint-disable no-underscore-dangle */
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__;

const store = createStore(
  combineReducers({
    pages: pageReducer,
    user: userReduser,
    schema: schemaReduser,
    media: mediaRediser,
  }),
  composeEnhancers(applyMiddleware(
    thunk
  )),
);
/* eslint-enable */
export default store;