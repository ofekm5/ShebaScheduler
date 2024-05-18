import { Request, Response, NextFunction } from 'express';
import logger from '../logger';
import jwt from 'jsonwebtoken';
import pool from '../db';

interface iTokenResponse {
    token: string;
}
  
interface iUser {
    username?: string;
    password?: string;
}

const loginHandler = async (req: Request<{}, {}, {}, iUser>, res: Response, next: NextFunction) => {
    try {
        const username = req.headers['username'] as string | undefined;
        const password = req.headers['password'] as string | undefined;
        const tokenPrivateKey = process.env.TOKEN_PRIVATE_KEY as string;

        const result = await pool.query(
            'SELECT EXISTS (SELECT 1 FROM "User" WHERE "userName" = $1 AND "userPass" = $2)',
            [username, password]
        );

        const exists = result.rows[0].exists;

        if (!exists) {
            return res.status(401).json({ error: 'Invalid username or password' });
        }

        const payload = {
            userName: username
        };

        const token = jwt.sign(payload, tokenPrivateKey, { expiresIn: '1h' });

        const response: iTokenResponse = {
            token
        };

        logger.info(`${username} logged in successfully`);

        return res.json(response);
    } catch (error) {
        next(error);
    }
};

const signupHandler = async (req: Request<{}, {}, {}, iUser>, res: Response, next: NextFunction) => {
    try {
        const username = req.headers['username'] as string | undefined;
        const password = req.headers['password'] as string | undefined;

        try {
            const result = await pool.query(
                'INSERT INTO "User" ("userName", "userPass") VALUES ($1, $2) RETURNING *',
                [username, password]
              );
              
            logger.info(`${username} signed up successfully`);
            return res.json(result.rows[0]);
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