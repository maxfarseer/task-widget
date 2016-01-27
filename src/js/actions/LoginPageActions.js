import {
	LOGIN_REQUEST,
	LOGIN_SUCCESS,
	LOGIN_FAIL,
	LOGOUT_REQUEST,
	LOGOUT_SUCCESS,
	LOGOUT_FAIL,
} from '../constants/Login';

import {
  API_ROOT
} from '../constants/Secret';

const request = require('superagent-bluebird-promise');

export function login(username, pass) {
	return (dispatch, getState) => {

		dispatch({
			type: LOGIN_REQUEST,
			meta: {
				remote: true
			}
		});

		const encodedUserInfo = 'Basic '+btoa(username+':'+pass);

		request(`${API_ROOT}/users/current.json`).set('Authorization',encodedUserInfo)
    .then(res => {
      if (!res.ok) {
        dispatch({
          type: LOGIN_FAIL,
          payload: new Error('Login failure'),
          error: true
        })
      } else {
        dispatch({
          type: LOGIN_SUCCESS,
          payload: res.body.user,
        })
        window.localStorage.setItem('user', JSON.stringify(res.body.user));
      }
    }, err => {
      if (err.status === 401) {
        alert('Login or password was incorrect');
      } else {
        alert('Network problem, check your internet connection');
      }
      console.warn('Login error: ' + err);
    });
	}
}

export function logout(username, pass) {
  return (dispatch, getState) => {

    let logoutSuccess = new Event('logout');
    document.body.dispatchEvent(logoutSuccess);
    window.localStorage.removeItem('user');

    dispatch({
      type: LOGOUT_SUCCESS
    });
  }
}
