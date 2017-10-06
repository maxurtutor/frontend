import {
    GET_PHOTOS_REQUEST,
    GET_PHOTOS_SUCCESS,
    GET_PHOTOS_ERROR
} from '../constants/Page'

const initialState = {
    year: 2016,
    photos: [],
    fetching: false
};

export default function page(state = initialState, action) {

    switch (action.type) {
        case GET_PHOTOS_REQUEST:
            return { ...state, year: action.payload, fetching: true };

        case GET_PHOTOS_SUCCESS:
            return { ...state, photos: action.payload, fetching: false };

        case GET_PHOTOS_ERROR:
            return { ...state, photos: [], fetching: false };
        default:
            return state;
    }

}