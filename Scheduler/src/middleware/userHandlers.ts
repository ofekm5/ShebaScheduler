import { Request, Response, NextFunction } from 'express';
import logger from '../logger';
import jwt from 'jsonwebtoken';

interface iTokenResponse {
    token: string;
}

interface iSignupBody {
    fullName: string;
}
  
interface iUser {
    username?: string;
    password?: string;
}

const loginHandler = (req: Request<{}, {}, {}, iUser>, res: Response, next: NextFunction) => {
    try {
        const username = req.headers['username'] as string | undefined;
        const password = req.headers['password'] as string | undefined;
        const tokenPrivateKey = process.env.TOKEN_PRIVATE_KEY as string;
        
        //if(){ //params not null and details exists in DB
            const payload = {
                userID: '1'
            };
            
            const token = jwt.sign(payload, tokenPrivateKey, { expiresIn: '1h' });
            
            const response: iTokenResponse = {
                token
            };

            logger.info(`${username} logged in successfully`);
            return res.json(response);
        // }
        // else{
// return res.status(401).json({ error: 'wrong userName' });
        // }
    } 
    catch (error) {
        next(error);
    }
}

const signupHandler = (req: Request<{}, {}, iSignupBody, iUser>, res: Response, next: NextFunction) => {
    try {
        const username = req.headers['username'] as string | undefined;
        const password = req.headers['password'] as string | undefined;
        const fullName = req.body.fullName;

        logger.info(`${fullName} signed up successfully`);
        return res.status(201).json({ message: 'User signed up successfully' });
    }
    catch (error) {
        next(error);
    }
}

export {loginHandler, signupHandler};