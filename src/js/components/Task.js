import '../../styles/ellipsis.scss';
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
    const {name, desc, id, status, fetching} = task;
    const {actions, allStatuses, index} = this.props;

    const taskTemplate = (
      <div>
        <div className='task__header'>
          <span className="task__id">{id}</span>
          <span className="task__name">{name}</span>
          <span className="task__status" data-task-status={status}>{allStatuses[status]}</span>
        </div>
        <div className='task__desc ellipsis'>
          <div>
            <p>{desc}</p>
          </div>
        </div>
        <button onClick={actions.changeStatus.bind(this,task,_status.IN_PROGRESS)}>PLAY</button>
        <button onClick={actions.changeStatus.bind(this,task,_status.RESOLVED)}>RESOLVE</button>

        <div className={'preloader preloader_task ' + (fetching ? '' : 'none')}></div>
      </div>
    );

    const taskWithProblemTemplate = (
      <ChangeStatusProblem task_id={id} />
    );

    let template = task.changeStatusProblem ? taskWithProblemTemplate : taskTemplate;

    return (
      <div className={`task task_${index}`}>
        {template}
      </div>
    )
  }
}
