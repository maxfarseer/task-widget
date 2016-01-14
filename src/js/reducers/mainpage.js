import _ from 'lodash';

import {
  GET_ISSUE_REQUEST,
  CHANGE_STATUS_REQUEST,
  //CHANGE_STATUS_SUCCESS,
  //CHANGE_STATUS_PROBLEM, //problem from redmine (issue logic). Not allowed to change status and others
  GET_ISSUES_QUEUE_REQUEST,
  GET_ISSUES_QUEUE_SUCCESS,
  GET_ISSUES_QUEUE_FAILURE, //todo

  LOAD_TIMEENTRIES_REQUEST,
  LOAD_TIMEENTRIES_SUCCESS
} from '../constants/MainPage';

import * as status from '../constants/Statuses_ids';

const initialState = {
  issuesData: {
    issuesQueue: [],
    inProgressTasksLength: 0,
    otherTasksLength: 0,
  },
  fetching: false,
};

export default function mainpage(state = initialState, action) {

  let next;
  let nextTasksQueue;
  let nextTask;
  let task;
  let taskIndex;

  switch (action.type) {

    case CHANGE_STATUS_REQUEST:
    case GET_ISSUES_QUEUE_REQUEST:
    case GET_ISSUE_REQUEST:
      return {...state, fetching: true}

    case GET_ISSUES_QUEUE_SUCCESS:
      return {...state, issuesData: action.payload, fetching: false};

    case LOAD_TIMEENTRIES_SUCCESS:
      nextTasksQueue = state.tasksQueue;

      let taskId = action.payload.id;
      nextTask = _.find(nextTasksQueue.tasksInProgress, {id:taskId}) || _.find(nextTasksQueue.otherTasks, {id:taskId});
      nextTask._timeEntriesSum = action.payload.timeEntriesSum;

      return {...state, tasksQueue: nextTasksQueue, fetching: false};

    default:
      return state;
    }
}
