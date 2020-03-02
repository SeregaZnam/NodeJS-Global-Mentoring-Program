import {
   controller,
   httpPut,
   request,
   response,
   BaseHttpController
} from 'inversify-express-utils';
import HttpStatus from 'http-status-codes';
import { inject } from 'inversify';
import { TYPES } from '../../../constants/types';
import { executionTime } from '../../../utils/executionTime';
import { DBConnect } from '../../../database';
import { UserGroupService } from '../service';
import { Request, Response } from 'express';
import { Logger } from '../../../logger';
import { CreateError } from '../../../errors';
import { validateBody } from '../../../helpers/validate';
import { UserGroupschema } from '../schemas/userGroupSchemas';

@controller('/user-group')
export class UserGroupController extends BaseHttpController {
   constructor(
      @inject(TYPES.Logger) private logger: Logger,
      @inject(TYPES.DbConnect) private dbConnect: DBConnect,
      @inject(TYPES.UserGroupService) private userGroupService: UserGroupService
   ) {
      super();
   }

   @httpPut('')
   @executionTime()
   async createUserGroup(
      @request() req: Request,
      @response() res: Response
   ) {
      const transaction = await this.dbConnect.sequelize.transaction();

      try {
         const value = await validateBody(UserGroupschema, req.body);
         await this.userGroupService.save(value.userId, value.groupId, transaction);

         res.status(HttpStatus.OK).json(true);
         transaction.commit();
      } catch (err) {
         transaction.rollback();
         this.logger.error('Error create request', {
            method: 'createUser',
            params: {
               userId: req.body.userId,
               groupId: req.body.groupId
            }
         });
         throw new CreateError('Error create user group');
      }
   }
}
