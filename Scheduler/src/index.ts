import express, { Request, Response, NextFunction } from 'express';
import { Router } from 'express';
import logger from './logger';

const app = express();
const router = Router();
const port = 3000;

interface UserInfo {
    userName: string;
    password: string;
}

interface TokenResponse {
    token: number;
  }
  

router.get('/login', (req: Request<{}, {}, {}, UserInfo>, res: Response, next: NextFunction) => {
    try {
        const {userName, password} = req.query;

        const response: TokenResponse = {
            token: 
        };
        
        logger.info('{userName} logged in successfully');
        res.json(response);
    } 
    catch (error) {
        next(error);
    }
});

// router.get('/', (req: Request<{}, {}, {}, UserInfo>, res: Response, next: NextFunction) => {
//     try {
//         const {userName, password} = req.query;

//         logger.info();
//         res.send('Hello, TypeScript with Express!');
//     } 
//     catch (error) {
//         next(error);
//     }
// });

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    logger.error(err.stack);
    res.status(500).send(err.message);
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
