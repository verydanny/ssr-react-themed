"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = require("../actions/app");
exports.INITIAL_STATE = Object.freeze({
    app_loaded: false
});
exports.default = (state = exports.INITIAL_STATE, action) => {
    const { type, payload = {} } = action;
    switch (type) {
        case app_1.ActionTypes.APP_LOADED: {
            return {
                ...state,
                app_loaded: true
            };
        }
    }
    return state;
};
