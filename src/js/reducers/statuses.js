import {
  GET_AVAILABLE_STATUSES_REQUEST,
  GET_AVAILABLE_STATUSES_SUCCESS,
  GET_AVAILABLE_STATUSES_FAILURE //todo
} from '../constants/Widget';

import * as status from '../constants/Statuses_ids';

const initialState = {
  allStatuses: {
    [status.NONE]: 'none',
    [status.IN_PROGRESS]: 'in progress',
    [status.SUSPEND]: 'suspend',
    [status.RESOLVED]: 'resolved',
    [status.CLOSED]: 'closed'
  },
  availableStatuses: {},
  fetching: false
}

export default function statuses(state = initialState, action) {

  switch (action.type) {

    case GET_AVAILABLE_STATUSES_REQUEST:
      return {...state, fetching: true };

    case GET_AVAILABLE_STATUSES_SUCCESS:
        let nextAvailableStatuses = state.availableStatuses;
        nextAvailableStatuses[action.payload.task_id] = action.payload.statuses;
        return {...state, availableStatuses: nextAvailableStatuses, fetching: false}

    default:
      return state;
    }
}
