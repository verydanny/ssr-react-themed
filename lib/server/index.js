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
const express = __importStar(require("express"));
const cors_1 = __importDefault(require("cors"));
const chalk_1 = __importDefault(require("chalk"));
const path_1 = __importDefault(require("path"));
const body_parser_1 = __importDefault(require("body-parser"));
const store_1 = __importDefault(require("../client/store"));
const paths_1 = __importDefault(require("../../config/paths"));
const render_1 = __importDefault(require("./middleware/render"));
const app = express.default();
if (process.env.NODE_ENV === 'development') {
    app.use(paths_1.default.publicPath, express.static(path_1.default.join(paths_1.default.clientBuild, paths_1.default.publicPath)));
    app.use('/favicon.ico', (req, res) => {
        res.send('');
    });
}
app.use(cors_1.default());
app.use(body_parser_1.default.json());
app.use((req, res, next) => {
    req.store = store_1.default();
    return next();
});
app.use(render_1.default());
app.use((err, _req, res, _next) => {
    return res.status(404).json({
        status: 'error',
        message: err.message,
        stack: 
        // print a nicer stack trace by splitting line breaks and making them array items
        process.env.NODE_ENV === 'development' && (err.stack || '')
            .split('\n')
            .map((line) => line.trim())
            .map((line) => line.split(path_1.default.sep).join('/'))
            .map((line) => line.replace(process
            .cwd()
            .split(path_1.default.sep)
            .join('/'), '.')),
    });
});
app.listen(process.env.PORT || 8500, () => {
    console.log(`[${new Date().toISOString()}]`, chalk_1.default.blue(`App is running: 🌎 http://localhost:${process.env.PORT || 8500}`));
});
exports.default = app;
