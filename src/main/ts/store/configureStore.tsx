/// <reference types="webpack-env" />

import { applyMiddleware, createStore } from "redux";
import { createLogger } from "redux-logger";
import thunk from "redux-thunk";
import promiseMiddleware from "../core/enhancers/PromiseMiddleware";
import rootReducer from "../reducers/combine";

export default function configureStore(initialState?: any) {
    const logger = createLogger();
    const store = createStore(
        rootReducer,
        initialState,
        applyMiddleware(thunk, promiseMiddleware, logger));

    if (module.hot) {
        module.hot.accept("../reducers/combine", () => {
           const nextRootReducer = (require("../reducers/combine"));
           store.replaceReducer(nextRootReducer);
        });
    }
    return store;
}
