// @flow
'use strict';

type State = {
    name: string,
}

const initialState: State = {
    name: 'Аноним'
};

export default function user(state: State = initialState): State {
    return state
}