type ActionType = string | string[];

export class PromiseAction {

    private _requestType: string[];
    private _successType: string[];
    private _failureType: string[];
    private _payload: any;
    private _fun: () => Promise<any>;

    constructor(fun: () => Promise<any>,
                requestType: ActionType,
                successType: ActionType,
                failureType: ActionType,
                payload: any) {
        this._requestType = Array.isArray(requestType) ? requestType : [requestType];
        this._successType = Array.isArray(successType) ? successType : [successType];
        this._failureType = Array.isArray(failureType) ? failureType : [failureType];
        this._fun = fun;
        this._payload = payload;

        if (typeof fun !== 'function') {
            throw new Error('Expected fun to be a function.');
        }
    }

    get requestType(): string[] {
        return this._requestType;
    }

    get successType(): string[] {
        return this._successType;
    }

    get failureType(): string[] {
        return this._failureType;
    }

    get fun(): () => Promise<any> {
        return this._fun;
    }

    get payload() {
        return this._payload;
    }
}
