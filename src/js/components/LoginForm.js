import React, { PropTypes, Component } from 'react';
import {pushState ,goBack} from 'redux-router';
import ReactDOM from 'react-dom';

export default class LoginForm extends Component {

  constructor(props) {
    super(props)
    this.handleSubmitClick = this.handleSubmitClick.bind(this)
  }

  handleSubmitClick(e) {
    e.preventDefault();

    const username = ReactDOM.findDOMNode(this.refs.username).value;
    const pass = ReactDOM.findDOMNode(this.refs.pass).value;
    const nextPath = '/main';

    this.props.onSubmit(username, pass, nextPath);
  }

  render() {
    return (
      <div>
        <p>Login</p>
        <form onSubmit={this.handleSubmitClick}>
          <input className="loginform" type='text' ref='username' placeholder='username' />
          <input className="loginform" type='password' ref='pass' placeholder='password'/>
          <button>Login</button>
        </form>
        <div className="userinfo">{this.props.user.api_key}</div>
      </div>
    );
  }
}
