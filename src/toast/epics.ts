import { RootEpic } from '../epics';
import { filter, tap, switchMap } from 'rxjs/operators';
import { isActionOf, PayloadAction } from 'typesafe-actions';
import { createToast, Toast, ToastActions } from './actions';
import util from 'util';
import { EMPTY } from 'rxjs';

export const createToastEpic: RootEpic = action$ =>
  action$.pipe(
    filter(isActionOf(createToast)),
    tap((toast: PayloadAction<ToastActions.CREATE_TOAST, Toast>) => {
      console.log(util.inspect(toast, false, null, true));
    }),
    switchMap(() => EMPTY),
  );
