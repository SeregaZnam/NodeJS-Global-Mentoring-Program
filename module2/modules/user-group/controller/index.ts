import * as Joi from '@hapi/joi';
import { Request, Response } from 'express';
import { UserGroupService } from '../service';
import { createDbConnect } from '../../../database';
import config from '../../../config';

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
      await UserGroupService.save(value.userId, value.groupId, transaction)
         ? res.status(201).json(true)
         : res.status(404).end();
      transaction.commit();
   } catch (err) {
      res.status(400).json(err.details[0].message).end();
      transaction.rollback();
   }
};
