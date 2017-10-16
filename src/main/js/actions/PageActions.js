import {
    GET_PHOTOS_REQUEST,
    GET_PHOTOS_SUCCESS,
    GET_PHOTOS_ERROR
} from '../constants/Page'

import {loadPhotos} from '../services/PhotosService'

export const getPhotos = year => ({
    use: 'promise',
    types: [GET_PHOTOS_REQUEST, GET_PHOTOS_SUCCESS, GET_PHOTOS_ERROR],
    payload: year,
    fun: loadPhotos
});


