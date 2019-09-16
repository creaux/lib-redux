import { createStore, applyMiddleware } from 'redux';
import { rootReducer } from './reducers';
import { epicMiddleware } from './middlewares';
import { rootEpic } from './epics';

export const configureStore = () => {
  const store = createStore(
    rootReducer,
    applyMiddleware(epicMiddleware)
  );

  epicMiddleware.run(rootEpic);

  return store;
};