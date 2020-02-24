import { UserService } from '../service';
import * as Joi from '@hapi/joi';
import { Request, Response } from 'express';
import { User } from '../models/user';
import { UserMapper } from '../utils/mappers/UserMapper';

export const getAutoSuggestUsers = async (req: Request, res: Response) => {
   const loginSubstring = req.query.loginSubstring;
   const limit = req.query.limit;
   try {
      const users = await UserService.getAutoSuggest(loginSubstring, limit);
      res.status(200).json(users && users.map((u: User) => UserMapper.toDTO(u)));
   } catch (err) {
      console.log(123);
   }
};

export const createUser = async (req: Request, res: Response) => {
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
      await UserService.save(user)
         ? res.status(201).json(true)
         : res.status(404).end();
   } catch (err) {
      res.status(400).json(err.details[0].message).end();
   }
};

export const getUser = async (req: Request, res: Response) => {
   const id = req.params.id;
   const user = await UserService.getById(id);

   if (user) {
      res.status(200).json(UserMapper.toDTO(user));
   } else {
      res.status(404).end();
   }
};

export const updateUser = async (req: Request, res: Response) => {
   const id = req.params.id;
   const user = await UserService.getById(id);

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
      await UserService.update(user)
         ? res.status(201).json(true)
         : res.status(404).end();
   } catch (err) {
      res.status(400).json(err.details[0].message).end();
   }
};

export const deleteUser = async (req: Request, res: Response) => {
   const id = req.params.id;
   const user = await UserService.getById(id);

   if (user && await UserService.delete(user.id)) {
      res.status(201).json(true);
   } else {
      res.status(404).end();
   }
};
