import { combineReducers } from 'redux';
import { postReducer, PostState } from './post/reducer';
import { toastReducer, ToastState } from './toast/reducer';
import { authReducer, AuthState } from './auth/reducer';
import { ActionTypes } from './actions';

export interface RootState {
  post: PostState;
  toast: ToastState;
  auth: AuthState;
  action: ActionTypes;
}

export const reducers = combineReducers({
  post: postReducer,
  toast: toastReducer,
  auth: authReducer,
  // @ts-ignore
  action: (state: ActionTypes, action: ActionTypes) => action,
});
