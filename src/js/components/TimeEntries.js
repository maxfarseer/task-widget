import React, { PropTypes, Component } from 'react';

export default class TimeEntries extends Component {

  render() {
    const { time:{hours, minutes}, timeEntriesSum, issueId } = this.props;

    return (
      <div className="task__clock">
        <i className="fa fa-clock-o"></i>{' '}
        <span id={`te_${issueId}`} data-server-time={timeEntriesSum}>
          {hours}<span className='colon'>:</span>{minutes}
        </span>
      </div>
    )
  }
}

TimeEntries.propTypes = {
  timeEntriesSum: PropTypes.number.isRequired,
  time: PropTypes.object.isRequired,
  issueId: PropTypes.number.isRequired
}

