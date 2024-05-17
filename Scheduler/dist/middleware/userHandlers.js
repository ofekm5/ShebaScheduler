"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.signupHandler = exports.loginHandler = void 0;
const logger_1 = __importDefault(require("../logger"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const loginHandler = (req, res, next) => {
    try {
        const username = req.headers['username'];
        const password = req.headers['password'];
        const tokenPrivateKey = process.env.TOKEN_PRIVATE_KEY;
        //if(){ //params not null and details exists in DB
        const payload = {
            userID: '1'
        };
        const token = jsonwebtoken_1.default.sign(payload, tokenPrivateKey, { expiresIn: '1h' });
        const response = {
            token
        };
        logger_1.default.info(`${username} logged in successfully`);
        return res.json(response);
        // }
        // else{
        // return res.status(401).json({ error: 'wrong userName' });
        // }
    }
    catch (error) {
        next(error);
    }
};
exports.loginHandler = loginHandler;
const signupHandler = (req, res, next) => {
    try {
        const username = req.headers['username'];
        const password = req.headers['password'];
        const fullName = req.body.fullName;
        logger_1.default.info(`${fullName} signed up successfully`);
        return res.status(201).json({ message: 'User signed up successfully' });
    }
    catch (error) {
        next(error);
    }
};
exports.signupHandler = signupHandler;
