import { Request, Response, NextFunction } from 'express';
import logger from '../logger';
import jwt from 'jsonwebtoken';
import User from '../models/user';
//import Appointment from './models/appointment';

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
        
        //if(){ //params details exists in DB
            const payload = {
                userID: '1'
            };
            
            const token = jwt.sign(payload, tokenPrivateKey, { expiresIn: '1h' });
            
            const response: iTokenResponse = {
                token
            };

            logger.info(`${username} logged in successfully`);
            return res.json(response);
        //}
        //else{
            //return res.status(401).json({ error: 'user do not exist' });
        //}
    } 
    catch (error) {
        next(error);
    }
}

const signupHandler = async (req: Request<{}, {}, iSignupBody, iUser>, res: Response, next: NextFunction) => {
    try {
        const username = req.headers['username'] as string | undefined;
        const password = req.headers['password'] as string | undefined;
        const fullName = req.body.fullName;

        try {
            const user = await User.create({ username, password, fullName });
            logger.info(`${fullName} signed up successfully`);
            return res.status(201).json(user);
            //return res.status(201).json({ message: 'User signed up successfully' });
        } 
        catch (error) {
            return res.status(500).json({ error: 'Failed to create user' });
        }
    }
    catch (error) {
        next(error);
    }
}

export {loginHandler, signupHandler};