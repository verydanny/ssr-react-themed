declare const rootReducer: import("redux").Reducer<{
    app: import("./appReducer").AppState;
    router: import("react-router-redux").RouterState;
}, import("redux").AnyAction>;
export default rootReducer;
