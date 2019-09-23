import { PostActions, PostActionTypes } from './actions';
import { PostModel } from '@pyxismedia/lib-model';

export interface PostState {
  posts?: PostModel[];
  post?: PostModel;
}

const initialState = {
  posts: undefined,
  post: undefined,
};

export function post(state: PostState = initialState, action: PostActionTypes): PostState {
  switch (action.type) {
    case PostActions.DELIVER_POSTS:
      return { ...state, posts: action.payload };
    case PostActions.DELIVER_POST:
      return { ...state, post: action.payload };
    case PostActions.REQUEST_POSTS:
    case PostActions.CREATE_POST:
    default:
      return { ...state };
  }
}
