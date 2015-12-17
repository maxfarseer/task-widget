import _ from 'lodash';

import {
  TOGGLE_COMPACT_VIEW,
  CHANGE_STATUS,
  CHANGE_STATUS_REQUEST,
  CHANGE_STATUS_SUCCESS,
  GET_TASKS_QUEUE_REQUEST,
  GET_TASKS_QUEUE_SUCCESS,
  GET_TASKS_QUEUE_FAILURE //todo
} from '../constants/Widget';

import * as status from '../constants/Statuses_ids';

const initialState = {
  /*allStatuses: {
    [status.NONE]: 'none',
    [status.IN_PROGRESS]: 'in progress',
    [status.SUSPEND]: 'suspend',
    [status.RESOLVED]: 'resolved',
    [status.CLOSED]: 'closed'
  },*/
  tasksQueue: [],
  compactView: false,
  fetching: false
};

export default function widget(state = initialState, action) {

  let nextTasksQueue;
  let nextTask;
  let task;

  function inProgressFirst(queue) {
    let taskInProgress = _.find(queue, {status: 1});
    if (taskInProgress) {
      let removedTask_id = _.remove(queue.order, (elem) => elem === taskInProgress.id)[0];
      queue.order.unshift(removedTask_id);
    }
  }

  switch (action.type) {

    case CHANGE_STATUS_REQUEST:
      task = action.payload;
      nextTasksQueue = state.tasksQueue;

      nextTask = {...task, fetching: true};
      nextTasksQueue[nextTask.id] = nextTask;

      return {...state, tasksQueue: nextTasksQueue};

    case CHANGE_STATUS_SUCCESS:
      task = action.payload;
      nextTasksQueue = state.tasksQueue;

      nextTask = {...task, fetching: false};
      nextTasksQueue[nextTask.id] = nextTask;

      inProgressFirst(nextTasksQueue);
      return {...state, tasksQueue: nextTasksQueue};

    case GET_TASKS_QUEUE_REQUEST:
      return {...state, fetching: true}

    case GET_TASKS_QUEUE_SUCCESS:
      nextTasksQueue = action.payload;
      //inProgressFirst(nextTasksQueue);

      return {...state, tasksQueue: nextTasksQueue, fetching: false};

    case TOGGLE_COMPACT_VIEW:
      return {...state, compactView: !state.compactView};

    default:
      return state;
    }
}
