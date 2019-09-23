import { PostModel, CreatePostModel } from '@pyxismedia/lib-model';
import { Action } from '../types';

export enum PostActions {
  REQUEST_POSTS = 'REQUEST_POSTS',
  DELIVER_POSTS = 'DELIVER_POSTS',
  CREATE_POST = 'CREATE_POST',
  DELIVER_POST = 'DELIVER_POST',
}

export type CreatePostActionType = Action<PostActions.CREATE_POST, CreatePostModel>;

export const createPostAction = (post: CreatePostModel): CreatePostActionType => ({
  type: PostActions.CREATE_POST,
  payload: post,
});

export type RequestPostActionType = Action<PostActions.REQUEST_POSTS, undefined>;

export const requestPostsAction = (): RequestPostActionType => ({
  type: PostActions.REQUEST_POSTS,
});

export type DeliverPostsActionType = Action<PostActions.DELIVER_POSTS, PostModel[]>;

export const deliverPostsAction = (postsModel: PostModel[]): DeliverPostsActionType => ({
  type: PostActions.DELIVER_POSTS,
  payload: postsModel,
});

export type DeliverPostActionType = Action<PostActions.DELIVER_POST, PostModel>;

export const deliverPostAction = (postModel: PostModel): DeliverPostActionType => ({
  type: PostActions.DELIVER_POST,
  payload: postModel,
});

export type PostActionTypes =
  | CreatePostActionType
  | RequestPostActionType
  | DeliverPostActionType
  | DeliverPostsActionType;
