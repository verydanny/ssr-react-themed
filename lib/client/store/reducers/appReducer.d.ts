export interface AppState {
    app_loaded: boolean;
}
export declare const INITIAL_STATE: Readonly<{
    app_loaded: boolean;
}>;
declare const _default: (state: AppState | undefined, action: {
    type: string;
    payload?: any;
}) => AppState;
export default _default;
