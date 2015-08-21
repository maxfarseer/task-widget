import React, { PropTypes, Component } from 'react';
import { Link } from 'react-router'

export default class Header extends Component {

  render() {
    const { user: {login}, actions } = this.props;

    return (
      <header className='header'>
        <ul className='header-links'>
          <li className='header-links__item'><Link to='/main'>Main</Link></li>
          <li className='header-links__item'><Link to='/contacts'>Contacts</Link></li>
          <li className={'header-links__item ' + (login ? '': 'none')}><Link to='/profile'>Profile</Link></li>
          {/*<li><Link to='/admin'>Admin</Link></li>*/}
        </ul>
        <span className='header-btn-wrapper'>
          <button className={'header-btn ' + (login ? 'none': '')} onClick={actions.showPopup}>Sign In</button>
          <button className={'header-btn ' + (login ? '': 'none')} onClick={actions.hangleLogout}>Sign Out</button>
        </span>
      </header>
    );
  }
}
