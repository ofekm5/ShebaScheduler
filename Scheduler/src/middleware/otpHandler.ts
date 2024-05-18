import { Request, Response, NextFunction } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import logger from '../logger';

interface iVerifyOTP{
    otp?: string;
    token?: string;
}

const otpHandler = (req: Request<{}, {}, {}, iVerifyOTP>, res: Response, next: NextFunction) => {
    try {
        const otp = req.headers['otp'] as string | undefined;
        const token = req.headers['token'] as string | undefined;
        const tokenPrivateKey = process.env.TOKEN_PRIVATE_KEY as string;

        try {
            if(!token){
                throw new Error("invalid token");
            }
            else{
                const decoded = jwt.verify(token, tokenPrivateKey) as JwtPayload;
                if(otp=="T220397"){
                    logger.info(`verified user ${decoded.userName} OTP`);
                    return res.status(201).json({ message: 'OTP valid' });
                }
                else{
                    logger.error(`wrong OTP for ${decoded.userID}`);
                    return res.status(401).json({ error: 'wrong OTP' });
                }
            }
        } 
        catch (err) {
            logger.error(`Invalid or expired token`);
            return res.status(401).json({ error: 'Invalid or expired token' });
        }
    } 
    catch (error) {
        next(error);
    }
}

export default otpHandler;