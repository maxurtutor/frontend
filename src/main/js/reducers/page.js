// @flow
'use strict';

import {
    GET_PHOTOS_REQUEST,
    GET_PHOTOS_SUCCESS,
    GET_PHOTOS_ERROR
} from '../constants/Page'

type State = {
    year: number,
    photos: Array<any>
}

type Action = {
    type: string,
    payload: any
}

const initialState: State = {
    year: 2016,
    photos: []
};

export default function page(state: State = initialState, action: Action): State {

    switch (action.type) {
        case GET_PHOTOS_REQUEST:
            return {...state, year: action.payload};
        case GET_PHOTOS_SUCCESS:
            return {...state, photos: action.payload};
        case GET_PHOTOS_ERROR:
            return {...state, photos: []};
        default:
            return state;
    }

}