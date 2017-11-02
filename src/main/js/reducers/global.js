// @flow
'use strict';

import {
    SHOW_LOADER,
    HIDE_LOADER,
} from '../constants/Commons'

import {
    SHOW_NEW_DIALOG,
    HIDE_NEW_DIALOG
} from '../constants/MainMenu'

type State = {
    fetching: number,
    showNewDialog: boolean
}

type ShowLoaderAction = {
    type: String,
    fetching: number
}

type Action = ShowLoaderAction

const initialState: State = {
    fetching: 0,
    showNewDialog: false
};

export default function global(state: State = initialState, action: Action): State {

    switch (action.type) {
        case SHOW_NEW_DIALOG:
            return {...state, showNewDialog: true};
        case HIDE_NEW_DIALOG:
            return {...state, showNewDialog: false};
        case SHOW_LOADER:
            return {...state, fetching: state.fetching + 1};
        case HIDE_LOADER:
            return {...state, fetching: state.fetching - 1};
        default:
            return state;
    }

}