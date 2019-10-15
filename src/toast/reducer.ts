import { ActionType } from 'typesafe-actions';
import * as toastActions from './actions';
import { Toast, ToastActions } from './actions';

export type ToastActionTypes = ActionType<typeof toastActions>;

export interface ToastState {
  messages: Toast[];
}

const initialState = {
  messages: [],
};

export function toastReducer(state: ToastState = initialState, action: ToastActionTypes) {
  switch (action.type) {
    case ToastActions.CREATE_TOAST:
      return { ...state, messages: [...state.messages, action.payload] };
    default:
      return { ...state };
  }
}
