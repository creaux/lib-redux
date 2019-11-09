import {
  RequestPostsModel,
  PostModel,
  CreatePostModel,
  PostStateEnum,
  AuthSignInModel,
  DeletePostModel,
} from '@pyxismedia/lib-model';
import postsEnJson from '@pyxismedia/lib-model/build/post/post.en-mock.json';
import {
  requestPostsAction,
  resetPostAction,
  createPostAction,
  PostActions,
  deletePostAction,
} from '../src/post/actions';
import { requestSignInAction, AuthActions, resetAuthAction } from '../src/auth/actions';
import { switchMap } from 'rxjs/operators';
import { resetToastAction, ToastActions } from '../src/toast/actions';
import { configureStore } from '../src/store';
import { Store } from 'redux';
import { Exception } from '../src/exception';
import test from 'ava';

let store: Store;

test.serial.beforeEach(() => {
  store = configureStore();
});

test.serial.afterEach(() => {
  store.dispatch(resetPostAction());
  store.dispatch(resetAuthAction());
  store.dispatch(resetToastAction());
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

test.serial.cb('should respond with error for unaunthentificated user', t => {
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
    if (state.toast) {
      t.deepEqual(state.action.type, 'CREATE_TOAST');
      t.deepEqual(state.toast, { messages: [new Exception('Unauthorized', 401)] });
      t.end();
    } else {
      t.fail('Toast in store does not exist.');
    }
    unsubscribe();
  });
});

test.serial.cb('should create post and deliver it', t => {
  const post = new CreatePostModel(
    'Test 2',
    'Subtitle Test 2',
    'Lorem ispum',
    '#',
    PostStateEnum.DRAFT,
    ['label 1'],
    // TODO: Does Author exists? If not it should raise issue
    '5d9e2c4974146800ea816336',
    // TODO: Does Author exists? If not it should raise issue
    '5d9e2c4974146800ea816336',
  );
  const signIn = new AuthSignInModel({ email: 'karel@vomacka.cz', password: '12345' });
  //@ts-ignore
  store
    .dispatch(requestSignInAction(signIn))
    //@ts-ignore
    .asActionObservable(AuthActions.DELIVER_SIGNIN)
    .pipe(
      //@ts-ignore
      switchMap(() => {
        //@ts-ignore
        return store.dispatch(createPostAction(post)).asActionObservable(PostActions.DELIVER_POST);
      }),
    )
    .subscribe(() => {
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
        store
          .dispatch(deletePostAction(new DeletePostModel(state.post.post.id)))
          //@ts-ignore
          .asActionObservable(ToastActions.CREATE_TOAST)
          .subscribe(() => {
            t.end();
          });
      }
    });
});
