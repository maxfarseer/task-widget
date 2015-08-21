import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as AppActions from '../actions/AppActions';

import Header from '../components/Header';
import AuthPopup from '../components/AuthPopup';

export default class App extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { children, authPopup, user, dispatch, loading } = this.props;
    const actions = bindActionCreators(AppActions, dispatch);
    let isLoading;

    if (loading) {
      isLoading = (<div className='loading'></div>);
    }

    return (
      <div>
        <div className='app'>
          <Header actions={actions} user={user} />
          {children}
          <AuthPopup actions={actions} user={user}  authPopup={authPopup} />
        </div>
        {isLoading}
      </div>

    )
  }
}

function select(state) {
  return {
    authPopup: state.authPopup,
    user: state.user,
    loading: state.mainstate.loading //todo state - NETWORK?
  };
}

export default connect(select)(App);
