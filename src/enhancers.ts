import * as middleObject from './middlewares';
import { applyMiddleware } from 'redux';
import { compose } from 'redux';

const { values } = Object;

// @ts-ignore
// const composeEnhancers = (!!window && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;

const middlewares = [...values(middleObject)];

export const enhancers = compose(applyMiddleware(...middlewares));
