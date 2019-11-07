import { combineEpics, Epic } from 'redux-observable';
import { requestPostsEpic, createPostEpic, deletePostEpic } from './post/epics';
import { ActionTypes } from './actions';
import { RootState } from './reducers';
import { Dependencies } from './middlewares';
import { requestSignInEpic } from './auth/epics';
import { createToastEpic } from './toast/epics';

export type RootEpic = Epic<ActionTypes, ActionTypes, RootState, Dependencies>;

export const rootEpic = combineEpics(
  requestPostsEpic,
  createPostEpic,
  deletePostEpic,
  requestSignInEpic,
  createToastEpic,
);
