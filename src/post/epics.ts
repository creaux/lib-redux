require('es6-promise').polyfill();
require('isomorphic-fetch');

import { ofType } from 'redux-observable';
import { PostActions, deliverPostsAction, deliverPostAction } from './actions';
import { mergeMap, map } from 'rxjs/operators';
import { PostModel } from '@pyxismedia/lib-model';
import { Observable } from 'rxjs';
import { Action } from '../types';

export const requestPostsEpic = (action$: Observable<PostActions>): Observable<Action<PostActions, PostModel[]>> =>
  action$.pipe(
    ofType(PostActions.REQUEST_POSTS),
    mergeMap(
      async (): Promise<PostModel[]> =>
        await fetch('https://srv-nest.pyxis.media/post').then((res: Response): Promise<PostModel[]> => res.json()),
    ),
    map((posts: PostModel[]): Action<PostActions, PostModel[]> => deliverPostsAction(posts)),
  );

export const createPostEpic = (action$: Observable<PostActions>): Observable<Action<PostActions, PostModel>> =>
  action$.pipe(
    ofType(PostActions.CREATE_POST),
    mergeMap(
      async (): Promise<PostModel> =>
        await fetch('https://srv-nest.pyxis.media/post', {
          method: 'post',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
        }).then((res: Response): Promise<PostModel> => res.json()),
    ),
    map((post: PostModel): Action<PostActions, PostModel> => deliverPostAction(post)),
  );
