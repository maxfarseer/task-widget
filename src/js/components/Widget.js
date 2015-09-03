import React, { PropTypes, Component } from 'react';
import Task from './Task';

export default class Widget extends Component {

  componentWillMount() {
    this.props.actions.getTasksQueue(/*user_id*/);
  }

  render() {
    const { actions } = this.props;
    const { tasksQueue, fetching, tasksQueue: {order} , allStatuses, compactView} = this.props.widget;
    let currentTask;

    //TODO: real user_id
    const user_id = 1;

    let tasks = order.map( (item, key) => {
      return <Task data={tasksQueue[item]} key={key} actions={actions} allStatuses={allStatuses} index={key}/>
    });

    if (compactView) {
      tasks = tasks[0];
    }

    return (
      <div className="main">
        <div className="task-queue">
          <h4 className="task-queue__header">Tasks queue: <button onClick={actions.getTasksQueue.bind(null,user_id)}>refresh from server</button></h4>
          {tasks}
        </div>
        <button className="task-queue__showall js-toggle-compact-view" data-compact={compactView} onClick={actions.toggleCompactView}>
          {compactView ? 'show all':'hide all'}
        </button>
        <div className={'preloader ' + (fetching ? '' : 'none')}></div>
      </div>
    );
  }
}
