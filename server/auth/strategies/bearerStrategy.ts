import passport from 'passport';
import passportBearer from 'passport-http-bearer';
import { AuthService } from '../../service/auth';
import { InvalidTokenError } from '../../errors';

const BearerStrategy = passportBearer.Strategy;

export const initBearerStrategy = async (authService: AuthService) => {
   passport.use('bearer', new BearerStrategy(async (
      token: string,
      done: (error: any, user?: any, options?: any) => void
   ) => {
      const result = await authService.verifyToken(token);
      return done(null, result, { scope: 'all' });
   }));
};
