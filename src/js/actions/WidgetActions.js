import {
  CHANGE_STATUS,
  GET_AVAILABLE_STATUSES
} from '../constants/Widget';

import * as status from '../constants/Statuses_ids';

 /**
   * change task status
   * @param  {object}   task - task item
   * @param  {string|number}   status_id - status ID
   */
export function changeStatus(task, status_id) {

  return (dispatch, getState) => {
    if (status_id === status.IN_PROGRESS) {

      let taskQueue = getState().widget.tasksQueue;

      let alreadyInProggress = _.find(taskQueue, (item) => {
        return item.status === status.IN_PROGRESS
      });

      if (alreadyInProggress) {
        dispatch({
          type: CHANGE_STATUS,
          task: alreadyInProggress,
          status_id: status.SUSPEND
        });
      }

      dispatch({
        type: CHANGE_STATUS,
        task,
        status_id
      });

    } else {
      dispatch({
        type: CHANGE_STATUS,
        task,
        status_id
      });
    }
  }
}

/**
   * get available statuses for task
   * @param  {string|number}   task_id - task ID
   * @param  {string|number}   status_id - status ID
   */
export function getAvailableStatuses(task_id, status_id) {
  return {
    type: GET_AVAILABLE_STATUSES,
    task_id,
    status_id
  };
}
