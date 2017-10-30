// @flow
'use strict';

import {
    SHOW_NEW_DIALOG,
    HIDE_NEW_DIALOG
} from '../constants/Commons'

// noinspection JSUnusedGlobalSymbols
export const showNewDialog = () => ({
    type: SHOW_NEW_DIALOG
});

// noinspection JSUnusedGlobalSymbols
export const hideNewDialog = () => ({
    type: HIDE_NEW_DIALOG
});


