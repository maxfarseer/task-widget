import {
  CHANGE_STATUS,
  GET_AVAILABLE_STATUSES
} from '../constants/Widget';

const initialState = {
  allStatuses: {
    0: 'none',
    1: 'in progress',
    2: 'suspend',
    3: 'resolved',
    4: 'closed',
    561: 'WAAT'
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
      status: 1,
      name: 'Fix another bug',
      desc: 'this is bug waits for fix'
    },
    {
      id: 25124,
      status: 1,
      name: 'Database error',
      desc: 'fix last query'
    },
    {
      id: 6481,
      status: 1,
      name: 'Buy the milk',
      desc: '10 packs enough'
    }
  ]
};

export default function widget(state = initialState, action) {

  switch (action.type) {
  case CHANGE_STATUS:
    let nextCurrentTask = {...state.currentTask, status: +action.status_id};
    return {...state, currentTask: nextCurrentTask}

  case GET_AVAILABLE_STATUSES:
    return {...state, availableStatuses: [1,2,3,561]}

  default:
    return state;
  }
}
