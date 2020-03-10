import passport from 'passport';
import passportCustom, { VerifiedCallback } from 'passport-custom';
import { Request } from 'express';
import { UserService } from '../../modules/user/service';
import { NotFoundError } from '../../errors';

const AuthStrategy = passportCustom.Strategy;

export const initAuthStrategy = (userService: UserService) => {
   passport.use('auth', new AuthStrategy(async (req: Request, done: VerifiedCallback) => {
      const [user] = await userService.getAll(req.body);
      if (user) {
         done(null, user);
      } else {
         throw new NotFoundError('User not found');
      }
   }));
};
