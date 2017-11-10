export enum State {
    New,
    Saving,
    Clean,
    Changed,
    Loading,
}

export default class Project {

    private _name: string;
    private _state: State;

    constructor(name: string = 'New Project', state: State = State.New) {
        this._name = name;
        this._state = state;
    }

    get name() {
        return this._name;
    }

    get state() {
        return this._state;
    }

    public isChanged() {
        return this._state === State.Changed || this._state === State.New;
    }

    public isSaving() {
        return this._state === State.Saving;
    }

    public startSave(): Project {
        return new Project(this._name, State.Saving);
    }

    public finishSave(): Project {
        return new Project(this._name, State.Clean);
    }

    public error(): Project {
        return new Project(this._name, State.Changed);
    }
}
