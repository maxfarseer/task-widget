import React, { PropTypes, Component } from 'react';

export default class TimeEntries extends Component {
  constructor(props) {
    super(props);
    this._makeHumanTime = this._makeHumanTime.bind(this);
  }

  _makeHumanTime(serverTime) {
    if (serverTime) {
      let hours = Math.floor(serverTime);
      let minutes = Math.round((serverTime - hours)*60);
      hours = hours < 10 ? '0'+hours : hours;
      minutes = minutes < 10 ? '0'+minutes : minutes;
      return `${hours}:${minutes}`;
    }
  }

  render() {
    const {timeEntriesSum, issueId} = this.props;

    return (
      <div className="task__clock">
        <i className="fa fa-clock-o"></i>{' '}
        <span id={`te_${issueId}`} data-server-time={timeEntriesSum}>
          {this._makeHumanTime(timeEntriesSum) || '00:00'}
        </span>
      </div>
    )
  }
}

TimeEntries.propTypes = {
  timeEntriesSum: PropTypes.number.isRequired,
  issueId: PropTypes.number.isRequired
}

