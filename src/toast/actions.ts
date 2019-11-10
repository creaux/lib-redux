import { createAction } from 'typesafe-actions';

export enum ToastActions {
  CREATE_TOAST = 'CREATE_TOAST',
  RESET_TOAST = 'RESET_TOAST',
}

export class Toast {
  public constructor(public readonly message: string | object, public readonly code: number) {}
}

export const createToast = createAction(ToastActions.CREATE_TOAST, action => (toast: Toast) => action(toast));

export const resetToastAction = createAction(ToastActions.RESET_TOAST);
