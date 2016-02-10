import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as MainPageActions from '../actions/MainPageActions'
import {logout} from '../actions/LoginPageActions'
import * as status from '../constants/Statuses_ids'

import Task from '../components/Task'
import NewIssue from '../components/NewIssue'
import IssueCreated from '../components/IssueCreated'
import {
  API_ROOT
} from '../constants/Secret'

import classNames from 'classnames'

class MainPage extends Component {
  constructor(props) {
    super(props)
    this.handleChangeStatusClick = this.handleChangeStatusClick.bind(this)
    this.handleRefreshClick = this.handleRefreshClick.bind(this)
  }

  componentWillMount() {
    this.props.actions.getIssuesQueue()
    this.props.actions.getProjects()

    window.kgtrckr.actions.logout = this.props.logout
    window.kgtrckr.actions.toggleNewIssue = this.props.actions.toggleNewIssue
  }

  handleChangeStatusClick(task,status) {
    this.props.actions.changeStatus(task, status)
  }

  handleRefreshClick(task) {
    this.props.actions.getIssuesQueue(task)
  }

  handleNewIssueClick() {
    this.props.actions.toggleNewIssue()
  }

  handleCreateIssueClick(issue) {
    this.props.actions.createNewIssue(issue)
  }

  handleGetMemberships(project_id) {
    this.props.actions.getMemberships(project_id)
  }

  handleCloseBtnClick() {
    this.props.actions.closeNewIssueReminder()
  }

  _makeTaskComponent(tasksQueue) {
    return tasksQueue.map((el,i) => {
      return <Task
              data={el} key={i} index={i}
              onChangeStatusClick={this.handleChangeStatusClick}
              onRefreshClick={this.handleRefreshClick} />
    })
  }

  render() {
    const { fetching, newIssue, issueCreated, issueCreatedId } = this.props.mainpage;
    const { issuesQueue, otherTasksLength } = this.props.mainpage.issuesData;

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
      <div className='main'>
        <IssueCreated visible={issueCreated} id={issueCreatedId} onCloseBtnClick={::this.handleCloseBtnClick}/>
        <div className='stripe-wrapper'>
          <div className='badge'></div>
          <div className='stripe cf'>
            <div className='stripe__left'>{newIssue.isActive ? 'Create issue' : 'In Progress'}</div>
            <div className='stripe__right'>
              <i className={'fa fa-refresh rotate ' + (fetching ? '' : 'none')}></i>{' '}
              <i
                className={'fa ' + (newIssue.isActive ? 'fa-plus-circle fa-plus-circle_rotate':'fa-plus-circle')}
                onClick={::this.handleNewIssueClick}>
              </i>
            </div>
          </div>
        </div>
        {
          newIssue.isActive ?
            <NewIssue
              projects = {newIssue.projects}
              memberships = {newIssue.memberships}
              errors = {newIssue.errors}
              createIssueClick = {::this.handleCreateIssueClick}
              getMemberships = {::this.handleGetMemberships} />
          :
            ''
        }
        <div className={ classNames('task-queue', 'task-queue_inprogress', { 'opacity-01': newIssue.isActive }) }>
          {tasksInProgress}
        </div>
        <div className={classNames('stripe-wrapper', { 'opacity-01': newIssue.isActive })}>
          <div className='badge'></div>
          <div className='stripe'>Other issues</div>
        </div>
        <div className={ classNames('task-queue', { 'opacity-01': newIssue.isActive }) }>
          {otherTasks}
        </div>
        <div className={classNames('stripe-wrapper', { 'opacity-01': newIssue.isActive })}>
          <div className='badge'></div>
          <div className='stripe'><a href={`${API_ROOT}/issues`} className='stripe__link' target='_blank'>Another issues ({otherTasksLength})</a></div>
        </div>
      </div>
    );
  }
}

MainPage.propTypes = {
  mainpage: PropTypes.object.isRequired,
  logout: PropTypes.func.isRequired
}

function mapStateToProps(state) {
  return {
    mainpage: state.app.mainpage
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(MainPageActions, dispatch),
    logout: bindActionCreators(logout, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MainPage);
