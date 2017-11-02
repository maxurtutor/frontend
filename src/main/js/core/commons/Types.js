// @flow
'use strict';

export class PromiseAction {

    constructor(fun: () => Promise, requestType: String, successType: String, failureType: String, payload: any) {
        this._requestType = requestType;
        this._successType = successType;
        this._failureType = failureType;
        this._fun = fun;
        this._payload = payload;

        if (typeof fun !== 'function') {
            throw new Error('Expected fun to be a function.')
        }
    }

    get requestType() {
        return this._requestType;
    }
    get successType() {
        return this._successType;
    }
    get failureType() {
        return this._failureType;
    }
    get fun() {
        return this._fun;
    }
    get payload() {
        return this._payload;
    }
}
