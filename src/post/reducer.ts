import { PostActions } from './actions';

const initialState = {};

export function post(state = initialState, action: any) {
  switch(action.type) {
    case PostActions.DELIVER_POSTS:
      return { ...state, posts: action.payload };
    case PostActions.REQUEST_POSTS:
    case PostActions.CREATE_POST:
    default:
      return { ...state };
  }
}
