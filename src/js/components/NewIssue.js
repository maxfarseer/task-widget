import React, { PropTypes, Component } from 'react'
import TransitionGroup from 'react/lib/ReactCSSTransitionGroup';
import Select from 'react-select'
import * as status from '../constants/Statuses_ids'
import { findDOMNode } from 'react-dom'
import '../../styles/react-select.scss'
import '../../styles/new-issue.scss'

export default class NewIssue extends Component {
  constructor(props) {
    super(props);
    this.state = {
      project_id: window.localStorage.getItem('kgtckr_project_id') || ''
    }
  }

  componentWillMount() {
    const project_id = window.localStorage.getItem('kgtckr_project_id')
    if (project_id) {
      this.props.getMemberships(project_id)
    }
  }

  onBtnClick() {
    let issue = {
      project_id: this.refs.selectProject.refs.value.value, // because use react-select
      assigned_to_id: this.refs.selectAssignee.refs.value.value, // because use react-select
      subject: findDOMNode(this.refs.subject).value,
      description: findDOMNode(this.refs.desc).value,
      status_id: status.NEW,
      tracker_id: 2, // 'Task'
      priority_id: 4 // 'Normal'
    }
    this.props.createIssueClick(issue);
  }

  chooseProject(project_id) {
    if (project_id) {
      this.setState({project_id: project_id}, () => window.localStorage.setItem('kgtckr_project_id',project_id))
      this.props.getMemberships(project_id)
    }
  }

  render() {
    const { projects, memberships } = this.props
    return (
      <TransitionGroup transitionName='newissue'
        transitionAppear={true}
        transitionAppearTimeout={200} transitionEnterTimeout={200}
        transitionLeaveTimeout={200}>

        <div className='new-issue'>

          <Select
            labelKey='name'
            valueKey='id'
            className='new-issue__select'
            name='choose-project'
            value={this.state.project_id}
            ref='selectProject'
            options={projects}
            onChange={::this.chooseProject} />

          <input className='new-issue__input' type='text' placeholder='Issue subject' ref='subject'/>

          <Select
            labelKey='_username'
            valueKey='_user_id'
            className='new-issue__select'
            name='choose-assignee'
            value=''
            ref='selectAssignee'
            options={memberships} />

          <textarea className='new-issue__textarea' placeholder='Issue description' ref='desc'></textarea>
          <button className='new-issue__btn' onClick={::this.onBtnClick}>Create Issue</button>
        </div>
      </TransitionGroup>
    )
  }
}

NewIssue.propTypes = {
  projects: PropTypes.array.isRequired,
  memberships: PropTypes.array.isRequired,
  createIssueClick: PropTypes.func.isRequired,
  getMemberships: PropTypes.func.isRequired
}
