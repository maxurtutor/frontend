// @flow
'use strict';

export const NEW = 'PROJECT_STATE_NEW';
export const SAVING = 'PROJECT_STATE_SAVING';
export const CLEAN = 'PROJECT_STATE_CLEAN';
export const CHANGED = 'PROJECT_STATE_CHANGED';
export const LOADING = 'PROJECT_STATE_LOADING';

type State = NEW | SAVING | CLEAN | CHANGED | LOADING

export default class Project {

    _name: string;
    _state: State;

    constructor(name: string = 'New Project', state: State = NEW) {
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
        return this._state === CHANGED || this._state === NEW;
    }

    requestSave(): Project {
        return new Project(this._name, SAVING);
    }

    save(): Project {
        return new Project(this._name, CLEAN);
    }

    error(): Project {
        return new Project(this._name, CHANGED);
    }
    
}