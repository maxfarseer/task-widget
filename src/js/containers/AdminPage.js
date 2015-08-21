import React, { Component } from 'react';
import { showPopup } from '../actions/AppActions';

export default class AdminPage extends Component {
  static onEnter(store) {
    return (nextState, transition) => {
      const { user: { login }} = store.getState();
      if (!login) {
        store.dispatch(showPopup());
        transition.to('/');
      }
    };
  }

  render() {
    return (
      <div>
        {this.props.children}
      </div>
    )
  }
}

