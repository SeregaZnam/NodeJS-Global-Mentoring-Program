import passport from 'passport';
import passportBearer, { IVerifyOptions } from 'passport-http-bearer';

const BearerStrategy = passportBearer.Strategy;

export const initBearerStrategy = () => {
   passport.use('bearer', new BearerStrategy((
      token: string,
      done: (error: any, user?: any, options?: IVerifyOptions | string) => void
   ) => {
      // TODO
      return done(null, { user: '' }, { scope: 'all', message: '' });
   }));
};
