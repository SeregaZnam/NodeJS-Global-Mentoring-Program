import {
   Request,
   Response,
   NextFunction,
   RequestHandler
} from 'express';
import logger from '../logger';

export const loggerHandler: RequestHandler = (req: Request, res: Response, next: NextFunction) => {
   const { method, url, body } = req;
   logger.info('Handle request method', { method, url, body });
   next();
};
