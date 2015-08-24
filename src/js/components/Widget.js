import React, { PropTypes, Component } from 'react';
import Task from './Task';
import SelectStatus from './SelectStatus';

export default class Widget extends Component {

  componentWillMount() {
    this.props.actions.getTasksQueue(/*user_id*/);
  }

  render() {
    const { actions, widget } = this.props;
    let tasks = widget.tasksQueue.map( (item, index) => (<Task data={item} key={index} actions={actions}/>));
    let currentTask = widget.tasksQueue[0] ? widget.tasksQueue[0] : '';
    let fetching = widget.fetching;
    let currentTaskTemplate;

    if (currentTask) {
      currentTaskTemplate = (
        <div className="widget">
          <h4>{currentTask.id}: {currentTask.name} | status: {currentTask.status}</h4>
          <div className="widget-btns">
            <button onClick={actions.changeStatus.bind(this,currentTask,1)}>PLAY</button>
            <button onClick={actions.changeStatus.bind(this,currentTask,2)}>PAUSE</button>
            <button onClick={actions.changeStatus.bind(this,currentTask,3)}>RESOLVE</button>
            <SelectStatus task={currentTask} actions={actions} />
          </div>
        </div>
      )
    }

    return (
      <div className="main">
        <div className={'preloader ' + (fetching ? '' : 'none')}></div>
        {currentTaskTemplate}
        <h4>Tasks query:</h4>
        {tasks}
      </div>
    );
  }
}
