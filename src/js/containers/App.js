import React, { Component } from 'react';
import { connect } from 'react-redux';
import MainPage from './MainPage';
import LoginPage from './LoginPage';

class App extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { user } = this.props;
    let template;

    if (user.api_key) {
      template = <MainPage />
    } else {
      template = <LoginPage />
    }

    return (
      <div>
        <div className = 'app'>
          {template}
        </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    user: state.app.user
  };
}

export default connect(mapStateToProps)(App);
