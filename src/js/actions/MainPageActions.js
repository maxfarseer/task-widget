import {
  GET_ISSUE_REQUEST,
  GET_ISSUE_SUCCESS,
  GET_ISSUE_FAILURE,

  CHANGE_STATUS_REQUEST,
  CHANGE_STATUS_FAILURE,
  CHANGE_STATUS_PROBLEM,

  GET_ISSUES_QUEUE_REQUEST,
  GET_ISSUES_QUEUE_SUCCESS,
  GET_ISSUES_QUEUE_FAILURE,

  LOAD_TIMEENTRIES_FAILURE,

  TOGGLE_NEW_ISSUE,

  CREATE_NEW_ISSUE_REQUEST,
  CREATE_NEW_ISSUE_SUCCESS,
  CREATE_NEW_ISSUE_FAILURE,
  CREATE_NEW_ISSUE_PROBLEM,

  GET_PROJECTS_REQUEST,
  GET_PROJECTS_SUCCESS, //eslint-disable-line no-unused-vars
  GET_PROJECTS_FAILURE,
  GET_PROJECTS_PROBLEM,

  GET_MEMBERSHIPS_REQUEST,
  GET_MEMBERSHIPS_SUCCESS,
  GET_MEMBERSHIPS_FAILURE,
  GET_MEMBERSHIPS_PROBLEM,

  CLOSE_NEW_ISSUE_REMINDER
} from '../constants/MainPage'

import {
  API_ROOT
} from '../constants/Secret'

import * as status from '../constants/Statuses_ids'
import { logout } from './LoginPageActions'

import { makeMembershipsForReactSelect } from '../utils'

const request = require('superagent-bluebird-promise') //import ?

const API_QUEUE = 'issues.json?c%5B%5D=project&c%5B%5D=tracker&c%5B%5D=status&c%5B%5D=priority&c%5B%5D=subject&c%5B%5D=author&c%5B%5D=assigned_to&c%5B%5D=fixed_version&c%5B%5D=estimated_hours&f%5B%5D=status_id&f%5B%5D=tracker_id&f%5B%5D=assigned_to_id&f%5B%5D=&group_by=&op%5Bassigned_to_id%5D=%3D&op%5Bstatus_id%5D=%3D&op%5Btracker_id%5D=%3D&set_filter=1&sort=priority%3Adesc%2Cstatus%2Cstart_date%3Adesc&utf8=%E2%9C%93&v%5Bassigned_to_id%5D%5B%5D=me&v%5Bstatus_id%5D%5B%5D=1&v%5Bstatus_id%5D%5B%5D=7&v%5Bstatus_id%5D%5B%5D=2&v%5Bstatus_id%5D%5B%5D=10&v%5Btracker_id%5D%5B%5D=2&v%5Btracker_id%5D%5B%5D=1'

/**
 * get issue
 * @param  {Function}   dispatch - redux lib function
 * @param  {Function}   getState - redux lib function
 * @param  {string|number}   id - issue id
 */
function getIssue(dispatch, getState, id) { // eslint-disable-line no-unused-vars

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
      console.warn('Get issue error: ' + err);
    });
}

/**
 * get time entreis
 * @param  {Function}   dispatch - redux store.dispatch method
 * @param  {Object}   user - redmine user
 * @param  {Object}   issue - issue
 * @param  {string|number}   offset - offset for timeentries request
 * @param  {string|number}   timeEntriesSum - current step time entries sum
 */
function getTimeEntries(dispatch, user, issue, offset = 0, timeEntriesSum = 0) {
  let url = `${API_ROOT}/time_entries.json?key=${user.api_key}&issue_id=${issue.id}&user_id=${user.id}&limit=100&offset=${offset}`;
  return request.get(url)
    .then(res => {
    if (!res.ok) {
      dispatch({
        type: LOAD_TIMEENTRIES_FAILURE,
        payload: new Error('loadTimeEntries failure'),
        error: true
      });
    } else {
      if (res.body.total_count > res.body.offset + res.body.limit) {
        let newOffset = offset + 100;
        res.body.time_entries.forEach(item => timeEntriesSum += item.hours);
        return getTimeEntries(dispatch, user, issue, newOffset, timeEntriesSum);
      } else {
        res.body.time_entries.forEach(item => timeEntriesSum += item.hours);
        return {...issue, _timeEntriesSum: timeEntriesSum};
      }
    }
  }, err => {
    console.warn('Load TimeEntries error: ' + err);
  })
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
            payload: new Error('change issue status failure'),
            error: true
          });
        } else {
          getIssuesQueue()(dispatch, getState);
        }
      }, err => {
        if (err.status === 401) {
          alert('Your session has expired');
          logout()(dispatch, getState);
        } else  if (err.body && err.body.errors) {
          dispatch({
            type: CHANGE_STATUS_PROBLEM,
            payload: {...issue, _error: true, _errorArr: err.body.errors},
            error: true
          });
        } else {
          if (err.status) {
            alert(`Can not change status: error ${err.status}`)
          } else {
            alert(`Can not change status: network connection problem`)
          }
        }
      })
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
              otherTasks = [],
              remainingTasksLength;

          res.body.issues.forEach(el => {
            if (el.status.id !== status.IN_PROGRESS) {
              otherTasks.push(el);
            } else {
              inProgressFirst.push(el);
            }
          })

          const inProgressTasksLength = inProgressFirst.length;

          otherTasks = otherTasks.slice(0,3);

          [].push.apply(inProgressFirst,otherTasks);

          remainingTasksLength = res.body.total_count - inProgressFirst.length

          //get all time logs for issue by user and create startWorkTime record in session storage
          let timeEntreisPromisesArr =[];

          inProgressFirst.forEach(issue => {
            timeEntreisPromisesArr.push( getTimeEntries(dispatch, user, issue) );
          });

          Promise.all(timeEntreisPromisesArr).then(inProgressFirst => {
            dispatch({
              type: GET_ISSUES_QUEUE_SUCCESS,
              payload: {
                issuesQueue: inProgressFirst,
                remainingTasksLength,
                inProgressTasksLength
              }
            })
            window.kgtrckr.issues = inProgressFirst;
            let issuesLoad = new Event('issuesLoad');
            document.body.dispatchEvent(issuesLoad);
          }).catch(values => console.warn(values));
        }
      }, err => {
        if (err.status === 401) {
          alert('Your session has expired');
          logout()(dispatch, getState);
        } else {
          let tryAgain = window.confirm(`Can not load issues queue: error ${err.status}`);
          if (tryAgain) {
            getIssuesQueue()(dispatch, getState);
          }
        }
      })
  }
}

export function toggleNewIssue() {
  return {
    type: TOGGLE_NEW_ISSUE
  }
}

export function createNewIssue(newIssue) {
  return (dispatch, getState) => {

    dispatch({
      type: CREATE_NEW_ISSUE_REQUEST,
      meta: {
        remote: true
      }
    })

    const API_KEY = getState().app.user.api_key;

    request.post(`${API_ROOT}/issues.json?key=${API_KEY}`)
      .set('Content-Type', 'application/json')
      .send({issue: newIssue})
      .then(res => {
        if (!res.ok) {
          dispatch({
            type: CREATE_NEW_ISSUE_FAILURE,
            payload: new Error('create new issue failure'),
            error: true
          });
        } else {
          dispatch({
            type: CREATE_NEW_ISSUE_SUCCESS,
            payload: res.body.issue
          });
          let createIssueSuccess = new CustomEvent('createIssueSuccess', {'detail': res.body});
          document.body.dispatchEvent(createIssueSuccess);
        }
      }, err => {
        if (err.status === 401) {
          alert('Your session has expired');
          logout()(dispatch, getState);
        } else if (err.body && err.body.errors) {
          dispatch({
            type: CREATE_NEW_ISSUE_PROBLEM,
            payload: err.body.errors,
            error: true
          });
        } else {
          if (err.status) {
            alert(`Can not create issue: error ${err.status}`)
          } else {
            alert(`Can not create issue: network connection problem`)
          }
        }
      })

  }
}

export function getProjects() {
  return (dispatch, getState) => {

    dispatch({
      type: GET_PROJECTS_REQUEST,
      meta: {
        remote: true
      }
    })

    const API_KEY = getState().app.user.api_key;

    function getData(offset = 0) {
      return request.get(`${API_ROOT}/projects.json?key=${API_KEY}&limit=100&offset=${offset}`)
    }

    function collectData() {
      let projects = [];
      return new Promise((resolve, reject) => {
        (function loop(offset) {

          getData(offset)
            .then(res => {
              if (!res.ok) {
                dispatch({
                  type: GET_PROJECTS_FAILURE,
                  payload: new Error('get projects failure'),
                  error: true
                });
                alert('Redmine server problem: can\'t collect projects')
              }

              if (res.body.total_count > res.body.offset + res.body.limit) {
                [].push.apply(projects,res.body.projects)
                offset += 100
                loop(offset)
              } else {
                [].push.apply(projects,res.body.projects)

                dispatch({
                  type: GET_PROJECTS_SUCCESS,
                  payload: projects
                });

              }
            }, err => {
              if (err.status === 401) {
                alert('Your session has expired')
                logout()(dispatch, getState)
              } else {
                dispatch({
                  type: GET_PROJECTS_PROBLEM,
                  error: true
                })
                if (err.status) {
                  alert(`Can not collect projects: error ${err.status}`)
                } else {
                  alert(`Can not collect projects: network connection problem`)
                }

              }
            }).catch(reject)

        })(0)
      });
    }

    collectData()
  }
}

export function getMemberships(project_id) {
  return (dispatch, getState) => {

    dispatch({
      type: GET_MEMBERSHIPS_REQUEST,
      meta: {
        remote: true
      }
    })

    const API_KEY = getState().app.user.api_key;

    function getData(offset = 0) {
      return request.get(`${API_ROOT}/projects/${project_id}/memberships.json?key=${API_KEY}&limit=100&offset=${offset}`)
    }

    function collectData() {
      let memberships = [];
      return new Promise((resolve, reject) => {
        (function loop(offset) {

          getData(offset)
            .then(res => {
              if (!res.ok) {
                dispatch({
                  type: GET_MEMBERSHIPS_FAILURE,
                  payload: new Error('get memberships failure'),
                  error: true
                });
                alert('Redmine server problem: can\'t collect memberships')
              }

              if (res.body.total_count > res.body.offset + res.body.limit) {
                [].push.apply(memberships,res.body.memberships)
                offset += 100
                loop(offset)
              } else {
                [].push.apply(memberships,res.body.memberships)

                let membershipsForSelect = makeMembershipsForReactSelect(memberships);

                dispatch({
                  type: GET_MEMBERSHIPS_SUCCESS,
                  payload: membershipsForSelect
                });

              }
            }, err => {
              if (err.status === 401) {
                alert('Your session has expired')
                logout()(dispatch, getState)
              } else {
                dispatch({
                  type: GET_MEMBERSHIPS_PROBLEM,
                  error: true
                })
                if (err.status) {
                  alert(`Can not collect memberships: error ${err.status}`)
                } else {
                  alert(`Can not collect memberships: network connection problem`)
                }
              }
            }).catch(reject)

        })(0)
      });
    }

    collectData()
  }
}

export function closeNewIssueReminder() {
  return {
    type: CLOSE_NEW_ISSUE_REMINDER
  }
}
