import { Request, Response, NextFunction } from 'express';

interface iSetAppo{

}

interface iGetAppo{

}


const addAppo = (req: Request<{}, {}, {}, iSetAppo>, res: Response, next: NextFunction) => {
    try {
    
    }
    catch (error) {
        next(error);
    }
}

const setAppo = (req: Request<{}, {}, {}, iGetAppo>, res: Response, next: NextFunction) => {
    try {
    
    }
    catch (error) {
        next(error);
    }
}