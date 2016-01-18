import React, { PropTypes, Component } from 'react';

export default class TimeEntries extends Component {
  constructor(props) {
    super(props);
    this._makeHumanTime = this._makeHumanTime.bind(this);
  }

  componentDidMount() {
    let issue = this.props.issue;
  }

  componentWillReceiveProps() {
    console.log('componentWillReceiveProps');
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
    const {issue} = this.props;
    return (
      <div className="task__clock">
        <i className="fa fa-clock-o"></i> {this._makeHumanTime(issue._timeEntriesSum) || '00:00'}
      </div>
    )
  }
}

TimeEntries.propTypes = {
  issue: PropTypes.object.isRequired
}

