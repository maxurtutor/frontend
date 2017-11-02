// @flow
'use strict';

import type {Dispatch} from 'redux';

import {PromiseAction} from  '../commons/Types'

const process = function (action: PromiseAction, next, store) {

    const {dispatch} = store;

    action.requestType.forEach(
            type => dispatch({
                ...action,
                type: type,
                payload: action.payload
            }));

    action.fun().then(
        response => {
            action.successType.forEach(
                    type => dispatch({
                        ...action,
                        type: type,
                        payload: response
                    }));
        })
        .catch(error => {
            console.log(error);
            action.failureType.forEach(
                    type => dispatch({
                        ...action,
                        type: type,
                        payload: error
                    }));
        });
};

const promiseMiddleware = (store: any) => (next: Dispatch<*>) => (action: any) =>
        (action instanceof PromiseAction) ? process(action, next, store) : next(action);

export default promiseMiddleware;