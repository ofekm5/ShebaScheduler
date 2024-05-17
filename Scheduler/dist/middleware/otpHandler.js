"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const logger_1 = __importDefault(require("../logger"));
const otpHandler = (req, res, next) => {
    try {
        const otp = req.headers['otp'];
        const token = req.headers['token'];
        const tokenPrivateKey = process.env.TOKEN_PRIVATE_KEY;
        try {
            if (!token) {
                throw new Error("invalid token");
            }
            else {
                const decoded = jsonwebtoken_1.default.verify(token, tokenPrivateKey);
                if (otp == "T220397") {
                    logger_1.default.info(`verified user ${decoded.userID} OTP`);
                    return res.json({ otp: 'valid' });
                }
                else {
                    logger_1.default.error(`wrong OTP for ${decoded.userID}`);
                    return res.status(401).json({ error: 'wrong OTP' });
                }
            }
        }
        catch (err) {
            logger_1.default.error(`Invalid or expired token`);
            return res.status(401).json({ error: 'Invalid or expired token' });
        }
    }
    catch (error) {
        next(error);
    }
};
exports.default = otpHandler;
