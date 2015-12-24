import {
  LOGIN_REQUEST,
  LOGIN_FAIL,
  LOGIN_SUCCESS,
  LOGOUT_REQUEST,
  LOGOUT_FAIL,
  LOGOUT_SUCCESS
} from '../constants/Login';

const initialState = {
};

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
