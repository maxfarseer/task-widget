import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as LoginActions from '../actions/LoginActions';

import LoginForm from '../components/LoginForm';

class LoginPage extends Component {
  render() {
    const { dispatch, user } = this.props;
    const actions = bindActionCreators(LoginActions, dispatch);
    return (
      <div>
        <LoginForm actions={actions} user={user} />
      </div>
    )
  }
}

function select(state) {
  return {
    user: state.user
  };
}

export default connect(select)(LoginPage);
