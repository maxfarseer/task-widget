import React, { PropTypes, Component } from 'react';
import * as _status from '../constants/Statuses_ids';
import {API_ROOT} from '../constants/Secret';

export default class Task extends Component {


  componentDidMount() {
    let task = this.props.data;
    //this.props.loadTimeEntries(task.id);
  }

  componentWillReceiveProps() {
    console.log('componentWillReceiveProps');
  }

  render() {
    const task = this.props.data;
    const {subject, description, id, status, fetching} = task;
    const {onChangeStatusClick, index} = this.props;

    return (
      <div className={`task task_${index}`}>
        <div>
          <div className='task__left'>
            <div className="task__name">{subject}</div>
            <div className="task__clock"><i className="fa fa-clock-o"></i> {task._timeEntriesSum}</div>
            <div className="task__project">{task.project.name}</div>
          </div>
          <div className='task__right'>
            {task.status.id === 2 ?
              <div>
                <button className="task-btn task-btn_pause" onClick={onChangeStatusClick.bind(this,task,_status.SUSPEND)}>||</button>
                <button className="task-btn task-btn_resolve" onClick={onChangeStatusClick.bind(this,task,_status.RESOLVED)}>&#10003;</button>
              </div>
              :
              <div>
                <button className="task-btn task-btn_play" onClick={onChangeStatusClick.bind(this,task,_status.IN_PROGRESS)}>&#9654;</button>
              </div>
            }
          </div>
          <div className={'preloader preloader_task ' + (fetching ? '' : 'none')}></div>
        </div>
      </div>
    )
  }
}

Task.propTypes = {
  onChangeStatusClick: PropTypes.func.isRequired,
  loadTimeEntries: PropTypes.func.isRequired,
  data: PropTypes.object.isRequired,
  index: PropTypes.number.isRequired
}
