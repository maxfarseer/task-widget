import React, { PropTypes, Component } from 'react';
import Task from './Task';

export default class Widget extends Component {

  componentWillMount(nextProps) {
    const { actions, widget } = this.props;
    actions.getAvailableStatuses(widget.status);
  }

  onSelectStatus(e) {
    this.props.actions.changeStatus(e.target.value);
  }

  render() {
    const { actions, widget } = this.props;
    let tasks = widget.allTasks.map( (item, index) => (<Task data={item} key={index} />));

    let selectStatusOption = widget.availableStatuses.map( (statusId, index) => {
      return (
        <option value={statusId} key={index}>
          {widget.allStatuses[statusId]}
        </option>
      )
    });

    let currentTask = widget.currentTask;

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
        <h4>Tasks:</h4>
        {tasks}
      </div>
    );
  }
}
