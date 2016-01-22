import _ from 'lodash';

import {
  CHANGE_STATUS_REQUEST,
  //CHANGE_STATUS_SUCCESS,
  CHANGE_STATUS_PROBLEM, //problem from redmine (issue logic). Not allowed to change status and others
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

  switch (action.type) {

    case CHANGE_STATUS_REQUEST:
    case GET_ISSUES_QUEUE_REQUEST:
      return {...state, fetching: true}

    case GET_ISSUES_QUEUE_SUCCESS:
      return {...state, issuesData: action.payload, fetching: false};

    case CHANGE_STATUS_PROBLEM:
      let nextIssue = action.payload;

      let prevIssuesQueue = state.issuesData.issuesQueue;

      let nextIssueIndex = state.issuesData.issuesQueue.findIndex((issue) => issue.id === nextIssue.id);

      let nextIssuesQueue = [
        ...prevIssuesQueue.slice(0, nextIssueIndex),
        nextIssue,
        ...prevIssuesQueue.slice(nextIssueIndex+1)
      ];

      let nextIssuesData = {...state.issuesData, issuesQueue: nextIssuesQueue};

      return {...state, issuesData: nextIssuesData, fetching: false};

    default:
      return state;
    }
}
