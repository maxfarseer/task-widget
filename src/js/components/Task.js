import React, { PropTypes, Component } from 'react';
import * as _status from '../constants/Statuses_ids';
import {API_ROOT} from '../constants/Secret';

export default class Task extends Component {

  render() {
    const task = this.props.data;
    const {subject, description, id, status, fetching} = task;
    const {actions, index} = this.props;
    let taskTemplate;

    if (!task._error) {
      taskTemplate = (
        <div>
          <div className='task__left'>
            <div className="task__name">{subject}</div>
            <div className="task__clock"><i className="fa fa-clock-o"></i> 00:00</div>
            <div className="task__project">{task.project.name}</div>
          </div>
          <div className='task__right'>
            {task.status.id === 2 ?
              <div>
                <button className="task-btn task-btn_pause" onClick={actions.changeStatus.bind(this,task,_status.SUSPEND)}>||</button>
                <button className="task-btn task-btn_resolve" onClick={actions.changeStatus.bind(this,task,_status.RESOLVED)}>&#10003;</button>
              </div>
              :
              <div>
                <button className="task-btn task-btn_play" onClick={actions.changeStatus.bind(this,task,_status.IN_PROGRESS)}>&#9654;</button>
              </div>
            }

          </div>
          <div className={'preloader preloader_task ' + (fetching ? '' : 'none')}></div>
        </div>
      )
    } else {
      taskTemplate = (
        <div>
          <div className='task__left'>
            <div>Change status error!</div>
            <a href={`${API_ROOT}/issues/${id}`} target='_blank'>Please check this action in Redmine</a>
            <div className="task__errors">
              {task._errorArr.map((text, key) => <p key={key}>{text}</p>)}
            </div>
          </div>
          <div className='task__right'>
            <button className="task-btn task-btn_refresh" onClick={actions.refreshIssue.bind(this,id)}>
              <i className="fa fa-refresh"></i>
            </button>
          </div>
        </div>
      )
    }

    return (
      <div className={`task task_${index}`}>
        {taskTemplate}
      </div>
    )
  }
}
