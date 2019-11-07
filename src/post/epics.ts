require('es6-promise').polyfill();
require('isomorphic-fetch');

import { PostModel, CreatePostModel } from '@pyxismedia/lib-model';
import { filter, map, mergeMap, catchError, switchMap, withLatestFrom } from 'rxjs/operators';
import { isActionOf, PayloadAction } from 'typesafe-actions';
import { API_POST } from '../constants';
import {
  createPostAction,
  deliverPostAction,
  deliverPostsAction,
  requestPostsAction,
  PostActions,
  deletePostAction,
} from './actions';
import { createToast, Toast } from '../toast/actions';
import { of } from 'rxjs';
import { RootEpic } from '../epics';
import { RequestPostsModel } from '@pyxismedia/lib-model';
import { DeletePostModel } from '@pyxismedia/lib-model';
import { RootState } from '../reducers';

export const requestPostsEpic: RootEpic = (action$, _$, { crud }) =>
  action$.pipe(
    filter(isActionOf(requestPostsAction)),
    mergeMap(
      ({ payload }: PayloadAction<PostActions.REQUEST_POSTS, RequestPostsModel>): Promise<PostModel[]> => {
        return crud.get(API_POST, { skip: payload.skip });
      },
    ),
    map((posts: PostModel[]) => {
      return deliverPostsAction(posts);
    }),
  );

export const createPostEpic: RootEpic = (action$, state$, { crud }) =>
  action$.pipe(
    filter(isActionOf(createPostAction)),
    switchMap<PayloadAction<PostActions.CREATE_POST, CreatePostModel>, Promise<PostModel>>(
      ({ payload }): Promise<PostModel> => {
        return crud.post(API_POST, JSON.stringify(payload), state$.value.auth.token);
      },
    ),
    map((post: PostModel) => {
      return deliverPostAction(post);
    }),
    catchError(error => {
      return of(createToast(error));
    }),
  );

export const deletePostEpic: RootEpic = (action$, state$, { crud }) =>
  action$.pipe(
    filter(isActionOf(deletePostAction)),
    withLatestFrom(state$),
    switchMap<[PayloadAction<PostActions.DELETE_POST, DeletePostModel>, RootState], Promise<null>>(
      ([{ payload }, state]): Promise<null> => {
        console.log('payload', payload);
        return crud.delete(`${API_POST}/${payload.id}`, state.auth.token);
      },
    ),
    map(() => {
      return createToast(new Toast('Post has been successfully deleted.', 201));
    }),
    catchError(error => {
      return of(createToast(error));
    }),
  );
