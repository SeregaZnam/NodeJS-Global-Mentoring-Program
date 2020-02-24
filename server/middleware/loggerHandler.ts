import {
   Request,
   Response,
   NextFunction,
   RequestHandler
} from 'express';
import logger from '../logger';

export const loggerHandler: RequestHandler = (req: Request, res: Response, next: NextFunction) => {
   logger.info('Handle request method', { method: req.method });
   next();
};
