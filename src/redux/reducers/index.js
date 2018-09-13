import { combineReducers } from 'redux';
import user from './userReducer';
import login from './loginReducer';
import itemToAdd from './itemToAddReducer';

const store = combineReducers({
  user,
  login,
  itemToAdd
});

export default store;
