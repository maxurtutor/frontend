// @flow
'use strict';

import {
    GET_PHOTOS_REQUEST,
    GET_PHOTOS_SUCCESS,
    GET_PHOTOS_ERROR
} from '../constants/Page'

import {PromiseAction} from '../core/commons/Types'

import {loadPhotos} from '../services/PhotosService'

// noinspection JSUnusedGlobalSymbols
export const getPhotos: (number) => PromiseAction = (year: number) =>
        new PromiseAction(
                () => loadPhotos(year),
                GET_PHOTOS_REQUEST,
                GET_PHOTOS_SUCCESS,
                GET_PHOTOS_ERROR,
                year
        );



                                