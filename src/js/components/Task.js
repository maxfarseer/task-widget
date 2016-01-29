import React, { PropTypes, Component } from 'react';
import _ from 'lodash';
import * as _status from '../constants/Statuses_ids';
import {API_ROOT} from '../constants/Secret';
import { makeHumanTime } from '../utils/';

import TimeEntries from './TimeEntries';

export default class Task extends Component {
  constructor(props) {
    super(props);

    this.state = {tooltip: false};

    this.setTooltipVisibility = _.debounce(this.setTooltipVisibility.bind(this),400);
  }

  setTooltipVisibility(status) {
    this.setState({tooltip: status});
  }

  render() {
    const task = this.props.data;
    const {subject, description, id, status, priority, project} = task;
    const {onRefreshClick, onChangeStatusClick, index} = this.props;
    const issueLink = `${API_ROOT}/issues/${task.id}`

    let template,
        errors,
        tooltip = this.state.tooltip;

    if (task._error) {
      errors = task._errorArr.map((error,index) => <p key={index}>{error}</p>)
      template = (
        <div className={`task task_${index}`}>
          <div className='task__left'>
            <p>You need to check this action in <a href={issueLink} target='_blank'>redmine</a> because:</p>
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
          <div className='task__left'
            onMouseEnter={this.setTooltipVisibility.bind(this,true)}
            onMouseLeave={this.setTooltipVisibility.bind(this,false)}
          >
            <a href={issueLink} className={`task-modal-ip ${ (tooltip ? 'task-modal-ip_visible' : 'task-modal-ip_hidden') } `}>
              <div className='task-modal__subject'>
                <div className='task-modal__project'>{project.name}</div>
                <div>{subject}</div>
              </div>
              <p className='task-modal__desc'>{description.length > 100 ? description.slice(0,100) +'...' : description}</p>
            </a>
            <div className="task__name">
              <a className="task-name-link" href={`${API_ROOT}/issues/${task.id}`} target='_blank'>{subject}</a>
            </div>
            <TimeEntries timeEntriesSum={task._timeEntriesSum} issueId={task.id} time={makeHumanTime(task._timeEntriesSum)}/>
            <div className="task__project">{project.name}</div>
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
        </div>
      )
    } else {
      template = (
        <div className={`task task_${index} task_nip`}>
          <div className={`badge-priority badge-priority-${priority.name}`}></div>
          <div className='task__left'
            onMouseEnter={this.setTooltipVisibility.bind(this,true)}
            onMouseLeave={this.setTooltipVisibility.bind(this,false)}
          >
            <a href={issueLink} className={` task-modal ${ (tooltip ? 'task-modal_visible' : 'task-modal_hidden') } `}>
              <div className='task-modal__subject'>
                <div className='task-modal__project'>{project.name}</div>
                <div>{subject}</div>
              </div>
              <p className='task-modal__desc'>{description.length > 100 ? description.slice(0,100) +'...' : description}</p>
            </a>
            <div className="task__name task__name_nip">
              <a className="task-name-link task-name-link_nip" href={issueLink} target='_blank'>{subject}</a>
            </div>
          </div>
          <div className='task__right'>
            <div>
              <button className="task-btn task-btn_play" onClick={onChangeStatusClick.bind(this,task,_status.IN_PROGRESS)}>&#9654;</button>
            </div>
          </div>
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
