///<reference types="webpack-env" />

import { createStore, applyMiddleware } from 'redux'
import { createLogger } from 'redux-logger'
import thunk from 'redux-thunk';
import rootReducer from '../reducers/combine'
import promiseMiddleware from '../core/enhancers/PromiseMiddleware'

export default function configureStore(initialState?: any) {
    const logger = createLogger();
    const store = createStore(
        rootReducer,
        initialState,
        applyMiddleware(thunk, promiseMiddleware, logger));

    if (module.hot) {
        module.hot.accept('../reducers/combine', () => {
           const nextRootReducer = (require('../reducers/combine'));
            store.replaceReducer(nextRootReducer)
        })
    }
    return store
}