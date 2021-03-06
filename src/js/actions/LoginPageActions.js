import {
	LOGIN_REQUEST,
	LOGIN_SUCCESS,
	LOGIN_FAIL,
	LOGOUT_SUCCESS
} from '../constants/Login';

import {
  API_ROOT
} from '../constants/Secret';

const request = require('superagent-bluebird-promise');

export function login(username, pass) {
	return (dispatch, getState) => { // eslint-disable-line no-unused-vars

		dispatch({
			type: LOGIN_REQUEST,
			meta: {
				remote: true
			}
		});

    let encodedUserInfo;
    let alertAlreadyShown;

    try {
      encodedUserInfo = 'Basic '+btoa(username+':'+pass);
    } catch(e) {
      alert('Login or password contains incorrect symbols');
      alertAlreadyShown = true;
    }

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
          payload: res.body.user
        })
        window.localStorage.setItem('user', JSON.stringify(res.body.user));
      }
    }, err => {
      if (err.status === 401) {
        if (!alertAlreadyShown) {
          alert('Login or password was incorrect');
        }
      } else {
        alert('Network problem, check your internet connection');
      }
      console.warn('Login error: ' + err);
    });
	}
}

export function logout() {
  return (dispatch, getState) => { // eslint-disable-line no-unused-vars

    let logoutSuccess = new Event('logout');
    document.body.dispatchEvent(logoutSuccess);
    window.localStorage.removeItem('user');

    dispatch({
      type: LOGOUT_SUCCESS
    });
  }
}
