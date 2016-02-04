import _ from 'lodash';

import {
  CHANGE_STATUS_REQUEST,
  CHANGE_STATUS_PROBLEM, //problem from redmine (issue logic). Not allowed to change status and others
  GET_ISSUES_QUEUE_REQUEST,
  GET_ISSUES_QUEUE_SUCCESS,
  TOGGLE_NEW_ISSUE,
  GET_PROJECTS_SUCCESS,
  GET_MEMBERSHIPS_REQUEST,
  GET_MEMBERSHIPS_SUCCESS,
  CREATE_NEW_ISSUE_REQUEST,
  CREATE_NEW_ISSUE_SUCCESS,
  CREATE_NEW_ISSUE_PROBLEM
} from '../constants/MainPage';

const initialState = {
  issuesData: {
    issuesQueue: [],
    inProgressTasksLength: 0,
    otherTasksLength: 0
  },
  fetching: false,
  newIssue: {
    isActive: false,
    projects: [],
    memberships: [],
    errors: []
  }
};

export default function mainpage(state = initialState, action) {

  switch (action.type) {

    case CHANGE_STATUS_REQUEST:
    case GET_ISSUES_QUEUE_REQUEST:
    case GET_MEMBERSHIPS_REQUEST:
      return {...state, fetching: true}

    case GET_ISSUES_QUEUE_SUCCESS:
      return {...state, issuesData: action.payload, fetching: false};

    case CHANGE_STATUS_PROBLEM:
      let nextIssue = action.payload;

      let prevIssuesQueue = state.issuesData.issuesQueue;

      let nextIssueIndex = _.findIndex(state.issuesData.issuesQueue, (issue) => issue.id === nextIssue.id);

      let nextIssuesQueue = [
        ...prevIssuesQueue.slice(0, nextIssueIndex),
        nextIssue,
        ...prevIssuesQueue.slice(nextIssueIndex+1)
      ];

      let nextIssuesData = {...state.issuesData, issuesQueue: nextIssuesQueue};

      return {...state, issuesData: nextIssuesData, fetching: false};

    case TOGGLE_NEW_ISSUE:
      return { ...state, newIssue: { ...state.newIssue, isActive: !state.newIssue.isActive, errors: []} }

    case GET_PROJECTS_SUCCESS:
      return { ...state, newIssue: { ...state.newIssue, projects: action.payload} }

    case GET_MEMBERSHIPS_SUCCESS:
      return { ...state, newIssue: { ...state.newIssue, memberships: action.payload}, fetching: false }

    case CREATE_NEW_ISSUE_PROBLEM:
      return { ...state, newIssue: {...state.newIssue, isActive: true, errors: action.payload}, fetching: false }

    case CREATE_NEW_ISSUE_REQUEST:
      return { ...state, newIssue: {...state.newIssue, isActive: false}, fetching: true }

    case CREATE_NEW_ISSUE_SUCCESS:
      return { ...state, fetching: false }

    default:
      return state;
    }
}
