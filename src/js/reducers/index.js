import { combineReducers } from 'redux';
import mainstate from './mainstate';
import authPopup from './authPopup';
import user from './user';

import widget from './widget';

const rootReducer = combineReducers({
  mainstate,
  authPopup,
  user,
  widget
});

export default rootReducer;
