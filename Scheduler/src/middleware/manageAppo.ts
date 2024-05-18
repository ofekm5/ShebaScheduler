import { Request, Response, NextFunction } from 'express';
import pool from '../db';
import jwt, { JwtPayload } from 'jsonwebtoken';

interface iSetAppo{
    appoDate?: string; 
    appoType?: string;
}

interface iToken{
    token?:string;
}

const setAppo = async (req: Request<{}, {}, iSetAppo, iToken>, res: Response, next: NextFunction) => {
    try {
        const tokenPrivateKey = process.env.TOKEN_PRIVATE_KEY as string;
        const appoDate = req.body.appoDate;
        const appoType = req.body.appoType;
        const token = req.headers['token'] as string | undefined;
        const userQuery = `SELECT "userID" FROM "User" WHERE "userName" = $1;`;
      
        if(!token){
            throw new Error("invalid token");
        }
        const decoded = jwt.verify(token, tokenPrivateKey) as JwtPayload;
        const userResult = await pool.query(userQuery, [decoded.userName]);
        if (userResult.rows.length === 0) {
            return res.status(404).json({ error: 'User not found' });
        }
  
        const userID = userResult.rows[0].userID;
  
        const appointmentQuery = `
            INSERT INTO "Appointment" ("userID", "date", "testType")
            VALUES ($1, $2, $3)
            RETURNING *;
        `;
        const appointmentValues = [userID, appoDate, appoType];
        const appointmentResult = await pool.query(appointmentQuery, appointmentValues);
    
        res.status(201).json({
            message: 'Appointment created successfully',
            appointment: appointmentResult.rows[0],
        });
    }
    catch (error) {
        next(error);
    }
}

const getAppo = async (req: Request<{}, {}, {}, iToken>, res: Response, next: NextFunction) => {
    try {
        const token = req.headers['token'] as string | undefined;
        const tokenPrivateKey = process.env.TOKEN_PRIVATE_KEY as string;
        if(!token){
            throw new Error("invalid token");
        }
        const decoded = jwt.verify(token, tokenPrivateKey) as JwtPayload;

        const userQuery = `
        SELECT "userID" FROM "User" WHERE "userName" = $1;
      `;
      const userResult = await pool.query(userQuery, [decoded.userName]);
  
      if (userResult.rows.length === 0) {
        return res.status(404).json({ error: 'User not found' });
      }
  
      const userID = userResult.rows[0].userID;
  
      const appointmentsQuery = `
        SELECT * FROM "Appointment" WHERE "userID" = $1;
      `;
      const appointmentsResult = await pool.query(appointmentsQuery, [userID]);
  
      res.status(200).json({
        appointments: appointmentsResult.rows,
      });
    }
    catch (error) {
        next(error);
    }
}

export {getAppo, setAppo};