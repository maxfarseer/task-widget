import {
  LOGIN, LOGOUT,
} from '../constants/Types';

const initialState = {
  login: '',
  pass: ''
};

export default function mainstate(state = initialState, action) {
  switch (action.type) {
  case LOGIN:
    return {...state,login: action.user, pass: 'fakepass'}

  case LOGOUT:
    return {...state,login: '', pass: ''}

  default:
    return state;
  }
}
