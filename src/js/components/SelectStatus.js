import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';

export default class SelectStatus extends Component {

  //todo: запрашивать статусы по клику
  componentWillMount(nextProps) {
    const { actions, task } = this.props;
    //actions.getAvailableStatuses(task.id, task.status);
  }

  onSelectStatus(e) {
    let task = this.props.task;
    this.props.actions.changeStatus(task, +e.target.value);
  }

  render() {
    const { task, actions } = this.props;
    const availableStatuses = this.props.statuses.availableStatuses[task.id];
    let selectStatusOption = availableStatuses.map( (statusId, index) => {
      return (
        <option value={statusId} key={index}>
          {this.props.statuses.allStatuses[statusId]}
        </option>
      )
    });

    return (
      <div>
        <button onClick={actions.getAvailableStatuses.bind(this,task.id,task.status)}>Other</button>
        <select onChange={::this.onSelectStatus}>
          {selectStatusOption}
        </select>
      </div>
    );
  }
}

function select(state) {
  return {
    statuses: state.statuses
  };
}

export default connect(select)(SelectStatus);
