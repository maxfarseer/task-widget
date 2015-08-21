import React, { PropTypes, Component } from 'react';

export default class Task extends Component {

  render() {
    const {name, desc, id} = this.props.data;
    return (
      <div className='task'>
        <div className='task__header'>{id} {name}</div>
        <div className='task__desc'>{desc}</div>
      </div>
    );
  }
}
