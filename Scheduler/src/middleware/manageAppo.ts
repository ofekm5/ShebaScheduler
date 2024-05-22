import { Request, Response, NextFunction } from 'express';
import pool from '../db';
import jwt, { JwtPayload } from 'jsonwebtoken';
import logger from '../logger';

interface iSetAppo{
    appoDate?: string; 
    appoType?: string;
}

interface iToken{
    token?:string;
}


const setAppo = async (req: Request<{}, {}, iSetAppo, iToken>, res: Response, next: NextFunction) => {
    try {
        const appoDate = req.body.appoDate;
        const appoType = req.body.appoType;
        const token = req.headers['token'] as string | undefined;
        
        const userResult = await findUserID(token);
        if (userResult.rows.length === 0) {
            logger.error('User not found');
            return res.status(404).json({ error: 'User not found' });
        }

        const appoRowsinDB = await findAppoRows(appoDate, appoType);
        if (appoRowsinDB > 0) {
            logger.error('Appointment already taken');
            return res.status(409).json({ error: 'Appointment already taken' });
        }
  
        const appointmentResult = await insertAppo(userResult.rows[0].userID, appoDate, appoType);
    
        logger.info('Appointment created successfully');
        return res.status(201).json({
            message: 'Appointment created successfully',
            appointment: appointmentResult.rows[0],
        });
    }
    catch (error) {
        next(error);
    }
}

async function findAppoRows(appoDate:string | undefined, appoType:string | undefined) {
    const appoTakenQuery = `SELECT "appointmentID" FROM "Appointment" WHERE "date" = $1 AND "testType" = $2;`;
    const appoTakenResult = await pool.query(appoTakenQuery, [appoDate, appoType]);
    return appoTakenResult.rows.length;
}

async function findUserID(token:string | undefined){
    const tokenPrivateKey = process.env.TOKEN_PRIVATE_KEY as string;

    if(!token){
        throw new Error("invalid token");
    }
    const decoded = jwt.verify(token, tokenPrivateKey) as JwtPayload;
    const userQuery = `SELECT "userID" FROM "User" WHERE "userName" = $1;`;

    const userResult = await pool.query(userQuery, [decoded.userName]);

    return userResult;
}

async function insertAppo(userID:string | undefined, appoDate:string | undefined, appoType:string | undefined) {
    const appointmentQuery = `
        INSERT INTO "Appointment" ("userID", "date", "testType")
        VALUES ($1, $2, $3)
        RETURNING *;
    `;
    const appointmentValues = [userID, appoDate, appoType];
    const appointmentResult = await pool.query(appointmentQuery, appointmentValues);

    return appointmentResult;
}

const getAppo = async (req: Request<{}, {}, {}, iToken>, res: Response, next: NextFunction) => {
    try {
        const token = req.headers['token'] as string | undefined;
        const userResult = await findUserID(token);
  
        if (userResult.rows.length === 0) {
            return res.status(404).json({ error: 'User not found' });
        }
  
        const userID = userResult.rows[0].userID;
    
        const appointmentsQuery = `
            SELECT * FROM "Appointment" WHERE "userID" = $1;
        `;
        const appointmentsResult = await pool.query(appointmentsQuery, [userID]);

        if(appointmentsResult.rows.length > 0){
            res.status(200).json({
                appointments: appointmentsResult.rows,
            });
        }
        else{
            return res.status(404).json({ error: 'Appointments not found' });
        }
    }
    catch (error) {
        next(error);
    }
}

export {getAppo, setAppo};