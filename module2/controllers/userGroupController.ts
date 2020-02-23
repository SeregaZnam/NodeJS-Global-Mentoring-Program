import * as Joi from '@hapi/joi';
import { Request, Response } from 'express';
import { UserGroupService } from '../services/userGroupService';
import { UserRepository } from '../database/repositories/UserRepository';
import { GroupRepository } from '../database/repositories/GroupRepository';
import { GroupModel } from '../database/entities/Group';
import { createDbConnect } from '../database';
import config from '../config';

const userGroupService = new UserGroupService(
   new GroupRepository(GroupModel),
   new UserRepository()
);

export const createUserGroup = async (req: Request, res: Response) => {
   const schema = Joi.object({
      userId: Joi.string()
         .required(),
      groupId: Joi.string()
         .required()
   });
   const dbConnect = await createDbConnect(config);
   const transaction = await dbConnect.sequelize.transaction();

   try {
      const value = await schema.validateAsync(req.body);
      // eslint-disable-next-line no-unused-expressions
      await userGroupService.save(value.userId, value.groupId, transaction)
         ? res.status(201).json(true)
         : res.status(404).end();
      transaction.commit();
   } catch (err) {
      res.status(400).json(err.details[0].message).end();
      transaction.rollback();
   }
};
