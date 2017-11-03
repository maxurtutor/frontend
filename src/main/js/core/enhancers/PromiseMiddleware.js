// @flow
'use strict';

import type {Dispatch} from 'redux';

import {PromiseAction} from '../commons/Types'

const spread = (dispatch: Dispatch<*>, types: Array<string>, payload: any) => {
    types.forEach(
            type => dispatch({
                type: type,
                payload: payload
            }));
};

const process = (action: PromiseAction, next, {dispatch}) => {

    spread(dispatch, action.requestType, action, action.payload);

    action.fun()
            .then(response => {
                spread(dispatch, action.successType, response);
            })
            .catch(error => {
                console.log(error);
                spread(dispatch, action.failureType, error);
            });
};

const promiseMiddleware = (store: any) => (next: Dispatch<*>) => (action: any) =>
        (action instanceof PromiseAction) ? process(action, next, store) : next(action);

export default promiseMiddleware;