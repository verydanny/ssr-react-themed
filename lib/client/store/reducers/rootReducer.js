"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const redux_1 = require("redux");
const react_router_redux_1 = require("react-router-redux");
const appReducer_1 = __importDefault(require("./appReducer"));
const rootReducer = redux_1.combineReducers({
    app: appReducer_1.default,
    router: react_router_redux_1.routerReducer,
});
exports.default = rootReducer;
