// @flow
'use strict';

import {
    CREATE_PROJECT,
    SAVE_PROJECT_REQUEST,
    SAVE_PROJECT_SUCCESS,
    SAVE_PROJECT_ERROR,
} from '../constants/MainMenu'

import Project from '../domain/Project'

import {PromiseAction} from '../core/commons/Types'

import {saveProject} from '../services/ProjectService'

// noinspection JSUnusedGlobalSymbols
export const save : () => PromiseAction =
        () => new PromiseAction(
                    () => saveProject(),
                    SAVE_PROJECT_REQUEST,
                    SAVE_PROJECT_SUCCESS,
                    SAVE_PROJECT_ERROR,
                    {}
            );

// noinspection JSUnusedGlobalSymbols
export const create = (project: Project) => ({type: CREATE_PROJECT, payload: {project} });

