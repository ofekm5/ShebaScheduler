import { Router } from 'express';
import checkParams from './checkParams';
import {loginHandler, signupHandler} from './userHandlers';
import otpHandler from './otpHandler';
import {setAppo, getAppo, deleteAppo} from './manageAppo';

const apiRouter = Router();

apiRouter.use(checkParams);
apiRouter.get('/login', loginHandler);
apiRouter.get('/verifyOTP', otpHandler);
apiRouter.post('/appointment', setAppo);
apiRouter.get('/appointment', getAppo);
apiRouter.delete('/appointment', deleteAppo);
apiRouter.post('/signup', signupHandler);

export default apiRouter;