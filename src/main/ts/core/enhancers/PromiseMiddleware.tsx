import {PromiseAction} from '../commons/Types'
import {Dispatch} from "react-redux";

const spread = (dispatch: Dispatch<any>, types: Array<string>, payload: any) => {
    types.forEach(
        type => dispatch({
            type: type,
            payload: payload
        }));
};

const process = (action: PromiseAction, next: Dispatch<any>, {dispatch}: { dispatch: Dispatch<any> }) => {

    spread(dispatch, action.requestType, action.payload);

    action.fun()
        .then(response => {
            spread(dispatch, action.successType, response);
        })
        .catch(error => {
            console.log(error);
            spread(dispatch, action.failureType, error);
        });
};

const promiseMiddleware = (store: any) => (next: Dispatch<any>) => (action: any) =>
    (action instanceof PromiseAction) ? process(action, next, store) : next(action);

export default promiseMiddleware;