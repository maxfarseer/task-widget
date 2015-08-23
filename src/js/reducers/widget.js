import _ from 'lodash';

import {
  CHANGE_STATUS,
  GET_AVAILABLE_STATUSES
} from '../constants/Widget';

import * as status from '../constants/Statuses_ids';

const initialState = {
  tasksQueue: [
    //first task = current task
    {
      id: 412,
      status: 2,
      name: 'Fix another bug',
      desc: 'this is bug waits for fix'
    },
    {
      id: 25124,
      status: 4,
      name: 'Database error',
      desc: 'fix last query'
    },
    {
      id: 6481,
      status: 3,
      name: 'Buy the milk',
      desc: '10 packs enough'
    }
  ]
};

export default function widget(state = initialState, action) {

  switch (action.type) {
    case CHANGE_STATUS:
      let task = action.task;
      let nextTaskQueue = state.tasksQueue;

      if (task.id !== nextTaskQueue[0].id) {
        _.remove(nextTaskQueue,{id: task.id});
        task.status = action.status_id;
        nextTaskQueue.unshift(task);
      } else {
        nextTaskQueue[0].status = action.status_id;
      }

      return {...state, tasksQueue: nextTaskQueue};

    default:
      return state;
    }
}
