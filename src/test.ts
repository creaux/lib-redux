import test from 'ava';
import { configureStore } from './store';
import { requestPostsAction, createPostAction } from './post/actions';
import { PostStateEnum, CreatePostModel, SectionSchema } from '@pyxismedia/lib-model';
import postsJson from '@pyxismedia/lib-model/build/post/post.data.json';
import postsEnJson from '@pyxismedia/lib-model/build/post/post.en-mock.json';
import { Types } from 'mongoose';
import { PostModel } from '@pyxismedia/lib-model';

const store = configureStore();
let posts: PostModel[];

test.before(() => {
  store.dispatch(
    createPostAction(
      new CreatePostModel(
        'Test 1',
        'Subtitle Test 1',
        'Lorem ispum',
        '#',
        PostStateEnum.DRAFT,
        ['label 1'],
        Types.ObjectId(),
        Types.ObjectId(),
      ),
    ),
  );
});

test.cb('should deliver posts', t => {
  store.dispatch(requestPostsAction());
  store.subscribe(() => {
    t.deepEqual(store.getState(), {
      post: {
        post: undefined,
        posts: postsEnJson,
      },
    });
    t.end();
  });
});
