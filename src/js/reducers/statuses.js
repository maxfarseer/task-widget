import {
  GET_AVAILABLE_STATUSES
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
  availableStatuses: {

  }
}

export default function statuses(state = initialState, action) {

  switch (action.type) {
    case GET_AVAILABLE_STATUSES:
        let nextAvailableStatuses = state.availableStatuses;
        nextAvailableStatuses[action.task_id] = [1,2,3,4];
        return {...state, availableStatuses: nextAvailableStatuses}

    default:
      return state;
    }
}
