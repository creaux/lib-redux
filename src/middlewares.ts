import { createEpicMiddleware } from 'redux-observable';
import { Crud } from './crud';
import { Subject } from 'rxjs';
import { filter } from 'rxjs/operators';
import { AnyAction } from 'redux';
import { RootState } from './reducers';

export interface Dependencies {
  crud: Crud;
}

export const epicMiddleware = createEpicMiddleware({
  dependencies: { crud: new Crud() },
});

//@ts-ignore
export const observableMiddleware = store => next => {
  const subject = new Subject<RootState>();
  return (action: AnyAction) => {
    // Redux is synchronous so this must be just before subject.next method call
    next(action);
    subject.next(store.getState());
    return {
      asActionObservable(actionType: string) {
        return subject.asObservable().pipe(filter(state => actionType === state.action.type));
      },
    };
  };
};
