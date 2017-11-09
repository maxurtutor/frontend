type ActionType = string | Array<string>;

export class PromiseAction {

    _requestType: string[];
    _successType: string[];
    _failureType: string[];
    _payload: any;
    _fun: () => Promise<any>;

    constructor(fun: () => Promise<any>, requestType: ActionType, successType: ActionType, failureType: ActionType, payload: any) {
        this._requestType = Array.isArray(requestType) ?  requestType : [requestType];
        this._successType = Array.isArray(successType) ?  successType : [successType];
        this._failureType = Array.isArray(failureType) ?  failureType : [failureType];
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
    get fun(): () => Promise<any> {
        return this._fun;
    }
    get payload() {
        return this._payload;
    }
}
