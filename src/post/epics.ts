require('es6-promise').polyfill();
require('isomorphic-fetch');

import { PostModel, CreatePostModel } from '@pyxismedia/lib-model';
import { filter, map, mergeMap, catchError } from 'rxjs/operators';
import { isActionOf, PayloadAction } from 'typesafe-actions';
import { API_POST } from '../constants';
import { createPostAction, deliverPostAction, deliverPostsAction, requestPostsAction, PostActions } from './actions';
import { createToast } from '../toast/actions';
import { of } from 'rxjs';
import { RootEpic } from '../epics';

export const requestPostsEpic: RootEpic = (action$, _$, { crud }) =>
  action$.pipe(
    filter(isActionOf(requestPostsAction)),
    mergeMap(
      (data): Promise<PostModel[]> => {
        const url = `${API_POST}?skip=${data.payload.skip}`;
        return crud.get(url);
      },
    ),
    map((posts: PostModel[]) => {
      return deliverPostsAction(posts);
    }),
  );

export const createPostEpic: RootEpic = (action$, _$, { crud }) =>
  action$.pipe(
    filter(isActionOf(createPostAction)),
    mergeMap(
      ({ payload }: PayloadAction<PostActions.CREATE_POST, CreatePostModel>): Promise<PostModel> => {
        return crud.post(API_POST, JSON.stringify(payload));
      },
    ),
    map((post: PostModel) => deliverPostAction(post)),
    catchError(error => of(createToast(error))),
  );
