import {
    GET_PHOTOS_REQUEST,
    GET_PHOTOS_SUCCESS,
    GET_PHOTOS_ERROR
} from '../constants/Page'

export const getPhotos = year => dispatch => {
    dispatch({
        type: GET_PHOTOS_REQUEST,
        payload: year
    });
    new Promise(
            (resolve) => {
                setTimeout(() => {
                    resolve();
                }, 1000)
            }
    ).then(() => {
        dispatch({
            type: GET_PHOTOS_SUCCESS,
            payload: [1, 2, 3, 4, 5]
        })
    }).catch(function (message) {
        dispatch({
            type: GET_PHOTOS_ERROR,
            payload: message
        })
    });

};
