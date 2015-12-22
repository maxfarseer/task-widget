import { combineReducers } from 'redux';
import user from './user';
import widget from './widget';

const rootReducer = combineReducers({
  user,
  widget
});

export default rootReducer;
