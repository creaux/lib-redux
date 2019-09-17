import { createStore, applyMiddleware, Store } from 'redux';
import { rootReducer, ActionTypes } from './reducers';
import { epicMiddleware } from './middlewares';
import { rootEpic } from './epics';
import { PostState } from './post/reducer';
import { Action } from './types';

export interface State {
  post: PostState;
}

export const configureStore = (): Store<State, Action<ActionTypes>> & { dispatch: unknown } => {
  const store = createStore(rootReducer, applyMiddleware(epicMiddleware));
  epicMiddleware.run(rootEpic);
  return store;
};
