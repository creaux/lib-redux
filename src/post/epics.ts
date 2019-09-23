require('es6-promise').polyfill();
require('isomorphic-fetch');

import { ofType } from 'redux-observable';
import {
  PostActions,
  deliverPostsAction,
  deliverPostAction,
  RequestPostActionType,
  DeliverPostsActionType,
} from './actions';
import { mergeMap, map } from 'rxjs/operators';
import { PostModel } from '@pyxismedia/lib-model';
import { Observable } from 'rxjs';
import { CreatePostActionType, DeliverPostActionType } from './actions';
import { API_POST } from '../constants';

export const requestPostsEpic = (action$: Observable<RequestPostActionType>): Observable<DeliverPostsActionType> =>
  action$.pipe(
    ofType(PostActions.REQUEST_POSTS),
    mergeMap(
      async (): Promise<PostModel[]> => {
        return await fetch(API_POST).then((res: Response): Promise<PostModel[]> => res.json());
      },
    ),
    map(
      (posts: PostModel[]): DeliverPostsActionType => {
        return deliverPostsAction(posts);
      },
    ),
  );

export const createPostEpic = (action$: Observable<CreatePostActionType>): Observable<DeliverPostActionType> =>
  action$.pipe(
    ofType(PostActions.CREATE_POST),
    mergeMap(
      async (): Promise<PostModel> =>
        await fetch(API_POST, {
          method: 'post',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
        }).then((res: Response): Promise<PostModel> => res.json()),
    ),
    map((post: PostModel): DeliverPostActionType => deliverPostAction(post)),
  );
