import * as Joi from '@hapi/joi';
import config from '../../../configs/config';
import {
   controller,
   httpPut,
   request,
   response,
   BaseHttpController
} from 'inversify-express-utils';
import { inject } from 'inversify';
import { TYPES } from '../../../constants/types';
import { executionTime } from '../../../utils/executionTime';
import { createDbConnect } from '../../../database';
import { UserGroupService } from '../service';
import { Request, Response } from 'express';

@controller('/user-group')
export class UserGroupController extends BaseHttpController {
   constructor(@inject(TYPES.UserGroupService) private userGroupService: UserGroupService) {
      super();
   }

   @httpPut('')
   @executionTime()
   async createUserGroup(
      @request() req: Request,
      @response() res: Response
   ) {
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
         await this.userGroupService.save(value.userId, value.groupId, transaction)
            ? res.status(201).json(true)
            : res.status(404).end();
         transaction.commit();
      } catch (err) {
         res.status(400).json(err.details[0].message).end();
         transaction.rollback();
      }
   }
}
