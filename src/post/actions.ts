import { PostModel, CreatePostModel } from '@pyxismedia/lib-model';
import { Action } from '../types';

export class PostActions {
  public static readonly REQUEST_POSTS = 'REQUEST_POSTS';
  public static readonly DELIVER_POSTS = 'DELIVER_POSTS';
  public static readonly CREATE_POST = 'CREATE_POST';
  public static readonly DELIVER_POST = 'DELIVER_POST';
}

export const createPostAction = (post: CreatePostModel): Action<PostActions, CreatePostModel> => ({
  type: PostActions.CREATE_POST,
  payload: post,
});

export const requestPostsAction = (): Action<PostActions> => ({
  type: PostActions.REQUEST_POSTS,
});

export const deliverPostsAction = (postsModel: PostModel[]): Action<PostActions, PostModel[]> => ({
  type: PostActions.DELIVER_POSTS,
  payload: postsModel,
});

export const deliverPostAction = (postModel: PostModel): Action<PostActions, PostModel> => ({
  type: PostActions.DELIVER_POST,
  payload: postModel,
});

export type PostActionTypes = PostModel & PostModel[] & CreatePostModel;
