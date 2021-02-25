import { combineReducers, Reducer, AnyAction } from 'redux';
import authReducer from '../reducers/authReducer';

const createRootReducer = () =>
  combineReducers({
    auth: authReducer,
  });

export default createRootReducer;
