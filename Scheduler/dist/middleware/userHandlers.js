"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.signupHandler = exports.loginHandler = void 0;
const logger_1 = __importDefault(require("../logger"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const db_1 = __importDefault(require("../db"));
const loginHandler = async (req, res, next) => {
    try {
        const initialUsername = req.headers['username'];
        const username = initialUsername?.toLowerCase();
        const password = req.headers['password'];
        const tokenPrivateKey = process.env.TOKEN_PRIVATE_KEY;
        const exists = await checkIfExistsInDB(username, password);
        if (!exists) {
            return res.status(401).json({ error: 'Invalid username or password' });
        }
        else {
            const payload = {
                userName: username
            };
            const token = jsonwebtoken_1.default.sign(payload, tokenPrivateKey, { expiresIn: '1h' });
            const response = {
                token
            };
            logger_1.default.info(`${username} logged in successfully`);
            return res.json(response);
        }
    }
    catch (error) {
        next(error);
    }
};
exports.loginHandler = loginHandler;
async function checkIfExistsInDB(username, password) {
    const result = await db_1.default.query('SELECT EXISTS (SELECT 1 FROM "User" WHERE "userName" = $1 AND "userPass" = $2)', [username, password]);
    return result.rows[0].exists;
}
const signupHandler = async (req, res, next) => {
    try {
        const initialUsername = req.headers['username'];
        const username = initialUsername?.toLowerCase();
        const password = req.headers['password'];
        try {
            const exists = await checkIfExistsInDB(username, password);
            if (exists) {
                return res.status(401).json({ error: 'User already exists' });
            }
            else {
                const result = await db_1.default.query('INSERT INTO "User" ("userName", "userPass") VALUES ($1, $2) RETURNING *', [username, password]);
                logger_1.default.info(`${username} signed up successfully`);
                return res.json(result.rows[0]);
            }
        }
        catch (error) {
            return res.status(500).json({ error: 'Failed to create user' });
        }
    }
    catch (error) {
        next(error);
    }
};
exports.signupHandler = signupHandler;
