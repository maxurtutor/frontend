// @flow
'use strict';

import {
    SHOW_LOADER,
    HIDE_LOADER
} from '../constants/Commons'

type State = {
    fetching: number
}

type Action = {
    type: String,
    fetching: number
}

const initialState: State = {
    fetching: 0
};

export default function loader(state: State = initialState, action: Action): State {

    switch (action.type) {
        case SHOW_LOADER:
            return {...state, fetching: state.fetching + 1};
        case HIDE_LOADER:
            return {...state, fetching: state.fetching - 1};
        default:
            return state;
    }

}