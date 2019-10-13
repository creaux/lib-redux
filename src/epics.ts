import { combineEpics, Epic } from 'redux-observable';
import { requestPostsEpic, createPostEpic } from './post/epics';
import { ActionTypes } from './actions';
import { RootState } from './reducers';
import { Dependencies } from './middlewares';

export type RootEpic = Epic<ActionTypes, ActionTypes, RootState, Dependencies>;

export const rootEpic = combineEpics(requestPostsEpic, createPostEpic);
