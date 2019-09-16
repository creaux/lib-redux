import { combineReducers } from 'redux';
import { post } from './post/reducer';

export const rootReducer = combineReducers({
  post,
});