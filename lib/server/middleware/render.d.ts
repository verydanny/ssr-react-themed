import * as express from 'express';
import { MyRequest } from '../../types/express';
declare const serverRenderer: () => (req: MyRequest, res: express.Response) => void;
export default serverRenderer;
