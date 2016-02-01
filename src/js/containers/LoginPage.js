import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as LoginPageActions from '../actions/LoginPageActions';

import LoginForm from '../components/LoginForm';

class LoginPage extends Component {
  constructor(props) {
    super(props)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleSubmit(username, pass) {
    this.props.actions.login(username, pass);
  }
  render() {
    return (
      <div>
        <LoginForm onSubmit={this.handleSubmit} />
      </div>
    )
  }
}

function mapStateToProps(state) { // eslint-disable-line no-unused-vars
  return {};
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(LoginPageActions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);
