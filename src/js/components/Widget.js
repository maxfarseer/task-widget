import React, { PropTypes, Component } from 'react';
import Task from './Task';
import SelectStatus from './SelectStatus';

export default class Widget extends Component {

  componentWillMount() {
    this.props.actions.getTasksQueue(/*user_id*/);
  }

  render() {
    const { actions } = this.props;
    const { tasksQueue, fetching, tasksQueue: {order} } = this.props.widget;
    let currentTask;

    //TODO: real user_id
    const user_id = 1;

    let tasks = order.map( (item, key) => {
      return <Task data={tasksQueue[item]} key={key} actions={actions} />
    });

    return (
      <div className="main">
        <div className="task-queue">
          <h4>Tasks queue: <button onClick={actions.getTasksQueue.bind(null,user_id)}>refresh from server</button></h4>
          {tasks}
        </div>
        <div className={'preloader ' + (fetching ? '' : 'none')}></div>
      </div>
    );
  }
}
