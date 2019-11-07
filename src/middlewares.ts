import { createEpicMiddleware } from 'redux-observable';
import { Crud } from './crud';
import { BehaviorSubject } from 'rxjs';
import { filter } from 'rxjs/operators';

export interface Dependencies {
  crud: Crud;
}

export const epicMiddleware = createEpicMiddleware({
  dependencies: { crud: new Crud() },
});

//@ts-ignore
export const observableMiddleware = store => next => {
  const subject = new BehaviorSubject(undefined);
  //@ts-ignore
  return action => {
    // Redux is synchronous so this must be just before subject.next method call
    next(action);
    subject.next(store.getState());
    return {
      // @ts-ignore
      asActionObservable(actionType) {
        // @ts-ignore
        return subject.asObservable().pipe(
          filter(state => {
            // @ts-ignore
            return actionType === state.action.type;
          }),
        );
      },
    };
  };
};
