import React, { PropTypes, Component } from 'react';
import Task from './Task';
import SelectStatus from './SelectStatus';

export default class Widget extends Component {

  componentWillMount() {
    this.props.actions.getTasksQueue(/*user_id*/);
  }

  render() {
    const { actions, widget:{tasksQueue}, widget:{fetching} } = this.props;
    let currentTask;

    let tasks = Object.keys(tasksQueue).map( (key, index) => {
      return <Task data={tasksQueue[key]} key={index} actions={actions}/>
    });

    //let currentTask = tasksQueue[412] ? tasksQueue[412] : '';
    //let currentTaskTemplate;

    /*if (currentTask) {
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
    }*/

    return (
      <div className="main">
        {/*<div className="widget-wrapper">
          <div className={'preloader ' + (fetching ? '' : 'none')}></div>
          {currentTaskTemplate}
        </div>*/}
        <div className="task-queue">
          <h4>Tasks queue:</h4>
          {tasks}
        </div>
        <div className={'preloader ' + (fetching ? '' : 'none')}></div>
      </div>
    );
  }
}
