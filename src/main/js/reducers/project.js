// @flow
'use strict';

import {
    NEW,
    SAVING,
    CLEAN,
    CHANGED,
    LOADING,
} from '../constants/Project'

import {
    SAVE_PROJECT_REQUEST,
    SAVE_PROJECT_SUCCESS,
    SAVE_PROJECT_ERROR
} from '../constants/MainMenu'

type State = {
    name: string,
    state: NEW | SAVING | CLEAN | CHANGED | LOADING
}

type Action = {
}

const initialState: State = {
    name: 'New Project',
    state: NEW
};

export default function project(state: State = initialState, action: Action): State {

    switch (action.type) {
        case SAVE_PROJECT_REQUEST:
            return {...state, state: SAVING};
        case SAVE_PROJECT_SUCCESS:
            return {...state, state: CLEAN};
        case SAVE_PROJECT_ERROR:
            return {...state, state: CHANGED};
        default:
            return state;
    }

}