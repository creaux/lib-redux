import { ActionType } from 'typesafe-actions';
import * as postActions from './post/actions';
import * as toastActions from './toast/actions';
import * as authActions from './auth/actions';

const actions = {
  ...postActions,
  ...toastActions,
  ...authActions,
};

export type ActionTypes = ActionType<typeof actions>;
