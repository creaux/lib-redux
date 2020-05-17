import {
  RequestPostsModel,
  PostModel,
  CreatePostModel,
  PostStateEnum,
  AuthSignInModel,
  DeletePostModel,
} from '@pyxismedia/lib-model';
import postsEnJson from '@pyxismedia/lib-model/post/post.en-mock.json';
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
import { RootState } from "../src/reducers";

describe('post', () => {
  let store: Store<RootState>;

  beforeEach(() => {
    store = configureStore();
  });

  afterEach(() => {
    store.dispatch(resetPostAction());
    store.dispatch(resetAuthAction());
    store.dispatch(resetToastAction());
  });

  it('should deliver posts without skipping', done => {
    store.dispatch(requestPostsAction(new RequestPostsModel(0)));
    const unsubscribe = store.subscribe(() => {
      expect(store.getState().post.posts).toEqual({
        collection: (postsEnJson as unknown) as PostModel[],
        skip: 0,
      });
      unsubscribe();
      done();
    });
  });

  it('should deliver posts and skip by 4', done => {
    const skip = 4;
    store.dispatch(requestPostsAction(new RequestPostsModel(skip)));
    const unsubscribe = store.subscribe(() => {
      const state = store.getState();
      const collection = (postsEnJson.slice(4) as unknown) as PostModel[];
      const expected = {
        collection,
        skip,
      };
      expect(state.post.posts).toEqual(expected);
      unsubscribe();
      done();
    });
  });

  it('should deliver posts and skip by 3', done => {
    const skip = 3;
    store.dispatch(requestPostsAction(new RequestPostsModel(skip)));
    const unsubscribe = store.subscribe(() => {
      const state = store.getState();
      const collection = (postsEnJson.slice(skip) as unknown) as PostModel[];
      const expected = {
        collection,
        skip,
      };
      expect(state.post.posts).toEqual(expected);
      unsubscribe();
      done();
    });
  });

  it('should respond with error for unaunthentificated user', done => {
    const post = new CreatePostModel({
      title: 'Test 1',
      subtitle: 'Subtitle Test 1',
      content: 'Lorem ispum',
      image: '#',
      state: PostStateEnum.DRAFT,
      labels: ['label 1'],
      // TODO: Does Author exists? If not it should raise issue
      createdBy: '5d9e2c4974146800ea816336',
      // TODO: Does Author exists? If not it should raise issue
      section: '5d9e2c4974146800ea816336',
    });
    store.dispatch(createPostAction(post));
    const unsubscribe = store.subscribe(() => {
      const state = store.getState();
      if (state.toast) {
        expect(state.action.type).toEqual('CREATE_TOAST');
        expect(state.toast).toEqual({ messages: [new Exception('Unauthorized', 401)] });
        done();
      }
      unsubscribe();
    });
  });

  it('should create post and deliver it', done => {
    const post = new CreatePostModel({
      title: 'Test 2',
      subtitle: 'Subtitle Test 2',
      content: 'Lorem ispum',
      image: '#',
      state: PostStateEnum.DRAFT,
      labels: ['label 1'],
      // TODO: Does Author exists? If not it should raise issue
      createdBy: '5d9e2c4974146800ea816336',
      // TODO: Does Author exists? If not it should raise issue
      section: '5d9e2c4974146800ea816336',
    });
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
          expect(state.post.post.title).toEqual(expected.title);
          expect(state.post.post.subtitle).toEqual(expected.subtitle);
          expect(state.post.post.content).toEqual(expected.content);
          expect(state.post.post.image).toEqual(expected.image);
          expect(state.post.post.state).toEqual(expected.state);
          expect(state.post.post.labels).toEqual(expected.labels);
          expect(state.post.post.subtitle).toEqual(expected.subtitle);
          expect(state.post.post.createdBy).toEqual(expected.createdBy);
          expect(state.post.post.section).toEqual(expected.section);
          store
            //@ts-ignore
            .dispatch(deletePostAction(new DeletePostModel(state.post.post.id)))
            //@ts-ignore
            .asActionObservable(ToastActions.CREATE_TOAST)
            .subscribe(() => {
              done();
            });
        }
      });
  });

});

