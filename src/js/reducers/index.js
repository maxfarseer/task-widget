import { combineReducers } from 'redux';
import user from './user';
import mainpage from './mainpage';

const rootReducer = combineReducers({
  user,
  mainpage
});

export default rootReducer;
