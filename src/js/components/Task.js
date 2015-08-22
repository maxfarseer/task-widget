import React, { PropTypes, Component } from 'react';

export default class Task extends Component {

  render() {
    const task = this.props.data;
    const {name, desc, id, status} = task;
    const {actions} = this.props;
    return (
      <div className='task'>
        <div className='task__header'>{id} {name} | Status: {status}</div>
        <div className='task__desc'>{desc}</div>
        <button onClick={actions.changeStatus.bind(this,task,1)}>PLAY</button>
      </div>
    );
  }
}
