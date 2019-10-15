import { createEpicMiddleware } from 'redux-observable';
import { Crud } from './crud';

export interface Dependencies {
  crud: Crud;
}

export const epicMiddleware = createEpicMiddleware({
  dependencies: { crud: new Crud() },
});
