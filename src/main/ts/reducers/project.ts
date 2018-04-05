import Project from '../domain/Project';

import {
    CREATE_PROJECT,
    SAVE_PROJECT_ERROR,
    SAVE_PROJECT_REQUEST,
    SAVE_PROJECT_SUCCESS,
} from '../constants/project';

interface Action {
    type: string;
    payload?: any;
}

const initialState: Project = new Project();

export default function reducer(project: Project = initialState, action: Action): Project {

    switch (action.type) {
        case CREATE_PROJECT:
            return action.payload.project;
        case SAVE_PROJECT_REQUEST:
            return project.startSave();
        case SAVE_PROJECT_SUCCESS:
            return project.finishSave();
        case SAVE_PROJECT_ERROR:
            return project.error();
        default:
            return project;
    }
}
