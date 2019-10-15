import { combineReducers } from 'redux';
import { postReducer, PostState } from './post/reducer';
import { toastReducer, ToastState } from './toast/reducer';

export interface RootState {
  post: PostState;
  toast: ToastState;
  action: any;
}

export const reducers = combineReducers({
  post: postReducer,
  toast: toastReducer,
  // @ts-ignore
  action: (state = null, action) => action,
});
