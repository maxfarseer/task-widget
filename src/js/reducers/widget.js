import {
  CHANGE_STATUS,
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
  availableStatuses: [],
  currentTask: {
    id: 412,
    status: 1,
    name: 'Fix another bug',
    desc: 'this is bug waits for fix'
  },
  allTasks: [
    {
      id: 412,
      status: 2,
      name: 'Fix another bug',
      desc: 'this is bug waits for fix'
    },
    {
      id: 25124,
      status: 2,
      name: 'Database error',
      desc: 'fix last query'
    },
    {
      id: 6481,
      status: 2,
      name: 'Buy the milk',
      desc: '10 packs enough'
    }
  ]
};

export default function widget(state = initialState, action) {

  switch (action.type) {
  case CHANGE_STATUS:
    let nextTask = action.task;
    //нормализовать таски по ID
    //nextTask.status = action.status_id;
    //return {...state, allTasks[nextTask.id]: ...nextTask,status: +action.status_id}
    return state;

  case GET_AVAILABLE_STATUSES:
    return {...state, availableStatuses: [1,2,3,4]}

  default:
    return state;
  }
}
