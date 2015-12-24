import {
  GET_ISSUE_REQUEST,
  GET_ISSUE_SUCCESS,
  GET_ISSUE_FAILURE,

  CHANGE_STATUS_REQUEST,
  CHANGE_STATUS_SUCCESS,
  CHANGE_STATUS_FAILURE,
  CHANGE_STATUS_PROBLEM,

  GET_TASKS_QUEUE_REQUEST,
  GET_TASKS_QUEUE_SUCCESS,
  GET_TASKS_QUEUE_FAILURE,
} from '../constants/Widget';

import {
  API_ROOT
} from '../constants/Secret';

import * as status from '../constants/Statuses_ids';

const request = require('superagent-bluebird-promise'); //import ?

const API_QUEUE = '/issues.json?c%5B%5D=project&c%5B%5D=tracker&c%5B%5D=status&c%5B%5D=priority&c%5B%5D=subject&c%5B%5D=author&c%5B%5D=assigned_to&c%5B%5D=fixed_version&c%5B%5D=estimated_hours&f%5B%5D=status_id&f%5B%5D=assigned_to_id&f%5B%5D=project_id&f%5B%5D=tracker_id&f%5B%5D=&group_by=&op%5Bassigned_to_id%5D=%3D&op%5Bproject_id%5D=%3D&op%5Bstatus_id%5D=%3D&op%5Btracker_id%5D=%3D&set_filter=1&sort=priority%3Adesc%2Cstatus%2Csubject&utf8=✓&v%5Bassigned_to_id%5D%5B%5D=me&v%5Bproject_id%5D%5B%5D=mine&v%5Bstatus_id%5D%5B%5D=1&v%5Bstatus_id%5D%5B%5D=7&v%5Bstatus_id%5D%5B%5D=2&v%5Bstatus_id%5D%5B%5D=10&v%5Btracker_id%5D%5B%5D=2&v%5Btracker_id%5D%5B%5D=1';
/**
 * helper for call getIssue from view
 * @param  {string|number}   id - issue id
 */
export function refreshIssue(id) {
  return (dispatch,getState) => {getIssue(dispatch, getState, id)};
};

/**
 * get issue
 * @param  {function}   dispatch - dispatch function
 * @param  {string|number}   id - issue id
 */
function getIssue(dispatch, getState, id) {

  const API_KEY = getState().app.user.api_key;

  dispatch({
    type: GET_ISSUE_REQUEST,
    meta: {
      remote: true
    }
  });

  request(`${API_ROOT}/issues/${id}.json?key=${API_KEY}`)
    .then(res => {
      if (!res.ok) {
        dispatch({
          type: GET_ISSUE_FAILURE,
          payload: new Error('get issue failure'),
          error: true
        })
      } else {
        dispatch({
          type: GET_ISSUE_SUCCESS,
          payload: res.body.issue
        })
      }
    }, err => {
      console.warn('Promise error: ' + err);
    });
}

/**
 * change issue status
 * @param  {object}   task - task item
 * @param  {string|number}   status_id - status ID
 */
export function changeStatus(issue, status_id) {
  const _status_id = status_id;
  return (dispatch, getState) => {

    const API_KEY = getState().app.user.api_key;

    dispatch({
      type: CHANGE_STATUS_REQUEST,
      meta: {
        remote: true
      }
    });

    request.put(`${API_ROOT}/issues/${issue.id}.json?key=${API_KEY}`)
      .send(`issue[status_id]=${_status_id}`)
      .then(res => {
        if (!res.ok) {
          dispatch({
            type: CHANGE_STATUS_FAILURE,
            payload: new Error('get tasks failure'),
            error: true
          });
        } else {
          getIssue(dispatch, getState, issue.id);
        }
      }, err => {
        console.warn('Change status error: ' + err);
        dispatch({
          type: CHANGE_STATUS_PROBLEM,
          payload: {...issue, _error: true, _errorArr: err.body.errors},
          error: true
        });
      });
    }
}

export function getIssuesQueue() {
  return (dispatch, getState) => {

    const API_KEY = getState().app.user.api_key;

    dispatch({
      type: GET_TASKS_QUEUE_REQUEST
    });

    request.get(`${API_ROOT}${API_QUEUE}&key=${API_KEY}`)
      .then(res => {
        if (!res.ok) {
          dispatch({
            type: GET_TASKS_QUEUE_FAILURE,
            payload: new Error('get issue failure'),
            error: true
          })
        } else {
          dispatch({
            type: GET_TASKS_QUEUE_SUCCESS,
            payload: res.body.issues
          })
        }
      }, err => {
        console.warn('getIssuesQueue request error: ' + err);
      })
  }
}
