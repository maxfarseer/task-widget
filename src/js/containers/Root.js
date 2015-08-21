import React, { Component } from 'react';
import { Redirect, Router, Route } from 'react-router'
import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { Provider } from 'react-redux';
import rootReducer from '../reducers';

import App from './App'
import MainPage from './MainPage';
import ContactsPage from './ContactsPage';
import ProfilePage from './ProfilePage';
import AdminPage from './AdminPage';
import AdminHomePage from './AdminHomePage';

const logger = store => next => action => {
  console.log('dispatching', action);
  let result = next(action);
  console.log('next state', store.getState());
  return result;
};

let createStoreWithMiddleware = applyMiddleware(thunkMiddleware, logger)(createStore);

const store = createStoreWithMiddleware(rootReducer);

export default class Root extends Component {
  render() {
    return (
      <div>
        <Provider store={store}>
          {() =>
            <Router history={this.props.history}>
              <Route component={App}>
                <Route path='/main' component={MainPage} />
                <Route path='/contacts' component={ContactsPage} />
                <Route path='/profile' component={ProfilePage} />
                <Route path='/administrator' component={AdminPage} onEnter={AdminPage.onEnter(store)}>
                  <Route path='/main' component={AdminHomePage} />
                </Route>
                <Redirect from="/" to="main" />
              </Route>
            </Router>
          }
        </Provider>
      </div>
    );
  }
}
