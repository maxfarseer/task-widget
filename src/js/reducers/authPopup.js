import {
  SHOW_POPUP, HIDE_POPUP,
} from '../constants/Types';

const initialState = {
  isShown: false
};

export default function authPopup(state = initialState, action) {
  switch (action.type) {
  case SHOW_POPUP:
    return {...state, isShown: true}

  case HIDE_POPUP:
    return {...state, isShown: false}

  default:
    return state;
  }
}
