import * as authActions from './actions';
import { getType, ActionType } from 'typesafe-actions';
import { AuthSuccessModel, LocationEnum, LanguageEnum, L10nModel } from '@pyxismedia/lib-model';

export type AuthActionTypes = ActionType<typeof authActions>;

export interface AuthState extends AuthSuccessModel {}

export const initialState = {
  id: '',
  user: {
    id: '5dc84787046b05067ec1adc5',
    forname: 'Frantisek',
    surname: 'Votrapa',
    email: 'frantisek@votrapa.cz',
    password: '12345',
    roles: [
      {
        id: '5dc84787046b05067ec1adc5',
        name: 'Executive',
      },
    ],
    l10n: new L10nModel({
      language: LanguageEnum.EN,
      location: LocationEnum.US,
    }),
  },
  token: '',
  createdAt: ''
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
