import { combineEpics } from 'redux-observable';
import { requestPostsEpic } from './post/epics';

export const rootEpic = combineEpics(
  requestPostsEpic
);