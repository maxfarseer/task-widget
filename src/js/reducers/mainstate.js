import {
  LOADING_BEGIN, LOADING_DONE
} from '../constants/Types';

const initialState = {
  loading: false
};

export default function mainstate(state = initialState, action) {
  switch (action.type) {

  case LOADING_BEGIN:
    return { ...state,loading: true }

  case LOADING_DONE:
    return { ...state,loading: false }

  default:
    return state;
  }
}
