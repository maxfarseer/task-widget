import {
  LOGIN_SUCCESS,
  LOGOUT_SUCCESS
} from '../constants/Login';


const initialState = JSON.parse(window.localStorage.getItem('user')) || {};

export default function mainstate(state = initialState, action) {
  let nextState;

  switch (action.type) {
  case LOGIN_SUCCESS:
    nextState = action.payload;
    return nextState;

  case LOGOUT_SUCCESS:
    return {};

  default:
    return state;
  }
}
