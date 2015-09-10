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

import * as status from '../constants/Statuses_ids';

let request = require('superagent-bluebird-promise');

const API_ROOT = 'http://localhost:8080/api';

function fetchChangeStatus(dispatch, task, status, callback) {

  dispatch({
    type: CHANGE_STATUS_REQUEST,
    payload: task
  })

  request(`${API_ROOT}/change-status/${task.id}/${status}`)
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

    request.get(`${API_ROOT}/get-tasks-queue/${fake_user_id}`)
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
            payload: res.body.result
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
