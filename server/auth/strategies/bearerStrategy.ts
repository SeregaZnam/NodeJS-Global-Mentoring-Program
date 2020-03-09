import passport from 'passport';
import passportBearer from 'passport-http-bearer';

const BearerStrategy = passportBearer.Strategy;

export const initBearerStrategy = () => {
   passport.use('bearer', new BearerStrategy((
      token: string,
      done: (error: any, user?: any, options?: any) => void
   ) => {
      // TODO
      return done(null, { user: '' }, { scope: 'all' });
   }));
};
