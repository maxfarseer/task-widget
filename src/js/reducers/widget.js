import _ from 'lodash';

import {
  CHANGE_STATUS,
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

  switch (action.type) {
    case CHANGE_STATUS:
      let task = action.task;
      task.status = action.status_id;

      let nextTaskQueue = state.tasksQueue;

      let taskInProgress = _.remove(nextTaskQueue, (item) => {
        return item.status === status.IN_PROGRESS
      });

      if (taskInProgress.length > 0) {
        nextTaskQueue.unshift(taskInProgress[0]);
      }

      return {...state, tasksQueue: nextTaskQueue};

    case GET_TASKS_QUEUE_REQUEST:
      return {...state, fetching: true}

    case GET_TASKS_QUEUE_SUCCESS:
      let nextTasksQueue = action.payload;
      return {...state, tasksQueue: nextTasksQueue, fetching: false};

    default:
      return state;
    }
}
