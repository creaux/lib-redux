import { Action as SimpleAction } from 'redux';

export interface Action<T, P> extends SimpleAction<T> {
  payload?: P;
}
