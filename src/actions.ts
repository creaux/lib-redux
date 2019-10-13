import { ActionType } from 'typesafe-actions';
import * as postActions from './post/actions';
import * as toastActions from './toast/actions';

const actions = {
  ...postActions,
  ...toastActions,
};

export type ActionTypes = ActionType<typeof actions>;
