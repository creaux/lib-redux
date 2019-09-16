import { PostModel, CreatePostDto } from '@pyxismedia/lib-model/post'

export class PostActions {
  public static readonly REQUEST_POSTS = "REQUEST_POSTS";
  public static readonly DELIVER_POSTS = "DELIVER_POSTS";
  public static readonly CREATE_POST = "CREATE_POST";
}

export const createPostAction = (post: CreatePostDto) => ({
  type: PostActions.CREATE_POST,
  payload: post
});

export const requestPostsAction = () => ({
  type: PostActions.REQUEST_POSTS
});

export const deliverPostAction = (postModel: PostModel[]) => ({
  type: PostActions.DELIVER_POSTS,
  payload: postModel
});
