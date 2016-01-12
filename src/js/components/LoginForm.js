import '../../styles/reset-button.scss';
import '../../styles/loginForm.scss';
import React, { PropTypes, Component } from 'react';
import {pushState ,goBack} from 'redux-router';
import ReactDOM from 'react-dom';
import {DEMO_LOGIN, DEMO_PASS} from '../constants/Secret';

export default class LoginForm extends Component {

  constructor(props) {
    super(props)
    this.handleSubmitClick = this.handleSubmitClick.bind(this)
  }

  componentDidMount() {
    ReactDOM.findDOMNode(this.refs.username).value = DEMO_LOGIN;
    ReactDOM.findDOMNode(this.refs.pass).value = DEMO_PASS;
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
      <div className="loginform">
        <p>Please login</p>
        <form onSubmit={this.handleSubmitClick}>
          <input className="loginform-input" type='text' ref='username' placeholder='username' />
          <input className="loginform-input" type='password' ref='pass' placeholder='password'/>
          <button className="loginform-btn">Login</button>
        </form>
      </div>
    );
  }
}
