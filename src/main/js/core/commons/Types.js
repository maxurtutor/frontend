// @flow
'use strict';

type ActionType = String | Array<String>;

export class PromiseAction {

    constructor(fun: () => Promise, requestType: ActionType, successType: ActionType, failureType: ActionType, payload: any) {
        this._requestType = Array.isArray(requestType) ?  requestType : [requestType];
        this._successType = Array.isArray(successType) ?  successType : [successType];
        this._failureType = Array.isArray(failureType) ?  failureType : [failureType];
        this._fun = fun;
        this._payload = payload;

        if (typeof fun !== 'function') {
            throw new Error('Expected fun to be a function.')
        }
    }

    get requestType(): Array<String> {
        return this._requestType;
    }
    get successType(): Array<String> {
        return this._successType;
    }
    get failureType(): Array<String> {
        return this._failureType;
    }
    get fun(): () => Promise {
        return this._fun;
    }
    get payload() {
        return this._payload;
    }
}
