import React, { PropTypes, Component } from 'react';
import Task from './Task';
import * as _status from '../constants/Statuses_ids';
import {
  API_ROOT
} from '../constants/Secret';

export default class Widget extends Component {
  constructor(props) {
    super(props);
    this.handleChangeStatusClick = this.handleChangeStatusClick.bind(this);
  }

  componentWillMount() {
    this.props.actions.getIssuesQueue();
  }

  _makeTaskComponent(tasksQueue) {
    return tasksQueue.map((el,i) => <Task data={el} key={i} index={i} onChangeStatusClick={this.handleChangeStatusClick} />)
  }

  handleChangeStatusClick(task,status) {
    this.props.actions.changeStatus(task, status);
  }

  render() {
    const { actions, user } = this.props;
    const { tasksQueue, fetching, allStatuses} = this.props.widget;

    let tasksInProgress = [],
        otherTasks = [];

    otherTasks = this._makeTaskComponent(tasksQueue.otherTasks);
    tasksInProgress = this._makeTaskComponent(tasksQueue.tasksInProgress);

    return (
      <div className="main">
        <div className={'preloader preloader_main ' + (fetching ? '' : 'none')}></div>
        {/*<button onClick={actions.getIssuesQueue.bind(null)}>refresh from server</button>*/}
        <h4 className="task-queue__header">{user.login}</h4>
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
          <div className="stripe"><a href={`${API_ROOT}/issues`} className='stripe__link' target='_blank'>Все задачи ({tasksQueue.otherTasksLength})</a></div>
        </div>
      </div>
    );
  }
}

Widget.propTypes = {
  widget: PropTypes.object.isRequired
}
