export enum State {
    New,
    Saving,
    Clean,
    Changed,
    Loading
}

export default class Project {

    _name: string;
    _state: State;

    constructor(name: string = "New Project", state: State = State.New) {
        this._name = name;
        this._state = state;
    }

    get name() {
        return this._name;
    }

    get state() {
        return this._state;
    }

    isChanged() {
        return this._state === State.Changed || this._state === State.New;
    }

    startSave(): Project {
        return new Project(this._name, State.Saving);
    }

    finishSave(): Project {
        return new Project(this._name, State.Clean);
    }

    error(): Project {
        return new Project(this._name, State.Changed);
    }

}