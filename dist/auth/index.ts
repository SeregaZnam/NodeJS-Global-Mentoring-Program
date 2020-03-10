import { initAuthStrategy } from './strategies/authStrategy';
import { initBearerStrategy } from './strategies/bearerStrategy';
import { UserService } from '../modules/user/service';

export const initializeStrategies = async (userService: UserService) => {
   await initAuthStrategy(userService);
   await initBearerStrategy();
};
