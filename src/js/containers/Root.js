import React, { Component } from 'react'
import { render } from 'react-dom'
import { Redirect, Router, Route } from 'react-router'
import { reduxReactRouter, routerStateReducer, ReduxRouter } from 'redux-router'
import { Provider } from 'react-redux'
import App from './App'
import MainPage from './MainPage'
import LoginPage from './LoginPage'
import configureStore from '../store/configureStore'

const store = configureStore()

export default class Root extends Component {
  render() {
    return (
      <div>
        <Provider store={store}>
          <Router history={this.props.history}>
            <Route component={App}>
              <Route path='/main' component={MainPage} />
              <Route path='/login' component={LoginPage} />
              <Redirect from="/" to="main" />
            </Route>
          </Router>
        </Provider>
      </div>
    );
  }
}
