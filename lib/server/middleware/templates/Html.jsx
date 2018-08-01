"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const React = __importStar(require("react"));
const server_1 = __importDefault(require("react-dom/server"));
exports.HTML = ({ state, children }) => {
    const content = server_1.default.renderToString(children);
    return (<html lang="en">
      <head>
        
      </head>
      <body>
        <div id="app" dangerouslySetInnerHTML={{ __html: content }}/>
      </body>
    </html>);
};
