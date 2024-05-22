import { Request, Response, NextFunction } from 'express';

const checkParams = (req: Request, res: Response, next: NextFunction)=>{
    const { appoDate = '', appoType = ''} = req.body;
    const username = req.headers['username'] as string | undefined;
    const password = req.headers['password'] as string | undefined;
    const otp = req.headers['otp'] as string | undefined;
    const token = req.headers['token'] as string | undefined;

    if (req.path === '/login' || req.path === '/signup') {
        if(!username){
            return res.status(400).json({ error: 'Missing userName' });
        }
        else if(!password){
            return res.status(400).json({ error: 'Missing password' });
        }
    }
    else if (req.path === '/verifyOTP') {
        if(!otp){
            return res.status(400).json({ error: 'Missing OTP' });
        }
        else if(!token){
            return res.status(400).json({ error: 'Missing token' });
        }
    }
    else if (req.path === '/appointment' && req.method=='POST') {
        if(!appoType){
            return res.status(400).json({ error: 'Missing appointment type' });
        }
        else if(!appoDate){
            return res.status(400).json({ error: 'Missing appointment date' });
        }
    }

    next();
}

export default checkParams;