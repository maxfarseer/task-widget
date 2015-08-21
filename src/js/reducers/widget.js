import {
  CHANGE_STATUS,
  GET_AVAILABLE_STATUSES
} from '../constants/Widget';

//TODO:
//нормализация статусов

const initialState = {
  status: 0,
  allStatuses: {
    0: 'none',
    1: 'in progress',
    2: 'suspend',
    3: 'resolved',
    4: 'closed'
  },
  availableStatuses: [],
  currentTask: {
    id: 412,
    name: 'Fix another bug',
    desc: 'this is bug waits for fix'
  },
  allTasks: [
    {
      id: 412,
      name: 'Fix another bug',
      desc: 'this is bug waits for fix'
    },
    {
      id: 25124,
      name: 'Database error',
      desc: 'fix last query'
    },
    {
      id: 6481,
      name: 'Buy the milk',
      desc: '10 packs enough'
    }
  ]
};

export default function widget(state = initialState, action) {

  switch (action.type) {
  case CHANGE_STATUS:
    return {...state, status: action.status_id}

  case GET_AVAILABLE_STATUSES:
    return {...state, availableStatuses: [1,2,3,561]}

  default:
    return state;
  }
}
