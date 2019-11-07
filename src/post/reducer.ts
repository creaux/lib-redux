import * as postActions from './actions';
import { PostModel } from '@pyxismedia/lib-model';
import { getType, ActionType } from 'typesafe-actions';

export type PostActionTypes = ActionType<typeof postActions>;

interface PostsState {
  collection: PostModel[];
  skip: number;
}

export interface PostState {
  posts: PostsState;
  post?: PostModel;
}

const initialState = {
  posts: {
    collection: [],
    skip: 0,
  },
  post: undefined,
};

function posts(state: PostsState, action: PostActionTypes): PostsState {
  switch (action.type) {
    case getType(postActions.requestPostsAction):
      return { ...state, ...action.payload };
    case getType(postActions.deliverPostsAction):
      return { ...state, collection: action.payload };
    default:
      return { ...state };
  }
}

export function postReducer(state: PostState = initialState, action: PostActionTypes): PostState {
  switch (action.type) {
    case getType(postActions.deliverPostsAction):
      return { ...state, posts: posts(state.posts, action) };
    case getType(postActions.deliverPostAction):
      return { ...state, post: action.payload as PostModel };
    case getType(postActions.requestPostsAction):
      return { ...state, posts: posts(state.posts, action) };
    case getType(postActions.resetPostAction):
      return { ...initialState };
    case getType(postActions.createPostAction):
    default:
      return { ...state };
  }
}
