import React, { PropTypes, Component } from 'react';
import ReactDOM from 'react-dom';

export default class LoginForm extends Component {
  loginHandler(e) {
    e.preventDefault();
    const username = ReactDOM.findDOMNode(this.refs.username).value;
    const pass = ReactDOM.findDOMNode(this.refs.pass).value;
    this.props.actions.login(username,pass)
  }

  render() {
    return (
      <div>
        <p>Login</p>
        <form onSubmit={::this.loginHandler}>
          <input type='text' ref='username' placeholder='username' />
          <input type='password' ref='pass' placeholder='password'/>
          <button>Login</button>
        </form>
        <div className="userinfo">{this.props.user.api_key}</div>
      </div>
    );
  }
}
