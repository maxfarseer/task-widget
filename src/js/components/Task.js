import React, { PropTypes, Component } from 'react';
import SelectStatus from './SelectStatus';

import * as _status from '../constants/Statuses_ids';

export default class Task extends Component {

  render() {
    const task = this.props.data;
    const {name, desc, id, status, fetching} = task;
    const {actions} = this.props;
    return (
      <div className='task'>
        <div className='task__header'>
          <span className="task__id">{id}</span>
          <span className="task__name">{name}</span>
          <span className="task__status">Status: {status}</span>
        </div>
        <div className='task__desc'>{desc}</div>
        <button onClick={actions.changeStatus.bind(this,task,_status.IN_PROGRESS)}>PLAY</button>
        <button onClick={actions.changeStatus.bind(this,task,_status.SUSPEND)}>SUSPEND</button>
        <button onClick={actions.changeStatus.bind(this,task,_status.RESOLVED)}>RESOLVE</button>
        <SelectStatus task={task} actions={actions} />
        <div className={'preloader preloader_task ' + (fetching ? '' : 'none')}></div>
      </div>
    );
  }
}
