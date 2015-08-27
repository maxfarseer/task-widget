import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';

export default class SelectStatus extends Component {

  shouldComponentUpdate(newProps) {
    console.log(newProps);
    console.log(this.props);
    return true;
  }

  componentWillMount() {
    let task = this.props.task;
    //this.props.actions.getAvailableStatuses(task.id, task.satus);
  }

  onSelectStatus(e) {
    let task = this.props.task;
    this.props.actions.changeStatus(task, +e.target.value);
  }

  render() {
    const { task, actions } = this.props;
    const availableStatuses = this.props.statuses.availableStatuses[task.id];

    let selectStatusOption;

    if (availableStatuses) {
      selectStatusOption = availableStatuses.map( (statusId, index) => {
        return (
          <option value={statusId} key={index}>
            {this.props.statuses.allStatuses[statusId]}
          </option>
        )
      });
    }

    return (
      <div>
        <button
          className={availableStatuses ? 'none': ''}
          onClick={actions.getAvailableStatuses.bind(this,task.id,task.status)}>Other
        </button>
        {/*<span className={'preloader-inline ' + (availableStatuses ? 'none': '')}>&nbsp;</span>*/}
        <select onChange={::this.onSelectStatus} value={task.status} className={availableStatuses ? '': 'none'}>
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
