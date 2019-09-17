import { combineReducers } from 'redux';
import { post } from './post/reducer';
import { PostActionTypes } from './post/actions';

export const rootReducer = combineReducers({
  post,
});

export type ActionTypes = PostActionTypes;
