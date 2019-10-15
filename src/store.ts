import { createStore, Store } from 'redux';
import { reducers, RootState } from './reducers';
import { epicMiddleware } from './middlewares';
import { rootEpic } from './epics';
import { enhancers } from './enhancers';
import { ActionTypes } from './actions';

export const configureStore = (initialState?: RootState): Store<RootState, ActionTypes> => {
  const store = createStore(reducers, initialState, enhancers);
  // @ts-ignore
  epicMiddleware.run(rootEpic);
  return store;
};
