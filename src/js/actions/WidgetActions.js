import {
  CHANGE_STATUS,
  GET_AVAILABLE_STATUSES
} from '../constants/Widget';

export function changeStatus(status_id) {
  return {
    type: CHANGE_STATUS,
    status_id
  };
}

export function getAvailableStatuses(status_id) {
  return {
    type: GET_AVAILABLE_STATUSES,
    status_id
  };
}
