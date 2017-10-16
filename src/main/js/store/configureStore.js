import { createStore, applyMiddleware } from 'redux'
import { createLogger } from 'redux-logger'
import thunk from 'redux-thunk';
import rootReducer from '../reducers'
import promiseMiddleware from '../enhancers/PromiseMiddleware'

export default function configureStore(initialState) {
    const logger = createLogger();
    const store = createStore(
            rootReducer,
            initialState,
            applyMiddleware(thunk, promiseMiddleware, logger));

    if (module.hot) {
        module.hot.accept('../reducers', () => {
            const nextRootReducer = require('../reducers');
            store.replaceReducer(nextRootReducer)
        })
    }

    return store
}