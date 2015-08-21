import React, { PropTypes, Component } from 'react';

export default class Contacts extends Component {

  render() {
    const login = this.props.login;
    return (
      <div>
        <h3>{login} profile:</h3>
        <p>age: xx</p>
        <p>mail: xx</p>
      </div>
    );
  }
}
