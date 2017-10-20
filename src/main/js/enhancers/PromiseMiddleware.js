import {
    SHOW_LOADER,
    HIDE_LOADER
} from '../constants/Commons'


const process = function (action, next, store) {

    const {types, fun, payload = {}} = action;
    const {dispatch} = store;

    if (!types ||
        !Array.isArray(types) ||
        types.length !== 3 ||
        !types.every(type => typeof type === 'string')
    ) {
        throw new Error('Expected an array of three string types.')
    }

    const [requestType, successType, failureType] = types;

    if (typeof fun !== 'function') {
        throw new Error('Expected fun to be a function.')
    }

    dispatch({type: SHOW_LOADER});
    next({
        ...action,
        type: requestType,
        payload: payload
    });

    fun().then(
        response => {
            next({
                    ...action,
                    type: successType,
                    payload: response
                }
            );
            dispatch({type: HIDE_LOADER});
        })
        .catch(error => {
            console.log(payload);
            next({
                    ...action,
                    type: failureType,
                    payload: error,
                }
            );
            dispatch({type: HIDE_LOADER});
        });
};

const promiseMiddleware = (store) => next => action =>
    action.use === 'promise' ? process(action, next, store) : next(action);

export default promiseMiddleware;