import { combineReducers } from 'redux';
import user from './userReducer';
import login from './loginReducer';
import itemToAdd from './itemToAddReducer';
import onShelf from './shelfReducer';

const store = combineReducers({
  user,
  login,
  itemToAdd,
  onShelf
});

export default store;
