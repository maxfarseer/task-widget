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
          payload: new Error('get issue failure'),
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
      console.warn('Login error: ' + err);
    });
	}
}

export function logout() {
  window.localStorage.removeItem('user');
  return {
    type: LOGOUT_SUCCESS
  }
}
