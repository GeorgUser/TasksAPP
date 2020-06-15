import { createStore, applyMiddleware, compose } from "redux"
import reduser from "../reducers"
import { createLogger } from "redux-logger";
import thunk from 'redux-thunk';

const logger = createLogger({
    collapsed: true,
});

const middleware = [thunk, logger];

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
    reduser,
    composeEnhancers(applyMiddleware(...middleware)),
);

export default store;