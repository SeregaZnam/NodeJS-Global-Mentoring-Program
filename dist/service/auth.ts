import * as jwt from 'jsonwebtoken';
import config from '../configs/config';
import { injectable, inject } from 'inversify';
import { Logger } from '../logger';
import { TYPES } from '../constants/types';
import { Request } from 'express';
import { User } from '../modules/user/models/user';
import { InvalidTokenError, GetTokenError } from '../errors';
import { UserService } from '../modules/user/service';

@injectable()
export class AuthService {
   constructor(
      @inject(TYPES.Logger) private logger: Logger,
      @inject(TYPES.UserService) private userService: UserService
   ) {
   }

   async verifyToken(token: string) {
      const jwtConfig = config.get('jwt');

      if (token) {
         try {
            const decoded: any = await jwt.verify(token, jwtConfig.secretKey);
            const user = await this.userService.getById(decoded.sub);
            if (!user) {
               this.logger.error('No token');
               throw new InvalidTokenError(token);
            }
            return user;
         } catch (err) {
            this.logger.error(err.message, 'Token does not verified');
            throw new InvalidTokenError(token);
         }
      } else {
         this.logger.error('No token');
         throw new InvalidTokenError(token);
      }
   }

   async signToken(user: User): Promise<any> {
      try {
         const jwtConfig = config.get('jwt');
         const token = await jwt.sign(user, jwtConfig.secretKey, {
            subject: user.id,
            expiresIn: '4h'
         });
         return token;
      } catch (err) {
         this.logger.error('Error getting token');
         throw new GetTokenError(err);
      }
   }
}
