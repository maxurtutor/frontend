// @flow
'use strict';

import {
    SHOW_NEW_DIALOG,
    HIDE_NEW_DIALOG,
    SAVE_PROJECT_REQUEST,
    SAVE_PROJECT_SUCCESS,
    SAVE_PROJECT_ERROR
} from '../constants/MainMenu'

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
export const showNewDialog = () => ({
    type: SHOW_NEW_DIALOG
});

// noinspection JSUnusedGlobalSymbols
export const hideNewDialog = () => ({
    type: HIDE_NEW_DIALOG
});


