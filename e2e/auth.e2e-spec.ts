import { store } from '../src/test.pre';
import test from 'ava';
import { requestSignInAction, resetAuthAction } from '../src/auth/actions';
import { AuthSignInModel, AuthSuccessModel } from '@pyxismedia/lib-model';

test.serial.afterEach(() => {
  store.dispatch(resetAuthAction());
});

test.serial.cb('should authentificate user', t => {
  store.dispatch(requestSignInAction(new AuthSignInModel({ email: 'karel@vomacka.cz', password: '12345' })));
  const unsubscribe = store.subscribe(() => {
    const state = store.getState();
    t.log(state.auth);
    // Following props are unique so we don't know exact values
    // @ts-ignore
    t.truthy(state.auth.id);
    // @ts-ignore
    t.truthy(state.auth.createdAt);
    // @ts-ignore
    t.truthy(state.auth.token);
    // We know exact value
    // @ts-ignore
    t.is(state.auth.userId, AuthSuccessModel.MOCK.userId);
    // To kame sure that schema is not not providing redundant property
    // @ts-ignore
    t.falsy(state.auth._v);
    t.end();
    unsubscribe();
  });
});
