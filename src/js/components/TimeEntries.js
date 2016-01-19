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

  componentWillUnmount() {
    console.log('unmount');
  }

  render() {
    const {issue, isInProgress} = this.props;
    let timerTemplate;

    if (isInProgress) {
      timerTemplate = '00:06';

      const startDate = new Date();
      const startDay = startDate.getDay();
      const startMonth = startDate.getMonth();
      const startYear = startDate.getYear();
      const str = JSON.stringify(`${issue.id}[${startDay}-${startMonth}-${startYear}]`);

      let workTime = window.sessionStorage.getItem(str) ? window.sessionStorage.getItem(str) : 0;

      /*if (!this.interval) {
        this.interval = setInterval(() => {
        workTime = Math.round(workTime * 100) / 100 + 0.1;
        window.sessionStorage.setItem(str, workTime);
        console.log('tick from ' + issue.id);
        }, 5000);
      }*/
    }

    return (
      <div className="task__clock">
        <i className="fa fa-clock-o"></i> {this._makeHumanTime(issue._timeEntriesSum) || '00:00'} ({timerTemplate})
      </div>
    )
  }
}

TimeEntries.propTypes = {
  issue: PropTypes.object.isRequired
}

