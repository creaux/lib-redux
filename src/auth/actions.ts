import { AuthSignInModel, AuthSuccessModel } from '@pyxismedia/lib-model';
import { createAction } from 'typesafe-actions';

export enum AuthActions {
  REQUEST_SIGNIN = 'REQUEST_SIGNIN',
  DELIVER_SIGNIN = 'DELIVER_SIGNIN',
  RESET_SIGNIN = 'RESET_SIGNIN',
}

export const requestSignInAction = createAction(AuthActions.REQUEST_SIGNIN, action => (payload: AuthSignInModel) =>
  action(payload),
);

export const deliverSignInAction = createAction(AuthActions.DELIVER_SIGNIN, action => (payload: AuthSuccessModel) =>
  action(payload),
);

export const resetAuthAction = createAction(AuthActions.RESET_SIGNIN);
