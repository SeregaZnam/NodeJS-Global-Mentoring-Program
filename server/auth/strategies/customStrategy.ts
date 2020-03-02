import passport from 'passport';
import passportCustom, { VerifiedCallback } from 'passport-custom';
import { Request } from 'express';
import { Container } from 'inversify';
import { UserService } from '../../modules/user/service';
import { TYPES } from '../../constants/types';
import { bindings } from '../../inversify.config';
import { container } from '../../app';

const CustomStrategy = passportCustom.Strategy;

passport.use('custom', new CustomStrategy((req: Request, done: VerifiedCallback) => {
   const userService = container.get<UserService>(TYPES.UserService);
   // TODO
   done(null, { user: 'u' });
}));
