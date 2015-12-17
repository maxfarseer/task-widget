import React, { PropTypes, Component } from 'react';
import Task from './Task';
import {
  API_ROOT
} from '../constants/Secret';

export default class Widget extends Component {

  componentWillMount() {
    this.props.actions.getTasksQueue(/*user_id*/);
  }

  render() {
    const { actions } = this.props;
    const { tasksQueue, fetching, allStatuses, compactView} = this.props.widget;
    let currentTask;

    //TODO: real user_id
    const user_id = 1;
    let tasks = tasksQueue.map( (item, key) => {
      return <Task data={item} key={key} actions={actions} index={key}/>
    });
    
    const tasksLength = tasks.length - 4;
    const taskInProgress = tasks[0];
    tasks = tasks.slice(1,4);

    /*if (compactView) {
      tasks = tasks[0];
    }*/

    return (
      <div className="main">
        <div className={'preloader preloader_main ' + (fetching ? '' : 'none')}></div>
        <button onClick={actions.getTasksQueue.bind(null,user_id)}>refresh from server</button>
        <h4 className="task-queue__header">Maxim Patsianskiy, 16.12.2015:</h4>
        <div className="stripe-wrapper">
          <div className="badge"></div>
          <div className="stripe">В работе</div>
        </div>
        <div className="task-queue">
          {taskInProgress}
        </div>
        <div className="stripe-wrapper">
          <div className="badge"></div>
          <div className="stripe">Другие задачи</div>
        </div>
        <div className="task-queue">
          {tasks}
        </div>
        {/*<button className="task-queue__showall js-toggle-compact-view" data-compact={compactView} onClick={actions.toggleCompactView}>
          {compactView ? 'show all':'hide all'}
        </button>*/}
        <div className="stripe-wrapper">
          <div className="badge"></div>
          <div className="stripe"><a href={`${API_ROOT}/issues`} className='stripe__link' target='_blank'>Все задачи ({tasksLength})</a></div>
        </div>
      </div>
    );
  }
}
