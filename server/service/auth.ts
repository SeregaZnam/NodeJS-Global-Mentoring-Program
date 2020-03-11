import * as jwt from 'jsonwebtoken';
import config from '../configs/config';
import { injectable, inject } from 'inversify';
import { Logger } from '../logger';
import { TYPES } from '../constants/types';
import { Request, Response, NextFunction } from 'express';
import { User } from '../modules/user/models/user';
import { InvalidTokenError } from '../errors';

@injectable()
export class AuthService {
   constructor(
      @inject(TYPES.Logger) private logger: Logger
   ) {
   }

   extractToken(req: Request) {
      return req.headers['x-access-token'] || req.headers.authorization;
   }

   async verifyToken(req: Request, res: Response, next: NextFunction) {
      const token = this.extractToken(req) as string;
      const jwtConfig = config.get('jwt');

      if (token) {
         jwt.verify(token, jwtConfig.secretKey, (err: jwt.VerifyErrors, decoded: object) => {
            if (err) {
               this.logger.error(err.message, 'Token does not verified');
               throw new InvalidTokenError(token);
            } else {
               // TODO
               console.log(decoded);
               return next();
            }
         });
      } else {
         this.logger.error('No token');
         throw new InvalidTokenError(token);
      }
   }

   async signToken(user: User): Promise<any> {
      const jwtConfig = config.get('jwt');
      return new Promise((res, rej) => {
         jwt.sign(user, jwtConfig.secretKey, {
            subject: user.id,
            expiresIn: '4h'
         }, (err, token) => {
            if (err) {
               rej(err);
            } else {
               res(token);
            }
         });
      });
   }
}
