// @flow
'use strict';

import Project from '../domain/Project';

import {
    CREATE_PROJECT,
    SAVE_PROJECT_REQUEST,
    SAVE_PROJECT_SUCCESS,
    SAVE_PROJECT_ERROR
} from '../constants/MainMenu'

type Action = {
    type: string,
    payload: ?any
}

const initialState: Project = new Project();

export default function project(state: Project = initialState, action: Action): Project {

    switch (action.type) {
        case CREATE_PROJECT:
            return action.payload.project;
        case SAVE_PROJECT_REQUEST:
            return state.requestSave();
        case SAVE_PROJECT_SUCCESS:
            return state.save();
        case SAVE_PROJECT_ERROR:
            return state.error();
        default:
            return state;
    }

}