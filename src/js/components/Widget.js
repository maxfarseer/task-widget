import React, { PropTypes, Component } from 'react';
import Task from './Task';

export default class Widget extends Component {

  componentWillMount(nextProps) {
    const { actions, widget:{currentTask} } = this.props;
    actions.getAvailableStatuses(currentTask.id, currentTask.status);
  }

  onSelectStatus(e) {
    let task = this.props.widget.currentTask;
    this.props.actions.changeStatus(task, e.target.value);
  }

  render() {
    const { actions, widget } = this.props;
    let tasks = widget.allTasks.map( (item, index) => (<Task data={item} key={index} actions={actions}/>));

    let selectStatusOption = widget.availableStatuses.map( (statusId, index) => {
      return (
        <option value={statusId} key={index}>
          {widget.allStatuses[statusId]}
        </option>
      )
    });

    let currentTask = widget.currentTask;

    //в actions первым аргументом, после this, передавать %task%
    return (
      <div className="main">
        <div className="widget">
          <h4>{currentTask.id}: {currentTask.name} | status: {currentTask.status}</h4>
          <div className="widget-btns">
            <button onClick={actions.changeStatus.bind(this,1)}>PLAY</button>
            <button onClick={actions.changeStatus.bind(this,2)}>PAUSE</button>
            <button onClick={actions.changeStatus.bind(this,3)}>RESOLVE</button>
            <select onChange={::this.onSelectStatus}>
              {selectStatusOption}
            </select>
          </div>
        </div>
        <h4>Tasks query:</h4>
        {tasks}
      </div>
    );
  }
}
