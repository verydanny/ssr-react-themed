export declare const configureStore: ({ initialState, middleware }?: {
    initialState?: {} | undefined;
    middleware?: never[] | undefined;
}) => import("redux").Store<{
    app: import("./reducers/appReducer").AppState;
    router: import("react-router-redux").RouterState;
}, import("redux").AnyAction>;
export default configureStore;
