import React, { PropTypes, Component } from 'react';
import * as _status from '../constants/Statuses_ids';
import {API_ROOT} from '../constants/Secret';
import { makeHumanTime } from '../utils/'

import TimeEntries from './TimeEntries';

export default class Task extends Component {

  render() {
    const task = this.props.data;
    const {subject, description, id, status, fetching, priority} = task;
    const {onRefreshClick, onChangeStatusClick, index} = this.props;

    let template;
    let errors;

    if (task._error) {
      errors = task._errorArr.map((error,index) => <p key={index}>{error}</p>)
      template = (
        <div className={`task task_${index}`}>
          <div className='task__left'>
            <p>You need to check this action in <a href={`${API_ROOT}/issues/${task.id}`} target='_blank'>redmine</a> because:</p>
            {errors}
          </div>
          <div className='task__right'>
            <button className="task-btn" onClick={onRefreshClick.bind(this,task)}>
              <i className="fa fa-refresh"></i>
            </button>
          </div>
        </div>
      )
    } else if (task.status.id === 2) {
      template = (
        <div className={`task task_${index} task_in-progress`}>
          <div className='task__left'>
            <div className="task__name">
              <a className="task-name-link" href={`${API_ROOT}/issues/${task.id}`} target='_blank'>{subject}</a>
            </div>
            <TimeEntries timeEntriesSum={task._timeEntriesSum} issueId={task.id} time={makeHumanTime(task._timeEntriesSum)}/>
            <div className="task__project">{task.project.name}</div>
          </div>
          <div className='task__right'>
              <div>
                <button className="task-btn" onClick={onChangeStatusClick.bind(this,task,_status.SUSPEND)}>
                  <i className="fa fa-pause"></i>
                </button>
                <button className="task-btn" onClick={onChangeStatusClick.bind(this,task,_status.RESOLVED)}>
                  <i className="fa fa-check"></i>
                </button>
              </div>
          </div>
          <div className={'preloader preloader_task ' + (fetching ? '' : 'none')}></div>
        </div>
      )
    } else {
      template = (
        <div className={`task task_${index} task_nip`}>
          <div className={`badge-priority badge-priority-${priority.name}`}></div>
          <div className='task__left'>
            <div className="task__name task__name_nip">
              <a className="task-name-link task-name-link_nip" href={`${API_ROOT}/issues/${task.id}`} target='_blank'>{subject}</a>
            </div>
          </div>
          <div className='task__right'>
            <div>
              <button className="task-btn task-btn_play" onClick={onChangeStatusClick.bind(this,task,_status.IN_PROGRESS)}>&#9654;</button>
            </div>
          </div>
          <div className={'preloader preloader_task ' + (fetching ? '' : 'none')}></div>
        </div>
      )
    }

    return template;
  }
}

Task.propTypes = {
  onChangeStatusClick: PropTypes.func.isRequired,
  onRefreshClick: PropTypes.func.isRequired,
  data: PropTypes.object.isRequired,
  index: PropTypes.number.isRequired
}
