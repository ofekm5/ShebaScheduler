import { Router, Request, Response, NextFunction } from 'express';
import checkParams from './checkParams';
import {loginHandler, signupHandler} from './userHandlers';
import otpHandler from './otpHandler';

const apiRouter = Router();

apiRouter.use(checkParams);
apiRouter.get('/login', loginHandler);
apiRouter.get('/verifyOTP', otpHandler);
// apiRouter.post('/setAppo', setAppo);
// apiRouter.get('/getAppo', getAppo);
apiRouter.post('/signup', signupHandler);

export default apiRouter;