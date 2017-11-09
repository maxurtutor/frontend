// @flow
'use strict';

type ActionType = string | Array<string>;

export class PromiseAction {

    _requestType: Array<string>;
    _successType: Array<string>;
    _failureType: Array<string>;
    _fun: () => Promise<*>;
    _payload: any;

    static asArray(value: ActionType): Array<string> {
        return Array.isArray(value) ? value : [value];
    }

    constructor(fun: () => Promise<*>, requestType: ActionType, successType: ActionType, failureType: ActionType, payload: any) {
        this._requestType = PromiseAction.asArray(requestType);
        this._successType = PromiseAction.asArray(successType);
        this._failureType = PromiseAction.asArray(failureType);
        this._fun = fun;
        this._payload = payload;

        if (typeof fun !== 'function') {
            throw new Error('Expected fun to be a function.')
        }
    }

    get requestType(): Array<string> {
        return this._requestType;
    }
    get successType(): Array<string> {
        return this._successType;
    }
    get failureType(): Array<string> {
        return this._failureType;
    }
    get fun(): () => Promise<*> {
        return this._fun;
    }
    get payload(): any {
        return this._payload;
    }
}
