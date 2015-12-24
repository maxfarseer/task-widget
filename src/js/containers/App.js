import React, { Component } from 'react';
import { pushState } from 'redux-router'
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

class App extends Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    this.props.routerActions.pushState(null, 'login')
  }

  render() {
    const { children } = this.props;

    return (
      <div>
        <div className='app'>
          {children}
        </div>
      </div>

    )
  }
}

function mapStateToProps(state) {
  return {};
}

function mapDispatchToProps(dispatch) {
  return {
    routerActions: bindActionCreators({pushState}, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
