"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteAppo = exports.setAppo = exports.getAppo = void 0;
const db_1 = __importDefault(require("../db"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const logger_1 = __importDefault(require("../logger"));
const moment_timezone_1 = __importDefault(require("moment-timezone"));
const deleteAppo = async (req, res, next) => {
    try {
        const appoDate = req.body.appoDate;
        const appoType = req.body.appoType;
        const token = req.headers['token'];
        const userResult = await findUserID(token);
        if (userResult.rows.length === 0) {
            logger_1.default.error('User not found');
            return res.status(404).json({ error: 'User not found' });
        }
        const userID = userResult.rows[0].userID;
        if (appoDate) {
            const parsedDate = moment_timezone_1.default.tz(appoDate, moment_timezone_1.default.ISO_8601, 'Asia/Jerusalem').format('YYYY-MM-DD HH:mm:ss');
            const deleteQuery = `
                DELETE FROM "Appointment"
                WHERE "userID" = $1 AND "date" = $2 AND "testType" = $3
                RETURNING *;
            `;
            const deleteResult = await db_1.default.query(deleteQuery, [userID, parsedDate, appoType]);
            if (deleteResult.rows.length > 0) {
                logger_1.default.info('Appointment deleted successfully');
                res.status(200).json({ message: 'Appointment deleted successfully', appointment: deleteResult.rows[0] });
            }
            else {
                logger_1.default.error('Appointment not found');
                return res.status(404).json({ error: 'Appointment not found' });
            }
        }
        else {
            throw new Error('appoDate invalid');
        }
    }
    catch (error) {
        console.error('Error deleting appointment:', error);
        next(error);
    }
};
exports.deleteAppo = deleteAppo;
const setAppo = async (req, res, next) => {
    try {
        const appoDate = req.body.appoDate;
        const appoType = req.body.appoType;
        const token = req.headers['token'];
        const userResult = await findUserID(token);
        if (userResult.rows.length === 0) {
            logger_1.default.error('User not found');
            return res.status(404).json({ error: 'User not found' });
        }
        const appoRowsinDB = await findAppoRows(appoDate, appoType);
        if (appoRowsinDB > 0) {
            logger_1.default.error('Appointment already taken');
            return res.status(409).json({ error: 'Appointment already taken' });
        }
        const appointmentResult = await insertAppo(userResult.rows[0].userID, appoDate, appoType);
        logger_1.default.info('Appointment created successfully');
        return res.status(201).json({
            message: 'Appointment created successfully',
            appointment: appointmentResult.rows[0],
        });
    }
    catch (error) {
        next(error);
    }
};
exports.setAppo = setAppo;
async function findAppoRows(appoDate, appoType) {
    const appoTakenQuery = `SELECT "appointmentID" FROM "Appointment" WHERE "date" = $1 AND "testType" = $2;`;
    const appoTakenResult = await db_1.default.query(appoTakenQuery, [appoDate, appoType]);
    return appoTakenResult.rows.length;
}
async function findUserID(token) {
    const tokenPrivateKey = process.env.TOKEN_PRIVATE_KEY;
    if (!token) {
        throw new Error("invalid token");
    }
    const decoded = jsonwebtoken_1.default.verify(token, tokenPrivateKey);
    const userQuery = `SELECT "userID" FROM "User" WHERE "userName" = $1;`;
    const userResult = await db_1.default.query(userQuery, [decoded.userName]);
    return userResult;
}
async function insertAppo(userID, appoDate, appoType) {
    const appointmentQuery = `
        INSERT INTO "Appointment" ("userID", "date", "testType")
        VALUES ($1, $2, $3)
        RETURNING *;
    `;
    const appointmentValues = [userID, appoDate, appoType];
    const appointmentResult = await db_1.default.query(appointmentQuery, appointmentValues);
    return appointmentResult;
}
const getAppo = async (req, res, next) => {
    try {
        const token = req.headers['token'];
        const userResult = await findUserID(token);
        if (userResult.rows.length === 0) {
            return res.status(404).json({ error: 'User not found' });
        }
        const userID = userResult.rows[0].userID;
        const appointmentsQuery = `
            SELECT * FROM "Appointment" WHERE "userID" = $1;
        `;
        const appointmentsResult = await db_1.default.query(appointmentsQuery, [userID]);
        if (appointmentsResult.rows.length > 0) {
            res.status(200).json({
                appointments: appointmentsResult.rows,
            });
        }
        else {
            return res.status(404).json({ error: 'Appointments not found' });
        }
    }
    catch (error) {
        next(error);
    }
};
exports.getAppo = getAppo;
