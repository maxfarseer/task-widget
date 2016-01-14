import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as MainPageActions from '../actions/MainPageActions';
import * as status from '../constants/Statuses_ids';

import Task from '../components/Task';
import {
  API_ROOT
} from '../constants/Secret';

class MainPage extends Component {
  constructor(props) {
    super(props);
    this.handleChangeStatusClick = this.handleChangeStatusClick.bind(this);
  }

  componentWillMount() {
    this.props.actions.getIssuesQueue();
  }

  handleChangeStatusClick(task,status) {
    this.props.actions.changeStatus(task, status);
  }

  _makeTaskComponent(tasksQueue) {
    return tasksQueue.map((el,i) => {
      return <Task
              data={el} key={i} index={i}
              loadTimeEntries={this.props.actions.loadTimeEntries}
              onChangeStatusClick={this.handleChangeStatusClick} />
    })
  }

  render() {
    const { dispatch, user } = this.props;
    const { fetching } = this.props.mainpage;
    const { issuesQueue, inProgressTasksLength, otherTasksLength } = this.props.mainpage.issuesData;

    let tasksInProgress = [],
        otherTasks = [];

    issuesQueue.forEach(issue => {
      if (issue.status.id !== status.IN_PROGRESS) {
        otherTasks.push(issue)
      } else {
        tasksInProgress.push(issue)
      }
    });

    otherTasks = this._makeTaskComponent(otherTasks);
    tasksInProgress = this._makeTaskComponent(tasksInProgress);

    return (
      <div className="main">
        <div className={'preloader preloader_main ' + (fetching ? '' : 'none')}></div>
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
          <div className="stripe"><a href={`${API_ROOT}/issues`} className='stripe__link' target='_blank'>Все задачи ({otherTasksLength})</a></div>
        </div>
      </div>
    );
  }
}

MainPage.propTypes = {
  mainpage: PropTypes.object,
  user: PropTypes.object,
}

function mapStateToProps(state) {
  return {
    mainpage: state.app.mainpage,
    user: state.app.user
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(MainPageActions, dispatch),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MainPage);
