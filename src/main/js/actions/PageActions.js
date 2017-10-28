// @flow
'use strict';

import {
    GET_PHOTOS_REQUEST,
    GET_PHOTOS_SUCCESS,
    GET_PHOTOS_ERROR
} from '../constants/Page'

import {loadPhotos} from '../services/PhotosService'

// noinspection JSUnusedGlobalSymbols
export const getPhotos = (year: number) => ({
    use: 'promise',
    types: [GET_PHOTOS_REQUEST, GET_PHOTOS_SUCCESS, GET_PHOTOS_ERROR],
    payload: year,
    fun: () => loadPhotos(year)
});


                                