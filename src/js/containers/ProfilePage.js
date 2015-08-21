import React, { Component } from 'react';
import { connect } from 'react-redux';

import Profile from '../components/Profile';

class ProfilePage extends Component {
  render() {
    const { user: {login} } = this.props;
    return (
      <div>
        <Profile login={login} />
      </div>
    )
  }
}

function select(state) {
  return {
    user: state.user
  };
}

export default connect(select)(ProfilePage);
