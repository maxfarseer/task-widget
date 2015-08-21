import React, { PropTypes, Component } from 'react';

export default class Contacts extends Component {

  render() {
    return (
      <div>
        <p>Contacts:</p>
        <ul>
          <li>+7 123-45-67-89</li>
          <li>mail@dot.com</li>
        </ul>
      </div>
    );
  }
}
