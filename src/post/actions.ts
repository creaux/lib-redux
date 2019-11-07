import { CreatePostModel, PostModel, RequestPostsModel, DeletePostModel } from '@pyxismedia/lib-model';
import { createAction } from 'typesafe-actions';

export enum PostActions {
  REQUEST_POSTS = 'REQUEST_POSTS',
  DELIVER_POSTS = 'DELIVER_POSTS',
  CREATE_POST = 'CREATE_POST',
  DELIVER_POST = 'DELIVER_POST',
  RESET_POST = 'RESET_POST',
  DELETE_POST = 'DELETE_POST',
}

export const createPostAction = createAction(PostActions.CREATE_POST, action => (post: CreatePostModel) =>
  action(post),
);

export const requestPostsAction = createAction(PostActions.REQUEST_POSTS, action => (payload: RequestPostsModel) =>
  action(payload),
);

export const deliverPostsAction = createAction(PostActions.DELIVER_POSTS, action => (payload: PostModel[]) =>
  action(payload),
);

export const deliverPostAction = createAction(PostActions.DELIVER_POST, action => (payload: PostModel) =>
  action(payload),
);

export const deletePostAction = createAction(PostActions.DELETE_POST, action => (payload: DeletePostModel) =>
  action(payload),
);

export const resetPostAction = createAction(PostActions.RESET_POST);
