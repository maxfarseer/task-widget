import React, { PropTypes, Component } from 'react'
import * as status from '../constants/Statuses_ids'
import { findDOMNode } from 'react-dom'
import '../../styles/new-issue.scss'

export default class NewIssue extends Component {

  componentDidMount() {
    console.log('mount')
  }

  componentWillUnmount() {
    console.log('unmount')
  }

  onBtnClick() {
    let issue = {
      project_id: 172,
      subject: findDOMNode(this.refs.subject).value,
      //assignee: findDOMNode(this.refs.assignee).value,
      description: findDOMNode(this.refs.desc).value,
      status_id: status.NEW,
      tracker_id: 2, // 'Task'
      priority_id: 4 // 'Normal'
    }
    this.props.createIssueClick(issue);
  }

  render() {
    return (
      <div className='new-issue'>
        <input className='new-issue__input' type='text' placeholder='Project' ref='project'/>
        <input className='new-issue__input' type='text' placeholder='Issue subject' ref='subject'/>
        <input className='new-issue__input' type='text' placeholder='Assignee' ref='assignee'/>
        <textarea className='new-issue__textarea' placeholder='Issue description' ref='desc'></textarea>
        <button className='new-issue__btn' onClick={::this.onBtnClick}>Create Issue</button>
      </div>
    )
  }
}

NewIssue.propTypes = {
  createIssueClick: PropTypes.func.isRequired,
  projects: PropTypes.array.isRequired
}
