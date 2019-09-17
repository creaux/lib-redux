import { Action as SimpleAction } from 'redux';

export interface Action<T, P = undefined> extends SimpleAction<T> {
  payload?: P;
}
