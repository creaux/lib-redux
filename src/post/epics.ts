require('es6-promise').polyfill();
require('isomorphic-fetch');

import { ofType } from "redux-observable";
import { PostActions, deliverPostAction } from './actions';
import { mergeMap, map, tap } from 'rxjs/operators'
import { PostModel } from '@pyxismedia/lib-model/post';

export const requestPostsEpic = action$ => action$.pipe(
  ofType(PostActions.REQUEST_POSTS),
  mergeMap(async (action) => await fetch("https://srv-nest.pyxis.media/post").then(res => res.text())),
  map((posts: PostModel[]) => deliverPostAction(posts))
);

export const createPostEpic = action$ => action$.pipe(
  ofType(PostActions.CREATE_POST),
  mergeMap(async action => await fetch("https://srv-nest.pyxis.media/post", {
    method: "post",
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
  }).then(res => res.text()))
);