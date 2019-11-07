import { RootEpic } from '../epics';
import { filter, switchMap, map, catchError } from 'rxjs/operators';
import { isActionOf, PayloadAction } from 'typesafe-actions';
import { requestSignInAction, AuthActions, deliverSignInAction } from './actions';
import { AuthSignInModel } from '@pyxismedia/lib-model';
import { API_AUTH } from '../constants';
import { AuthSuccessModel } from '@pyxismedia/lib-model';
import { createToast } from '../toast/actions';
import { of } from 'rxjs';

export const requestSignInEpic: RootEpic = (action$, _$, { crud }) =>
  action$.pipe(
    filter(isActionOf(requestSignInAction)),
    switchMap(
      ({ payload }: PayloadAction<AuthActions.REQUEST_SIGNIN, AuthSignInModel>): Promise<AuthSuccessModel> => {
        return crud.post(API_AUTH, JSON.stringify(payload));
      },
    ),
    map((auth: AuthSuccessModel) => {
      return deliverSignInAction(auth);
    }),
    catchError(error => {
      return of(createToast(error));
    }),
  );
