"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const checkParams = (req, res, next) => {
    const { appoFilter = '', valueFilter = '' } = req.query;
    const { appoDate = '', appoHour = '', appoType = '', fullName = '' } = req.body;
    const username = req.headers['username'];
    const password = req.headers['password'];
    const otp = req.headers['otp'];
    const token = req.headers['token'];
    if (req.path === '/login' || req.path === '/signup') {
        if (!username) {
            return res.status(400).json({ error: 'Missing userName' });
        }
        else if (!password) {
            return res.status(400).json({ error: 'Missing password' });
        }
        else if (req.path === '/signup' && !fullName) {
            return res.status(400).json({ error: 'Missing full name' });
        }
    }
    else if (req.path === '/verifyOTP') {
        if (!otp) {
            return res.status(400).json({ error: 'Missing OTP' });
        }
        else if (!token) {
            return res.status(400).json({ error: 'Missing token' });
        }
    }
    else if (req.path === '/setAppo') {
        if (!appoType) {
            return res.status(400).json({ error: 'Missing appointment type' });
        }
        else if (!appoDate) {
            return res.status(400).json({ error: 'Missing appointment date' });
        }
        else if (!appoHour) {
            return res.status(400).json({ error: 'Missing appointment hour' });
        }
    }
    else if (req.path === '/getAppo') {
        if (!appoFilter) {
            return res.status(400).json({ error: 'Missing appointment filter' });
        }
        else if (!valueFilter) {
            return res.status(400).json({ error: 'Missing value for the filter' });
        }
    }
    next();
};
exports.default = checkParams;