import React, { PropTypes, Component } from 'react';
import * as _status from '../constants/Statuses_ids';

import ChangeStatusProblem from './ChangeStatusProblem';

export default class Task extends Component {

  shouldComponentUpdate(newProps) {
    return newProps.data !== this.props.data;
  }

  onSelectStatus(e) {
    let task = this.props.task;
    this.props.actions.changeStatus(task, +e.target.value);
  }

  render() {
    const task = this.props.data;
    const {subject, description, id, status, fetching} = task;
    const {actions, index} = this.props;

    const taskTemplate = (
      <div>
        <div className='task__left'>
          <div className="task__name">{subject}</div>
          <div className="task__clock">00:00</div>
          <div className="task__project">Casino Unity</div>
        </div>
        <div className='task__right'>
          {task.status.id === 2 ? 
            <button className="task-btn task-btn_pause" onClick={actions.changeStatus.bind(this,task,_status.SUSPEND)}>||</button> :
            <button className="task-btn" onClick={actions.changeStatus.bind(this,task,_status.IN_PROGRESS)}>&#9654;</button>
          }
          <button className="task-btn task-btn_resolve" onClick={actions.changeStatus.bind(this,task,_status.RESOLVE)}>&#10003;</button>
        </div>
        <div className={'preloader preloader_task ' + (fetching ? '' : 'none')}></div>
      </div>
    );

    return (
      <div className={`task task_${index}`}>
        {taskTemplate}
      </div>
    )
  }
}
