import passport from 'passport';
import passportCustom from 'passport-custom';

const CustomStrategy = passportCustom.Strategy;

passport.use(new CustomStrategy(() => {
   // TODO Add login for find user
}));
