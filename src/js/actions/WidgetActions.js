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
  if (status_id === status.IN_PROGRESS) {
    return function(dispatch, getState) {
      debugger
    }
  }
  return {
    type: CHANGE_STATUS,
    task,
    status_id
  };
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
