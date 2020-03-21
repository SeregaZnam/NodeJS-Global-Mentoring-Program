import passport from 'passport';
import passportBearer from 'passport-http-bearer';
import { AuthService } from '../../service/auth';

const BearerStrategy = passportBearer.Strategy;

export const initBearerStrategy = async (authService: AuthService) => {
	// prettier-ignore
	passport.use('bearer', new BearerStrategy(async (
      token: string,
      done: (error: any, user?: any, options?: any) => void
   ) => {
      try {
         const result = await authService.verifyToken(token);
         return done(null, result, { scope: 'all' });
      } catch {
         return done(null, false);
      }
   }));
};
