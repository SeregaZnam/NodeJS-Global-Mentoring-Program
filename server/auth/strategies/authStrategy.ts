import passport from 'passport';
import passportCustom, { VerifiedCallback } from 'passport-custom';
import { Request } from 'express';
import { UserService } from '../../modules/user/service';

const AuthStrategy = passportCustom.Strategy;

export const initAuthStrategy = (userService: UserService) => {
   passport.use('auth', new AuthStrategy((req: Request, done: VerifiedCallback) => {
      // TODO
      done(null, { user: 'u' });
   }));
};
