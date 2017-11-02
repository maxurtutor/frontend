// @flow
'use strict';

import type {Dispatch} from 'redux';

import {
    SHOW_LOADER,
    HIDE_LOADER
} from '../commons/Constants'

import {PromiseAction} from  '../commons/Types'

const process = function (action: PromiseAction, next, store) {

    const {dispatch} = store;

    dispatch({type: SHOW_LOADER});
    next({
        ...action,
        type: action.requestType,
        payload: action.payload
    });

    action.fun().then(
        response => {
            dispatch({
                    ...action,
                    type: action.successType,
                    payload: response
                }
            );
            dispatch({type: HIDE_LOADER});
        })
        .catch(error => {
            console.log(error);
            dispatch({
                    ...action,
                    type: action.failureType,
                    payload: error,
                }
            );
            dispatch({type: HIDE_LOADER});
        });
};

const promiseMiddleware = (store: any) => (next: Dispatch<*>) => (action: any) =>
        (action instanceof PromiseAction) ? process(action, next, store) : next(action);

export default promiseMiddleware;