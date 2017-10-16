const process = function (action, next) {

    const {types, fun, payload = {}} = action;

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
                )
            })
            .catch(error => {
                console.log(payload);
                next({
                            ...action,
                            type: failureType,
                            payload: error,
                        }
                )
            });
};

const promiseMiddleware = () => next => action =>
        action.use === 'promise' ? process(action, next) : next(action);

export default promiseMiddleware;