import React from 'react';
import { createStore, applyMiddleware, combineReducers, compose } from 'redux';
import { reduxReactRouter, routerStateReducer, ReduxRouter } from 'redux-router';
import { createHistory } from 'history';
import { Route, Redirect } from 'react-router';
import thunkMiddleware from 'redux-thunk';
import createLogger from 'redux-logger';
import rootReducer from '../reducers';

import App from '../containers/App';
import MainPage from '../containers/MainPage';
import LoginPage from '../containers/LoginPage';

const reducer = combineReducers({
  router: routerStateReducer,
  app: rootReducer,
});

const routes = (
  <Route component={App}>
    <Route path='/main' component={MainPage} />
    <Route path='/login' component={LoginPage} />
    <Redirect from="/" to="main" />
  </Route>
);




export default function configureStore(initialState) {
  // Compose reduxReactRouter with other store enhancers
  const store = compose(
    applyMiddleware(
      thunkMiddleware,
      createLogger()
    ),
    reduxReactRouter({
      routes,
      createHistory
    })
    //devTools()
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
