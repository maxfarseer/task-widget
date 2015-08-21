import React, { PropTypes, Component } from 'react';
import Task from './Task';

export default class Widget extends Component {

  componentWillMount(nextProps) {
    const { actions, widget } = this.props;
    actions.getAvailableStatuses(widget.status);
  }

  render() {
    const { actions, widget } = this.props;
    let tasks = widget.allTasks.map( (item, index) => (<Task data={item} key={index} />))

    //TODO: status id
    let selectStatusOption = widget.availableStatuses.map( (status, index) => {
      return <option value='status.id' key={index}>{status}</option>
    });

    return (
      <div className="main">
        <div className="widget">
          <h4>#123: fix redmine bug | status: {widget.status}</h4>
          <div className="widget-btns">
            <button onClick={actions.changeStatus.bind(this,1)}>PLAY</button>
            <button onClick={actions.changeStatus.bind(this,2)}>PAUSE</button>
            <button onClick={actions.changeStatus.bind(this,3)}>RESOLVE</button>
            <select>
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
