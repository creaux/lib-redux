import { Store } from 'redux';
import { RootState } from "../src/reducers";
import { configureStore } from '../src/store';

import { requestSignInAction, resetAuthAction } from '../src/auth/actions';
import { AuthSignInModel, AuthSuccessModel } from '@pyxismedia/lib-model';

describe('auth', () => {
  let store: Store<RootState>;

  beforeEach(() => {
    store = configureStore();
  });

  afterEach(() => {
    store.dispatch(resetAuthAction());
  });

  it('should authentificate user', done => {
    store.dispatch(requestSignInAction(new AuthSignInModel({ email: 'karel@vomacka.cz', password: '12345' })));
    const unsubscribe = store.subscribe(() => {
      const state = store.getState();
      // Following props are unique so we don't know exact values
      // @ts-ignore
      expect(state.auth.id).toBeTruthy();
      // @ts-ignore
      expect(state.auth.createdAt).toBeTruthy();
      // @ts-ignore
      expect(state.auth.token).toBeTruthy();
      // We know exact value
      // @ts-ignore
      expect(state.auth.userId).toBe(AuthSuccessModel.MOCK.userId);
      // To kame sure that schema is not not providing redundant property
      // @ts-ignore
      expect(state.auth._v).toBeFalsy();
      unsubscribe();
      done();
    });
  });
});
