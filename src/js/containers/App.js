import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

export default class App extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { children, user } = this.props;
    
    return (
      <div>
        <div className='app'>
          {children}
        </div>
      </div>

    )
  }
}

function select(state) {
  return {
    user: state.user
  };
}

export default connect(select)(App);
