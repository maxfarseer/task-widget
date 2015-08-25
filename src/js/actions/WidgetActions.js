import {
  CHANGE_STATUS,
  GET_AVAILABLE_STATUSES,

  CHANGE_STATUS_REQUEST,
  CHANGE_STATUS_SUCCESS,
  CHANGE_STATUS_FAILURE,

  GET_TASKS_QUEUE_REQUEST,
  GET_TASKS_QUEUE_SUCCESS,
  GET_TASKS_QUEUE_FAILURE
} from '../constants/Widget';
import * as status from '../constants/Statuses_ids';
import 'isomorphic-fetch';

const API_ROOT = 'http://localhost:8080/api';

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

      //переводим таск, который уже в IN_PROGRESS в статус SUSPEND
      if (alreadyInProggress) {
        fetch(`${API_ROOT}/change-status/${alreadyInProggress.id}/${status.SUSPEND}`)
          .then(response =>
            response.json().then(json => ({ json, response}))
          )
          .then(({ json, response }) => {
            if (!response.ok) {
              dispatch({
                type: CHANGE_STATUS_FAILURE,
                payload: new Error('get tasks failure'),
                error: true
              })
            } else {
              dispatch({
                type: CHANGE_STATUS_SUCCESS,
                payload: json.result
              })

              //если все ок - переводим в IN_PROGRESS таск-инициатор
              fetch(`${API_ROOT}/change-status/${task.id}/${status_id}`)
                .then(response =>
                  response.json().then(json => ({ json, response}))
                )
                .then(({ json, response }) => {
                  if (!response.ok) {
                    dispatch({
                      type: CHANGE_STATUS_FAILURE,
                      payload: new Error('get tasks failure'),
                      error: true
                    })
                  } else {
                    dispatch({
                      type: CHANGE_STATUS_SUCCESS,
                      payload: json.result
                    })
                  }
                });
            }
          });
      }
    } else {

      fetch(`${API_ROOT}/change-status/${task.id}/${status_id}`)
        .then(response =>
          response.json().then(json => ({ json, response}))
        )
        .then(({ json, response }) => {
          if (!response.ok) {
            dispatch({
              type: CHANGE_STATUS_FAILURE,
              payload: new Error('get tasks failure'),
              error: true
            })
          } else {
            dispatch({
              type: CHANGE_STATUS_SUCCESS,
              payload: json.result
            })
          }
        });
    }

  }
}
/**
 * get available statuses for task
 * @param  {string|number}   task_id - task ID
 * @param  {string|number}   status_id - status ID
 */
export function getAvailableStatuses(task_id, status_id) {
  return {
    type: GET_AVAILABLE_STATUSES,
    task_id,
    status_id
  };
}

/**
 * get tasks queue
 * @param  {string|number}   user_id - user ID
 */
export function getTasksQueue(user_id) {
  let fake_user_id = 1; //fake
  return (dispatch) => {

    dispatch({
      type: GET_TASKS_QUEUE_REQUEST,
    });

    fetch(`${API_ROOT}/get-tasks-queue/${fake_user_id}`)
      .then(response =>
        response.json().then(json => ({ json, response}))
      )
      .then(({ json, response }) => {
        if (!response.ok) {
          dispatch({
            type: GET_TASKS_QUEUE_FAILURE,
            payload: new Error('get tasks failure'),
            error: true
          })
        } else {
          dispatch({
            type: GET_TASKS_QUEUE_SUCCESS,
            payload: json.result
          })
        }
      });
  }
}
