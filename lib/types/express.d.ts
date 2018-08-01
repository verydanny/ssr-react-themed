import * as express from 'express';
import { Store } from 'redux';
export interface MyRequest extends express.Request {
    store: Store<any>;
}
