import React, { PropTypes, Component } from 'react';

export default class AuthPopup extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      login: this.props.user.login || ''
    };
  }
  goAuthenticate() {
    this.props.actions.hangleLogin(this.state.login);
  }
  handleChange(e) {
    this.setState({login: e.target.value})
  }
  render() {
    const { actions, authPopup: {isShown} } = this.props;
    let login = this.state.login;
    return (
      <div className={'auth-wrapper ' + (isShown ? '': 'auth-wrapper_hide')}>
        <input className='auth-input' placeholder='login' value={login} onChange={::this.handleChange}/>
        <button className='auth__login-btn' onClick={::this.goAuthenticate} disabled={login ? false : true}>Log in</button>
        <button className='auth__close-btn' onClick={actions.hidePopup}>X</button>
      </div>
    );
  }
}
