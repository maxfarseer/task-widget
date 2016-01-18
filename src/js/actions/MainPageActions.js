import {
  GET_ISSUE_REQUEST,
  GET_ISSUE_SUCCESS,
  GET_ISSUE_FAILURE,

  CHANGE_STATUS_REQUEST,
  CHANGE_STATUS_SUCCESS,
  CHANGE_STATUS_FAILURE,
  CHANGE_STATUS_PROBLEM,

  GET_ISSUES_QUEUE_REQUEST,
  GET_ISSUES_QUEUE_SUCCESS,
  GET_ISSUES_QUEUE_FAILURE,

  LOAD_TIMEENTRIES_REQUEST,
  LOAD_TIMEENTRIES_SUCCESS,
  LOAD_TIMEENTRIES_FAILURE,
  LOAD_TIMEENTRIES_PROBLEM,
} from '../constants/MainPage';

import {
  API_ROOT
} from '../constants/Secret';

import * as status from '../constants/Statuses_ids';

const request = require('superagent-bluebird-promise'); //import ?

const API_QUEUE = 'issues.json?c%5B%5D=project&c%5B%5D=tracker&c%5B%5D=status&c%5B%5D=priority&c%5B%5D=subject&c%5B%5D=author&c%5B%5D=assigned_to&c%5B%5D=fixed_version&c%5B%5D=estimated_hours&f%5B%5D=status_id&f%5B%5D=assigned_to_id&f%5B%5D=project_id&f%5B%5D=tracker_id&f%5B%5D=&group_by=&op%5Bassigned_to_id%5D=%3D&op%5Bproject_id%5D=%3D&op%5Bstatus_id%5D=%3D&op%5Btracker_id%5D=%3D&set_filter=1&sort=priority%3Adesc%2Cstatus%2Csubject&utf8=✓&v%5Bassigned_to_id%5D%5B%5D=me&v%5Bproject_id%5D%5B%5D=mine&v%5Bstatus_id%5D%5B%5D=1&v%5Bstatus_id%5D%5B%5D=7&v%5Bstatus_id%5D%5B%5D=2&v%5Bstatus_id%5D%5B%5D=10&v%5Btracker_id%5D%5B%5D=2&v%5Btracker_id%5D%5B%5D=1';

/**
 * get issue
 * @param  {function}   dispatch - dispatch function
 * @param  {string|number}   id - issue id
 */
function getIssue(dispatch, getState, id) { //не вызывается нигде

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
          getIssuesQueue()(dispatch, getState);
        }
      }, err => {
        console.warn('Change status error: ' + err);
        //TODO: переделать отображение ошибки
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

    const user = getState().app.user;
    const API_KEY = user.api_key;

    dispatch({
      type: GET_ISSUES_QUEUE_REQUEST
    });

    request.get(`${API_ROOT}/${API_QUEUE}&key=${API_KEY}`)
      .then(res => {
        if (!res.ok) {
          dispatch({
            type: GET_ISSUES_QUEUE_FAILURE,
            payload: new Error('get issue failure'),
            error: true
          })
        } else {
          //form tasks IN_PROGRESS and 3 other tasks
          let inProgressFirst = [],
              otherTasks = [];

          res.body.issues.forEach(el => {
            if (el.status.id !== status.IN_PROGRESS) {
              otherTasks.push(el)
            } else {
              inProgressFirst.push(el)
            }
          })

          const otherTasksLength = (otherTasks.length > 4 ? otherTasks.length - 4 : otherTasks.length);
          const inProgressTasksLength = inProgressFirst.length;

          otherTasks = otherTasks.slice(0,3);

          [].push.apply(inProgressFirst,otherTasks);

          //get all time logs for issue by user
          let timeEntreisPromisesArr =[];

          inProgressFirst.forEach(issue => {
            let url = `${API_ROOT}/time_entries.json?key=${user.api_key}&issue_id=${issue.id}&user_id=${user.id}&limit=100`;
            timeEntreisPromisesArr.push(request.get(url)
              .then(res => {
              if (!res.ok) {
                dispatch({
                  type: LOAD_TIMEENTRIES_FAILURE,
                  payload: new Error('loadTimeEntries failure'),
                  error: true
                });
              } else {
                let timeEntriesSum = 0;
                res.body.time_entries.forEach(item => timeEntriesSum += item.hours);
                return {...issue,_timeEntriesSum: timeEntriesSum};
              }
            }, err => {
              console.warn('Load TimeEntries error: ' + err);
            }));

          })

          Promise.all(timeEntreisPromisesArr).then(inProgressFirst => {
              dispatch({
                type: GET_ISSUES_QUEUE_SUCCESS,
                payload: {
                  issuesQueue: inProgressFirst,
                  otherTasksLength,
                  inProgressTasksLength
                }
              })
            }).catch(values => console.warn(values));
        }
      }, err => {
        console.warn('getIssuesQueue request error: ' + err);
        //GET_ISSUES_QUEUE_PROBLEM ??
      })
  }
}
