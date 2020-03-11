import { initAuthStrategy } from './strategies/authStrategy';
import { initBearerStrategy } from './strategies/bearerStrategy';
import { UserService } from '../modules/user/service';
import { AuthService } from '../service/auth';

export const initializeStrategies = async (userService: UserService, authService: AuthService) => {
   await initAuthStrategy(userService);
   await initBearerStrategy(authService);
};
