import test from 'ava';
import { configureStore } from './store';
import { requestPostsAction, createPostAction } from './post/actions';
import { PostStateEnum } from '@pyxismedia/lib-model';

const store = configureStore();

test.before(() => {
  store.dispatch(
    createPostAction({
      title: 'Test 1',
      subtitle: 'Subtitle Test 1',
      content: 'Lorem ispum',
      image: '#',
      state: PostStateEnum.DRAFT,
      labels: ['label 1'],
      createdBy: 'Franta',
      section: 'One',
    }),
  );
});

test('should deliver posts', t => {
  store.dispatch(requestPostsAction());
  console.log(store.getState());
  t.deepEqual(store.getState(), { post: {} });
});
