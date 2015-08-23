import { combineReducers } from 'redux';
import mainstate from './mainstate';
import authPopup from './authPopup';
import user from './user';
import statuses from './statuses';

import widget from './widget';

const rootReducer = combineReducers({
  mainstate,
  authPopup,
  user,
  statuses,
  widget
});

export default rootReducer;
