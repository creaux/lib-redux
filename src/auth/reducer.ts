import * as authActions from './actions';
import { getType, ActionType } from 'typesafe-actions';
import { AuthSuccessModel } from '@pyxismedia/lib-model';

export type AuthActionTypes = ActionType<typeof authActions>;

export interface AuthState extends AuthSuccessModel {}

export const initialState = {
  id: '',
  userId: '',
  token: '',
};

export function authReducer(state: AuthState = initialState, action: AuthActionTypes): AuthState {
  switch (action.type) {
    case getType(authActions.deliverSignInAction):
      return { ...state, ...action.payload };
    case getType(authActions.resetAuthAction):
      return { ...initialState };
    case getType(authActions.requestSignInAction):
    default:
      return { ...state };
  }
}
