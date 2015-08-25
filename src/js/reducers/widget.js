import _ from 'lodash';

import {
  CHANGE_STATUS,
  CHANGE_STATUS_SUCCESS,
  GET_TASKS_QUEUE_REQUEST,
  GET_TASKS_QUEUE_SUCCESS,
  GET_TASKS_QUEUE_FAILURE
} from '../constants/Widget';

import * as status from '../constants/Statuses_ids';

const initialState = {
  tasksQueue: [],
  fetching: false
};

export default function widget(state = initialState, action) {

  let nextTasksQueue;

  switch (action.type) {

    case CHANGE_STATUS_SUCCESS:
      let task = action.payload;
      //task.status = action.status_id;

      debugger

      nextTasksQueue = state.tasksQueue;

      let taskInProgress = _.remove(nextTasksQueue, (item) => {
        return item.status === status.IN_PROGRESS
      });

      if (taskInProgress.length > 0) {
        nextTasksQueue.unshift(taskInProgress[0]);
      }

      return {...state, tasksQueue: nextTasksQueue};

    case GET_TASKS_QUEUE_REQUEST:
      return {...state, fetching: true}

    case GET_TASKS_QUEUE_SUCCESS:
      nextTasksQueue = action.payload;
      return {...state, tasksQueue: nextTasksQueue, fetching: false};

    default:
      return state;
    }
}
