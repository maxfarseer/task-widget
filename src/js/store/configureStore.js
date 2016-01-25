import React from 'react';
import { createStore, applyMiddleware, combineReducers, compose } from 'redux';
import createHistory from 'history/lib/createHashHistory'
import thunkMiddleware from 'redux-thunk';
import createLogger from 'redux-logger';
import rootReducer from '../reducers';

const reducer = combineReducers({
  app: rootReducer,
});

export default function configureStore(initialState) {
  const store = compose(
    applyMiddleware(thunkMiddleware),
    applyMiddleware(createLogger())
  )(createStore)(reducer);

  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('../reducers', () => {
      const nextRootReducer = require('../reducers')
      store.replaceReducer(nextRootReducer)
    });
  }

  return store;
}
