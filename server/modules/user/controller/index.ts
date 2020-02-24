import { UserService } from '../service';
import * as Joi from '@hapi/joi';
import { Request, Response } from 'express';
import { User } from '../models/user';
import { UserMapper } from '../utils/mappers/UserMapper';
import { controller, httpGet, request, response, BaseHttpController, httpPut, httpPost, httpDelete } from 'inversify-express-utils';
import { inject } from 'inversify';
import { TYPES } from '../../../constants/types';

@controller('/user')
export class UserController extends BaseHttpController {
   constructor(@inject(TYPES.UserService) private userService: UserService) {
      super();
   }

   @httpGet('')
   async getAutoSuggestUsers(
      @request() req: Request,
      @response() res: Response
   ) {
      const loginSubstring = req.query.loginSubstring;
      const limit = req.query.limit;
      try {
         const users = await this.userService.getAutoSuggest(loginSubstring, limit);
         res.status(200).json(users && users.map((u: User) => UserMapper.toDTO(u)));
      } catch (err) {
         console.log(err);
      }
   }

   @httpPut('')
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

         // eslint-disable-next-line no-unused-expressions
         await this.userService.save(user)
            ? res.status(201).json(true)
            : res.status(404).end();
      } catch (err) {
         res.status(400).json(err.details[0].message).end();
      }
   }

   @httpGet('/:id')
   async getUser(
      @request() req: Request,
      @response() res: Response
   ) {
      const id = req.params.id;
      const user = await this.userService.getById(id);

      if (user) {
         res.status(200).json(UserMapper.toDTO(user));
      } else {
         res.status(404).end();
      }
   }

   @httpPost('/:id')
   async updateUser(
      @request() req: Request,
      @response() res: Response
   ) {
      const id = req.params.id;
      const user = await this.userService.getById(id);

      if (!user) {
         res.status(404).end();
         return;
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

         // eslint-disable-next-line no-unused-expressions
         await this.userService.update(user)
            ? res.status(201).json(true)
            : res.status(404).end();
      } catch (err) {
         res.status(400).json(err.details[0].message).end();
      }
   }

   @httpDelete('/:id')
   async deleteUser(
      @request() req: Request,
      @response() res: Response
   ) {
      const id = req.params.id;
      const user = await this.userService.getById(id);

      if (user && await this.userService.delete(user.id)) {
         res.status(201).json(true);
      } else {
         res.status(404).end();
      }
   }
}
