import logger from '../../../logger';
import { UserService } from '../service';
import * as Joi from '@hapi/joi';
import { Request, Response } from 'express';
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
import { inject } from 'inversify';
import { TYPES } from '../../../constants/types';
import { NotFoundError, CreateError, UpdateError, DeleteError } from '../../../errors';
import { executionTime } from '../../../utils/executionTime';

@controller('/user')
export class UserController extends BaseHttpController {
   constructor(@inject(TYPES.UserService) private userService: UserService) {
      super();
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
      res.status(200).json(users && users.map((u: User) => UserMapper.toDTO(u)));
   }

   @httpPut('')
   @executionTime()
   async createUser(
      @request() req: Request,
      @response() res: Response
   ) {
      const schema = Joi.object({
         login: Joi.string()
            .required(),
         password: Joi.string()
            .regex(/^(?=.*\d)(?=.*[A-Za-z])/)
            .required(),
         age: Joi.number()
            .min(4)
            .max(130)
            .required()
      });

      try {
         const value = await schema.validateAsync(req.body);
         const user: Omit<User, 'id'> = {
            login: value.login,
            password: value.password,
            age: value.age
         };
         await this.userService.save(user);
         res.status(200).json(true);
      } catch (err) {
         logger.error('Error create request', {
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
            res.status(200).json(UserMapper.toDTO(user));
         }
      } catch {
         logger.error('Error getting user', {
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

      const schema = Joi.object({
         login: Joi.string()
            .required(),
         password: Joi.string()
            .regex(/^(?=.*\d)(?=.*[A-Za-z])/)
            .required(),
         age: Joi.number()
            .min(4)
            .max(130)
            .required()
      });

      try {
         const value = await schema.validateAsync(req.body);

         user.login = value.login;
         user.password = value.password;
         user.age = value.age;

         await this.userService.update(user);
         res.status(200).json(true);
      } catch {
         logger.error('Error updating user', {
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
         }
      } catch {
         logger.error('Error deleting user', {
            method: 'deleteUser',
            params: { id }
         });
         throw new DeleteError('Error deleting user');
      }
   }
}
