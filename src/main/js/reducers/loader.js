import {
    SHOW_LOADER,
    HIDE_LOADER
} from '../constants/Commons'

const initialState = {
    fetching: 0
};

export default function loader(state = initialState, action) {

    switch (action.type) {
        case SHOW_LOADER:
            return { ...state, fetching: state.fetching + 1 };
        case HIDE_LOADER:
            return { ...state, fetching: state.fetching - 1 };
        default:
            return state;
    }

}