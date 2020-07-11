import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import pageReducer from '../reducers/pageReducer';
import userReduser from '../reducers/userReducer';
import schemaReduser from '../reducers/schemaReducer'
import mediaRediser from '../reducers/mediaReducer'
import postReduser from '../reducers/postReducer'
import menuReduser from '../reducers/menuReducer'

/* eslint-disable no-underscore-dangle */
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__;

const store = createStore(
  combineReducers({
    pages: pageReducer,
    user: userReduser,
    schema: schemaReduser,
    media: mediaRediser,
    posts: postReduser,
    menu: menuReduser
  }),
  composeEnhancers ? composeEnhancers(applyMiddleware(
    thunk
  )) : applyMiddleware(
    thunk
  ),
);
/* eslint-enable */
export default store;