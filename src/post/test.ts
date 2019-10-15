import { RequestPostsModel, PostModel, CreatePostModel, PostStateEnum } from '@pyxismedia/lib-model';
import postsEnJson from '@pyxismedia/lib-model/build/post/post.en-mock.json';
import test from 'ava';
import { configureStore } from '../store';
import { requestPostsAction, resetPostAction, createPostAction } from './actions';

const store = configureStore();

test.serial.beforeEach(() => {
  store.dispatch(resetPostAction());
});

test.serial.cb('should deliver posts without skipping', t => {
  store.dispatch(requestPostsAction(new RequestPostsModel(0)));
  const unsubscribe = store.subscribe(() => {
    t.deepEqual(store.getState().post.posts, {
      collection: (postsEnJson as unknown) as PostModel[],
      skip: 0,
    });
    unsubscribe();
    t.end();
  });
});

test.serial.cb('should deliver posts and skip by 4', t => {
  const skip = 4;
  store.dispatch(requestPostsAction(new RequestPostsModel(skip)));
  const unsubscribe = store.subscribe(() => {
    const state = store.getState();
    const collection = (postsEnJson.slice(4) as unknown) as PostModel[];
    const expected = {
      collection,
      skip,
    };
    t.deepEqual(state.post.posts, expected);
    unsubscribe();
    t.end();
  });
});

test.serial.cb('should deliver posts and skip by 3', t => {
  const skip = 3;
  store.dispatch(requestPostsAction(new RequestPostsModel(skip)));
  const unsubscribe = store.subscribe(() => {
    const state = store.getState();
    const collection = (postsEnJson.slice(skip) as unknown) as PostModel[];
    const expected = {
      collection,
      skip,
    };
    t.deepEqual(state.post.posts, expected);
    unsubscribe();
    t.end();
  });
});

test.serial.cb('should create post and deliver it', t => {
  const post = new CreatePostModel(
    'Test 1',
    'Subtitle Test 1',
    'Lorem ispum',
    '#',
    PostStateEnum.DRAFT,
    ['label 1'],
    // TODO: Does Author exists? If not it should raise issue
    '5d9e2c4974146800ea816336',
    // TODO: Does Author exists? If not it should raise issue
    '5d9e2c4974146800ea816336',
  );
  store.dispatch(createPostAction(post));
  const unsubscribe = store.subscribe(() => {
    const state = store.getState();
    const expected = { ...post };
    if (state.post.post) {
      t.is(state.post.post.title, expected.title);
      t.is(state.post.post.subtitle, expected.subtitle);
      t.is(state.post.post.content, expected.content);
      t.is(state.post.post.image, expected.image);
      t.is(state.post.post.state, expected.state);
      t.deepEqual(state.post.post.labels, expected.labels);
      t.is(state.post.post.subtitle, expected.subtitle);
      t.is(state.post.post.createdBy, expected.createdBy);
      t.is(state.post.post.section, expected.section);
    }
    unsubscribe();
    t.end();
  });
});
