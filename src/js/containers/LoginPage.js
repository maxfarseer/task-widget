import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { pushState } from 'redux-router';
import { bindActionCreators } from 'redux';
import * as LoginActions from '../actions/LoginActions';

import LoginForm from '../components/LoginForm';

class LoginPage extends Component {
  constructor(props) {
    super(props)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleSubmit(username, pass, nextPath) {
    this.props.actions.login(username, pass, () => this.props.routerActions.pushState(null, 'main'));
  }
  render() {
    const { dispatch, user } = this.props;
    return (
      <div>
        <LoginForm onSubmit={this.handleSubmit} user={user} /> {/*send actions o handleCallback?*/}
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    user: state.app.user
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(LoginActions, dispatch),
    routerActions: bindActionCreators({pushState}, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);
