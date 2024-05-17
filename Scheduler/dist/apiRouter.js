"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const logger_1 = __importDefault(require("./logger"));
const apiRouter = (0, express_1.Router)();
const tokenPrivateKey = 'bunasha';
apiRouter.use((req, res, next) => {
    const { userName = '', password = '', otp = '', token = '' } = Object.assign(Object.assign({}, req.query), req.body);
    if (req.path === '/login' && (!userName || !password)) {
        return res.status(400).json({ error: 'Missing userName or password' });
    }
    else if (req.path === '/verifyOTP' && (!otp || !token)) {
        return res.status(400).json({ error: 'Missing OTP or token' });
    }
    next();
});
apiRouter.get('/login', (req, res, next) => {
    try {
        const { userName, password } = req.query;
        //if(){ //params not null and details exists in DB
        const payload = {
            userID: '1'
        };
        const token = jsonwebtoken_1.default.sign(payload, tokenPrivateKey, { expiresIn: '1h' });
        const response = {
            token
        };
        logger_1.default.info(`${userName} logged in successfully`);
        res.json(response);
        // }
        // else{
        // return res.status(401).json({ error: 'wrong userName' });
        // }
    }
    catch (error) {
        next(error);
    }
});
apiRouter.get('/verifyOTP', (req, res, next) => {
    try {
        const { otp = '', token = '' } = req.query;
        let decoded;
        try {
            decoded = jsonwebtoken_1.default.verify(token, tokenPrivateKey);
        }
        catch (err) {
            logger_1.default.error(`Invalid or expired token`);
            return res.status(401).json({ error: 'Invalid or expired token' });
        }
        if (otp == "T220397") {
            logger_1.default.info(`verified user ${decoded.userID} OTP`);
            return res.json({ otp: 'valid' });
        }
        else {
            logger_1.default.error(`wrong OTP for ${decoded.userID}`);
            return res.status(401).json({ error: 'wrong OTP' });
        }
    }
    catch (error) {
        next(error);
    }
});
exports.default = apiRouter;
