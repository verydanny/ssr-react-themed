"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const React = __importStar(require("react"));
const server_1 = require("react-dom/server");
const react_redux_1 = require("react-redux");
const serverRenderer = () => (req, res) => {
    const content = server_1.renderToString(<react_redux_1.Provider store={req.store}>
      
    </react_redux_1.Provider>);
};
exports.default = serverRenderer;
