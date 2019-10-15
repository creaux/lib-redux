import { createAction } from 'typesafe-actions';

export enum ToastActions {
  CREATE_TOAST = 'CREATE_TOAST',
}

export class Toast {
  public constructor(public readonly message: string) {}
}

export const createToast = createAction(ToastActions.CREATE_TOAST, action => (toast: Toast) => action(toast));
