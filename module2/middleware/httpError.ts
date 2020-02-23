import { ErrorRequestHandler, Request, Response, NextFunction } from 'express';
import logger from '../logger';

export const httpError: ErrorRequestHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
   logger.error('Something went wrong', { err });

   const clientError = {
      message: 'Something went wrong',
      code: 'INTERNAL_ERROR',
      status: 500
   };

   res.status(clientError.status).send({ error: clientError });
};
