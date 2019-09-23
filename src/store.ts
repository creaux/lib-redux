import { createStore, applyMiddleware, Store } from 'redux';
import { rootReducer, ActionTypes } from './reducers';
import { epicMiddleware } from './middlewares';
import { rootEpic } from './epics';
import { PostState } from './post/reducer';

export interface State {
  post: PostState;
}

export const configureStore = (): Store<State, ActionTypes> & { dispatch: unknown } => {
  const store = createStore(rootReducer, applyMiddleware(epicMiddleware));
  epicMiddleware.run(rootEpic);
  return store;
};
