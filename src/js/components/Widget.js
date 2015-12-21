import React, { PropTypes, Component } from 'react';
import Task from './Task';
import * as _status from '../constants/Statuses_ids';
import {
  API_ROOT
} from '../constants/Secret';

export default class Widget extends Component {

  componentWillMount() {
    this.props.actions.getIssuesQueue();
  }

  render() {
    const { actions } = this.props;
    const { tasksQueue, fetching, allStatuses} = this.props.widget;
    let tasksInProgress = [],
        otherTasks = [];

    tasksQueue.forEach((el,i) => {
      if (el.status.id !== _status.IN_PROGRESS) {
        otherTasks.push(
          <Task data={el} key={i} index={i} actions={actions} />
        )
      } else {
        tasksInProgress.push(
          <Task data={el} key={i} index={i} actions={actions} />
        )
      }
    })
    
    const otherTasksLength = (otherTasks.length > 4 ? otherTasks.length - 4 : otherTasks.length);    
    otherTasks = otherTasks.slice(0,3);

    return (
      <div className="main">
        <div className={'preloader preloader_main ' + (fetching ? '' : 'none')}></div>
        <button onClick={actions.getIssuesQueue.bind(null)}>refresh from server</button>
        <h4 className="task-queue__header">Maxim Patsianskiy, 16.12.2015:</h4>
        <div className="stripe-wrapper">
          <div className="badge"></div>
          <div className="stripe">В работе</div>
        </div>
        <div className="task-queue task-queue_inprogress">
          {tasksInProgress}
        </div>
        <div className="stripe-wrapper">
          <div className="badge"></div>
          <div className="stripe">Другие задачи</div>
        </div>
        <div className="task-queue">
          {otherTasks}
        </div>
        <div className="stripe-wrapper">
          <div className="badge"></div>
          <div className="stripe"><a href={`${API_ROOT}/issues`} className='stripe__link' target='_blank'>Все задачи ({otherTasksLength})</a></div>
        </div>
      </div>
    );
  }
}