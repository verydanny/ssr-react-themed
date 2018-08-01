"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const redux_1 = require("redux");
const rootReducer_1 = __importDefault(require("./reducers/rootReducer"));
exports.configureStore = ({ initialState = {}, middleware = [] } = {}) => {
    const devtools = typeof window !== 'undefined' &&
        typeof window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ === 'function' &&
        window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({ actionsBlacklist: [] });
    const composeEnhancers = devtools || redux_1.compose;
    const store = redux_1.createStore(rootReducer_1.default, initialState, composeEnhancers);
    if (process.env.NODE_ENV !== 'production') {
        if (module.hot) {
            module.hot.accept('./reducers/rootReducer', () => store.replaceReducer(require('./reducers/rootReducer').default));
        }
    }
    return store;
};
exports.default = exports.configureStore;
