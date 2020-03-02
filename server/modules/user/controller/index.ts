import passport from 'passport';
import { UserService } from '../service';
import { Request, Response, NextFunction } from 'express';
import { User } from '../models/user';
import { UserMapper } from '../utils/mappers/UserMapper';
import {
   httpGet,
   httpPut,
   httpPost,
   request,
   response,
   httpDelete,
   controller,
   BaseHttpController
} from 'inversify-express-utils';
import HttpStatus from 'http-status-codes';
import { inject } from 'inversify';
import { TYPES } from '../../../constants/types';
import {
   NotFoundError,
   CreateError,
   UpdateError,
   DeleteError
} from '../../../errors';
import { executionTime } from '../../../utils/executionTime';
import { Logger } from '../../../logger';
import { validateBody } from '../../../helpers/validate';
import { UserSchema } from '../schemas/userSchemas';
import { AuthService } from '../../../service/auth.service';

@controller('/user')
export class UserController extends BaseHttpController {
   constructor(
      @inject(TYPES.Logger) private logger: Logger,
      @inject(TYPES.UserService) private userService: UserService,
      @inject(TYPES.AuthService) private authService: AuthService
   ) {
      super();
   }

   @httpPost('/login',
      passport.authenticate('custom', { session: false })
   )
   async signInUser(
      @request() req: Request,
      @response() res: Response,
         next: NextFunction
   ) {
      const token = await this.authService.signToken(req.body);
      res.json(token);
   }

   @httpGet('')
   @executionTime()
   async getAutoSuggestUsers(
      @request() req: Request,
      @response() res: Response
   ) {
      const loginSubstring = req.query.loginSubstring;
      const limit = req.query.limit;

      const users = await this.userService.getAutoSuggest(loginSubstring, limit);
      res.status(HttpStatus.OK).json(users);
   }

   @httpPut('')
   @executionTime()
   async createUser(
      @request() req: Request,
      @response() res: Response
   ) {
      try {
         const value = await validateBody(UserSchema, req.body);
         const user: Omit<User, 'id'> = {
            login: value.login,
            password: value.password,
            age: value.age
         };
         await this.userService.save(user);
         res.status(HttpStatus.OK).json(true);
      } catch (err) {
         this.logger.error('Error create request', {
            method: 'createUser',
            params: {
               login: req.body.login,
               password: req.body.password,
               age: req.body.age
            }
         });
         throw new CreateError('Error create user');
      }
   }

   @httpGet('/:id')
   @executionTime()
   async getUser(
      @request() req: Request,
      @response() res: Response
   ) {
      const id = req.params.id;

      try {
         const user = await this.userService.getById(id);
         if (user) {
            res.status(HttpStatus.OK).json(UserMapper.toDTO(user));
         }
      } catch {
         this.logger.error('Error getting user', {
            method: 'getUser',
            params: { id }
         });
         throw new NotFoundError('Error getting user');
      }
   }

   @httpPost('/:id')
   @executionTime()
   async updateUser(
      @request() req: Request,
      @response() res: Response
   ) {
      const id = req.params.id;
      const user = await this.userService.getById(id);

      if (!user) {
         throw new NotFoundError('Error getting user');
      }

      try {
         const value = await validateBody(UserSchema, req.body);

         user.login = value.login;
         user.password = value.password;
         user.age = value.age;

         await this.userService.update(user);
         res.status(HttpStatus.OK).json(true);
      } catch {
         this.logger.error('Error updating user', {
            method: 'updateUser',
            params: { id }
         });
         throw new UpdateError('Error update user');
      }
   }

   @httpDelete('/:id')
   @executionTime()
   async deleteUser(
      @request() req: Request,
      @response() res: Response
   ) {
      const id = req.params.id;

      try {
         const user = await this.userService.getById(id);
         if (user) {
            await this.userService.delete(user.id);
            res.status(HttpStatus.OK).json(true);
         }
      } catch {
         this.logger.error('Error deleting user', {
            method: 'deleteUser',
            params: { id }
         });
         throw new DeleteError('Error deleting user');
      }
   }
}
