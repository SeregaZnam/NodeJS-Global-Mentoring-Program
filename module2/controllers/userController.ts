import { UserService } from '../services/userService';
import * as Joi from '@hapi/joi';
import { UserRepository } from '../database/repositories/UserRepository';
import { Request, Response } from 'express';
import { User } from '../models/user';
import { UserMapper } from '../mappers/UserMapper';

const userRepository = new UserRepository();
const userService = new UserService(userRepository);

export const getAutoSuggestUsers = async (req: Request, res: Response) => {
   const loginSubstring = req.query.loginSubstring;
   const limit = req.query.limit;
   const users = await userService.getAutoSuggest(loginSubstring, limit);

   res.status(200).json(users.map((u: User) => UserMapper.toDTO(u)));
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
      await userService.save(user)
         ? res.status(201).json(true)
         : res.status(404).end();
   } catch (err) {
      res.status(400).json(err.details[0].message).end();
   }
};

export const getUser = async (req: Request, res: Response) => {
   const id = req.params.id;
   const user = await userService.getById(id);

   if (user) {
      res.status(200).json(UserMapper.toDTO(user));
   } else {
      res.status(404).end();
   }
};

export const updateUser = async (req: Request, res: Response) => {
   const id = req.params.id;
   const user = await userService.getById(id);

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
      await userService.update(user)
         ? res.status(201).json(true)
         : res.status(404).end();
   } catch (err) {
      res.status(400).json(err.details[0].message).end();
   }
};

export const deleteUser = async (req: Request, res: Response) => {
   const id = req.params.id;
   const user = await userService.getById(id);

   if (user && await userService.delete(user.id)) {
      res.status(201).json(true);
   } else {
      res.status(404).end();
   }
};
