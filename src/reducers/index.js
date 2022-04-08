import { combineReducers } from 'redux';
import user from './user';
import maps from './maps';

const appReducer = combineReducers({
  user,
  maps
});

const rootReducer = (state = {}, action) => {
  return appReducer(state, action);
};

export default rootReducer;
