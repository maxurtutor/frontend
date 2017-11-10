export default class User {

    private _name: string;
    private _isAuthorized: boolean;

    constructor(name: string = 'Anonymous', isAuthorized: boolean = false) {
        this._name = name;
        this._isAuthorized = isAuthorized;
    }

    get name() {
        return this._name;
    }

    get isAuthorized() {
        return this._isAuthorized;
    }
}
