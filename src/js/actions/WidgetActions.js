import {
  TOGGLE_COMPACT_VIEW,
  CHANGE_STATUS,
  GET_AVAILABLE_STATUSES_REQUEST,
  GET_AVAILABLE_STATUSES_SUCCESS,
  GET_AVAILABLE_STATUSES_FAILURE,

  CHANGE_STATUS_REQUEST,
  CHANGE_STATUS_SUCCESS,
  CHANGE_STATUS_FAILURE,

  GET_TASKS_QUEUE_REQUEST,
  GET_TASKS_QUEUE_SUCCESS,
  GET_TASKS_QUEUE_FAILURE,
} from '../constants/Widget';

import {
  API_KEY
} from '../constants/Secret';

import * as status from '../constants/Statuses_ids';

let request = require('superagent-bluebird-promise');

const API_ROOT = 'http://redmine-qa.kama.gs';
const API_QUEUE = '/issues.json?utf8=%E2%9C%93&set_filter=1&f%5B%5D=status_id&op%5Bstatus_id%5D=%3D&v%5Bstatus_id%5D%5B%5D=1&v%5Bstatus_id%5D%5B%5D=2&v%5Bstatus_id%5D%5B%5D=10&f%5B%5D=assigned_to_id&op%5Bassigned_to_id%5D=%3D&v%5Bassigned_to_id%5D%5B%5D=me&f%5B%5D=project_id&op%5Bproject_id%5D=%3D&v%5Bproject_id%5D%5B%5D=mine&f%5B%5D=&c%5B%5D=project&c%5B%5D=tracker&c%5B%5D=status&c%5B%5D=priority&c%5B%5D=subject&c%5B%5D=author&c%5B%5D=assigned_to&c%5B%5D=fixed_version&c%5B%5D=estimated_hours';

function fetchChangeStatus(dispatch, task, status, callback) {

  dispatch({
    type: CHANGE_STATUS_REQUEST,
    payload: task
  })

  request.put(`${API_ROOT}/issues/${task.id}.json?${API_KEY}`).send(`issue[status_id]=${status}`)
    .then(res => {
      if (!res.ok) {
        dispatch({
          type: CHANGE_STATUS_FAILURE,
          payload: new Error('get tasks failure'),
          error: true
        })
      } else {
        dispatch({
          type: CHANGE_STATUS_SUCCESS,
          payload: res.body.result
        })
        if (!res.body.result.changeStatusProblem && callback) callback();
      }
    }, err => {
      console.warn('Promise error: ' + err);
    });
}

/**
 * change task status
 * @param  {object}   task - task item
 * @param  {string|number}   status_id - status ID
 */
export function changeStatus(task, status_id) {

  return (dispatch, getState) => {
    if (status_id === status.IN_PROGRESS) {
      let alreadyInProggress;
      let tasksQueue = getState().widget.tasksQueue;

      Object.keys(tasksQueue).map( (key, index) => {
        if (tasksQueue[key].status === status.IN_PROGRESS) {
          alreadyInProggress = tasksQueue[key]
        }
      });

      //если уже есть таск в IN_PROGRESS
      //переводим его в статус SUSPEND
      //если все ок - переводим в IN_PROGRESS таск-инициатор;
      if (alreadyInProggress) {
        fetchChangeStatus(dispatch, alreadyInProggress, status.SUSPEND, function() {
          fetchChangeStatus(dispatch,task,status_id);
        });
      } else {
        fetchChangeStatus(dispatch,task,status_id);
      }
    //если статус не IN_PROGRESS - обычный сценарий смены статуса.
    } else {
      fetchChangeStatus(dispatch,task,status_id);
    }

  }
}

/**
 * get tasks queue
 * @param  {string|number}   user_id - user ID
 */
export function getTasksQueue(user_id) {
  let fake_user_id = 1; //fake
  return (dispatch) => {

    dispatch({
      type: GET_TASKS_QUEUE_REQUEST
    });

    request.get(`${API_ROOT}${API_QUEUE}&${API_KEY}`)
      .then(res => {
        if (!res.ok) {
          dispatch({
            type: GET_TASKS_QUEUE_FAILURE,
            payload: new Error('get tasks failure'),
            error: true
          })
        } else {
          dispatch({
            type: GET_TASKS_QUEUE_SUCCESS,
            payload: JSON.parse(res.text).issues
          })
        }
      }, err => {
        console.warn('getTasksQueue request error: ' + err);
      })
  }
}


export function toggleCompactView() {
  return {
    type: TOGGLE_COMPACT_VIEW
  }
}
